const { v4: uuidv4 } = require('uuid');
// const { getClient, connectDB } = require("../data/database.js");
// const client = getClient();
// connectDB(client);
const axios = require('axios');
const apiKey = 'AIzaSyB1UOBnfU2NMx2soTgoz1BqhcA2jkhzflA'; 


// Function to get coordinates of a city using Google Geocoding API
async function getCoordinates (city){
    try {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
        console.log("geocode url:", geocodeUrl);
        const response = await axios.get(geocodeUrl);
        if (response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return location; // Returns { lat: ..., lng: ... }
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        throw new Error('Error fetching city coordinates');
    }
};

// Function to get restaurants using Google Places API
async function getDestinations(lat, lon){
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=tourist_attraction&key=${apiKey}`;
    try {
        const response = await axios.get(placesUrl);
        return response.data.results; // Returns an array of restaurant results
    } catch (error) {
        throw new Error('Error fetching restaurant data');
    }
};


// Transform the restaurant data
async function transformDestinationData (googleData){
    console.log('Transforming Restaurant Data:', googleData); 
    const transformedData = {
        _id: uuidv4(), // Generate a unique ID
        DestinationID: 4, // Set a static value for DestinationID (can be dynamic based on your logic)
        DestinationName: googleData.name, // Name of the place
        country_id: 1, // Assuming a static country_id (you can modify it dynamically if needed)
        state_id: 1, // Assuming a static state_id
        CityID: 3, // Assuming a static CityID (can be dynamic based on the city)
        Description: googleData.vicinity || "No description available", // Vicinity as a fallback for description
        rating: googleData.rating ? parseFloat(googleData.rating.toFixed(2)) : null, // Ensure rating is a float
        rating_count: googleData.user_ratings_total || 0, // Fallback to 0 if no rating count available
        estimated_cost: 23.4, // Static or dynamic value for estimated cost
        estimated_time: 3.7, // Static or dynamic value for estimated time (in hours)
        lat: googleData.geometry && googleData.geometry.location ? googleData.geometry.location.lat : null,
        lng: googleData.geometry && googleData.geometry.location ? googleData.geometry.location.lng : null,
        img_url: googleData.photos && googleData.photos.length > 0 
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${googleData.photos[0].photo_reference}&key=${apiKey}` 
            : "https://picsum.photos/200/300?image=4" // Fallback image
    };

    console.log('Transformed Restaurant Data:', transformedData); // Log the transformed data
    return transformedData;
};

module.exports = {getCoordinates, getDestinations, transformDestinationData};