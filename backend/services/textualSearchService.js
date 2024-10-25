const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const { OpenAI } = require("openai");
const cosineSimilarity = require("compute-cosine-similarity");
const { Pinecone } = require("@pinecone-database/pinecone");
require("dotenv").config();
const api_key = process.env.OPENAI_API_KEY;
// Create an instance of the OpenAI API
const openai = new OpenAI({
  apiKey: api_key, // Replace with your actual API key
});
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const pc = new Pinecone({apiKey:PINECONE_API_KEY});

// Function to encode the image to base64
function encodeImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString("base64");
}

// Function to generate image embeddings
async function getImageDescription(filePath) {
  try {
    // Path to your image
    //const imagePath = './images/1.jpg'; // Update this path
    const imagePath = filePath;

    // Getting the base64 string
    const base64Image = encodeImage(imagePath);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Adjust the model name if needed
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What is in this image?" },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    console.log(response.choices[0].message.content);
    const description = response.choices[0].message.content;

    return description;
    //need to return tags
  } catch (error) {
    console.error("Error fetching image description:", error.message);
  }
}

// Function to generate text prompt embeddings
async function getPromptEmbedding(prompt) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002", // Use an appropriate model for text embeddings
      input: prompt,
    });

    console.log("Embedding for this prompt: ", response.data[0].embedding);
    return response.data[0].embedding; // Return the embedding for the prompt
  } catch (error) {
    console.error("Error generating prompt embedding:", error.message);
    return null;
  }
}

// Function to find the best matching image based on prompt
async function findBestMatchingImage(prompt, userId) {
  try {
    console.log("userId:", userId);
    // Generate the embedding for the prompt
    const promptEmbedding = await getPromptEmbedding(prompt);
    // const promptEmbedding = "";
    if (!promptEmbedding)
      throw new Error("Failed to generate prompt embedding");

    const indexName = "user-image-embeddings"; // The name of your Pinecone index
    const topK = 3; // Number of top results to return
    index=pc.Index(indexName)
    // Perform a search query in Pinecone
    const queryResults = await index.query({
      
      vector: promptEmbedding,
      topK: topK,
      includeMetadata: true, // To return metadata such as image paths
      // filter: {
      //   userId: userId, // Only include results that match the userId
      // },
    });

    // Extract only the image paths from the results
    const imagePaths = queryResults.matches.map(
      (match) => match.metadata.imagePath
    );
    console.log(imagePaths)

    // let bestMatch = null;
    // let highestScore = -1;

    // const files = fs.readdirSync(galleryFolderPath);
    // for (const file of files) {
    //     console.log("in file");
    //     const filePath = path.join(galleryFolderPath, file);
    //     console.log("filePath: ", filePath);
    //     //get image embedding
    //     const imgDescription = await getImageDescription(filePath);
    //     console.log("in match func:",imgDescription);

    //     const imageEmbedding = await getPromptEmbedding(imgDescription);
    //     console.log("image embeddings:",imageEmbedding);

    //     if (imageEmbedding) {
    //         // Calculate cosine similarity between prompt and image embeddings
    //         const similarityScore = cosineSimilarity(promptEmbedding, imageEmbedding);
    //         if (similarityScore > highestScore) {
    //             highestScore = similarityScore;
    //             bestMatch = filePath;  // Store the best match image
    //         }
    //     }
    // }

    // console.log(`Best matching image: ${bestMatch} with similarity score: ${highestScore}`);
    // return bestMatch;
    return imagePaths;
  } catch (error) {
    console.error("Error finding best matching image:", error.message);
  }
}

// Example usage:
// (async () => {
//     const prompt = "a person with v sign";  // Your text prompt
//     const bestMatchImage = await findBestMatchingImage(prompt, './images');  // Path to your image gallery
//     console.log("Best match image:", bestMatchImage);
// })();
module.exports = { findBestMatchingImage };
