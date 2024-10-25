//new ta
const { getClient } = require("../data/database.js");
const client = getClient();
const { textPromptChatService } = require('../services/blogService'); // AI service for blog generation

// Blog controller
const blogController = async (req, res) => {
    try {
        // Parse and validate cityId
        const cityId = parseInt(req.body.cityId);
        if (isNaN(cityId)) {
            return res.status(400).json({ error: "Invalid cityId" });
        }

        console.log("City ID:", cityId);

        // Connect to the MongoDB database
        const database = client.db('travelhack');
        
        // Fetch user's travel history for the given city
        const historyCollection = database.collection('History');
        const userHistory = await historyCollection.find({ "City": cityId }).toArray();

        if (!userHistory || userHistory.length === 0) {
            return res.status(404).json({ error: "No history found for this city" });
        }

        // Fetch related data for each trip in the user's history
        const destinationCollection = database.collection('Destination');
        const hotelCollection = database.collection('Hotel');
        const restaurantCollection = database.collection('Restaurant');
        const eventCollection = database.collection('Event');

        let blogDetails = [];

        // Loop through the history and fetch destination, hotel, restaurant, and event info
        for (const trip of userHistory) {
            const { Destination, Hotel, Restaurant, Event } = trip;

            // Fetch destination details
            const destinationDetails = await destinationCollection.findOne({ "DestinationID": Destination });

            // Fetch hotel details
            const hotelDetails = await hotelCollection.findOne({ "HotelID": Hotel });

            // Fetch restaurant details
            const restaurantDetails = await restaurantCollection.findOne({ "id": Restaurant });

            // Fetch event details
            const eventDetails = await eventCollection.findOne({ _id: Event });//need to fix later

            // Add the fetched data to the blog details array
            blogDetails.push({
                destination: destinationDetails ? destinationDetails.name : "Unknown destination",
                hotel: hotelDetails ? hotelDetails.name : "Unknown hotel",
                restaurant: restaurantDetails ? restaurantDetails.name : "Unknown restaurant",
                event: eventDetails ? eventDetails.name : "No event attended",
                description: `Visited ${destinationDetails ? destinationDetails.name : "a place"}, 
                             stayed at ${hotelDetails ? hotelDetails.name : "a hotel"}, 
                             ate at ${restaurantDetails ? restaurantDetails.name : "a restaurant"}, 
                             and attended ${eventDetails ? eventDetails.name : "an event"}`
            });
        }

        // Generate the userPrompt for AI-based blog generation
        const userPrompt = `Write a blog using the following details: ${JSON.stringify(blogDetails)} in under 300 words.`;//need to fix later words 
        
        // Call AI service to generate the blog
        const blogResponse = await textPromptChatService(userPrompt);

        if (!blogResponse) {
            return res.status(500).json({ error: "Failed to generate the blog" });
        }

        // Send the generated blog as the response
        res.json(blogResponse);

    } catch (err) {
        console.log("Error in blogController: ", err);
        res.status(500).json({ error: 'Failed to generate blog', details: err.message });
    }
};

module.exports = { blogController };
