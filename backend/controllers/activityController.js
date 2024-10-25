const { getClient, connectDB } = require("../data/database.js");
const client = getClient();
// connectDB(client);
 
exports.activityController = async (req, res) => {
    try {
        const destinationId = parseInt(req.body.destId);
 
        // First, fetch the destination name using the destinationId
        const database = client.db('travelhack'); // Your database name
        const destinationCollection = database.collection('Destination'); // Change this to your actual collection name
 
        const destination = await destinationCollection.findOne({ "DestinationID": destinationId }); // Assuming `id` is the field for destinationId
 
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }
 
        const destinationName = destination.DestinationName; // Adjust the field name based on your schema
 
        // Now, fetch activities associated with the destination name
        const activityCollection = database.collection('Activity'); // Your activities collection name
 
        const activities = await activityCollection.find({ "DestinationName": destinationName }).toArray(); // Fetch activities
        console.log(activities);
 
        res.json(activities);
 
    } catch (err) {
        console.log("In error activityController: ", err);
        res.status(500).json({ error: 'Failed to fetch activities', details: err.message });
    }
};