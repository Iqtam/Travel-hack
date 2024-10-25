const { getClient, connectDB } = require("../data/database.js");
const client = getClient();
// connectDB(client);

exports.destinationController = async (req, res) => {
    try {
        const city = req.body.city;//need to fix
        console.log(city)
        //now need to fetch the destinations from db
        //thats located in that city
        const database = client.db('travelhack'); // Change 'your_database_name' to your actual database name
        const destCollection = database.collection('Destination'); // Change 'your_collection_name' to your collection name
        const cityCollection = database.collection('City'); // Change 'your_collection_name' to your collection name
        const cities=await cityCollection.find({ "City": city }).toArray();
        console.log(cities)
        const cityId = [...new Set(cities.map(dest => dest.CityID))];
        console.log(cityId)
        const data = await destCollection.find({ "CityID": cityId[0] }).toArray(); // Fetch all documents from the collection
        console.log(data);
        res.json(data);

    } catch (err) {
        console.log("In error cityController: ", err);
        res.status(500).json({ error: 'Failed to fetch response for city', details: error.message });
    }
};
exports.getDestinationById=async(req,res)=>{
    try {
        // console.log(req)
        const id = parseInt(req.params.id);
        console.log(id)
        //now need to fetch the destinations from db
        //thats located in that city
        const database = client.db('travelhack'); // Change 'your_database_name' to your actual database name
        const destCollection = database.collection('Destination'); // Change 'your_collection_name' to your collection name
        const data = await destCollection.find({ "DestinationID": id }).toArray(); // Fetch all documents from the collection
        console.log(data);
        res.json(data);

    } catch (err) {
        console.log("In error cityController: ", err);
        res.status(500).json({ error: 'Failed to fetch response for city', details: error.message });
    }
}