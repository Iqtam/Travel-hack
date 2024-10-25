// const { getClient, connectDB } = require("../data/database.js");
// const client = getClient();


const {textPromptChatService} = require('../services/planService');



const planController = async (req, res) => {
    //create a plan using openAI
    const dest = (req.body.dest);
    const rest = parseInt(req.body.rest);
    const hotel= parseInt(req.body.hotel);

    let planDetails = [];

    planDetails.push({
        description: `Visited ${dest}, 
                     stayed at ${hotel}, 
                     ate at ${rest}`
    });

    //here need to make the prompt
    const userPrompt = `Write a plan using the following details: ${JSON.stringify(planDetails)} in under 300 words or suggest better plan for a trip in that city considering best possible hotels,restaurants,cost and show the cost breakdown.`;
    const response = await textPromptChatService(userPrompt);
    return res.json(response);
};

module.exports = {planController};