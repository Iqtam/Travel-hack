const { getClient, connectDB } = require("../data/database.js");
const client = getClient();
// connectDB(client);

//func for tag image 
const { findBestMatchingImage } = require('../services/textualSearchService.js'); // AI service for blog generation


const textualSearchController = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const userId = (req.body.userId);//need to fix
        
        if (!prompt) {
            return res.status(400).json({ error: "No prompt for textual search" });
          }
        
        console.log("id :", userId);
        console.log("prompt:", prompt);
        
        //now need to find the tags of the image
        //response from tagImageService
        const response = await findBestMatchingImage(prompt, userId);

        if (!response) {
            return res.status(500).json({ error: "Failed to get the textual search response" });
        }

        //insert the tags into database
        //here no need to  return the tag
        console.log(response);//path ta print korbe image er
        res.json(response);//nothing returns

    } catch (err) {
        console.log("In error textual search Controller: ", err);
        res.status(500).json({ error: 'Failed to fetch response for textual search', details: error.message });
    }
};

module.exports={textualSearchController};