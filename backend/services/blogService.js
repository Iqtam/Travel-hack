const { OpenAI } = require('openai');

// Create an instance of the OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Replace with your actual API key
});

async function textPromptChatService(userPrompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",  // Specify GPT-4 model
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userPrompt }
            ],
        });

        // Log and return the assistant's response
        const assistantResponse = response.choices[0].message.content;
        console.log("Assistant's Response:", assistantResponse);
        return assistantResponse;
    } catch (error) {
        // Handle API errors
        console.error("Error with OpenAI API request:", error);
        throw error;  // Optionally rethrow the error for higher-level handling
    }
}

module.exports = { textPromptChatService };
