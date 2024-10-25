const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const { OpenAI } = require("openai");
const { Pinecone } = require('@pinecone-database/pinecone');
const cosineSimilarity = require("compute-cosine-similarity");

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
const createPineconeIndex = async (pc, indexName = "user-image-embeddings") => {
  try {
    // Define the dimension for embeddings
    const dimension = 1536; // Should match the dimension of your embeddings

    // Create the index if it doesn't already exist
    // existing_indexes = [
    //     index_info["name"] for index_info in pc.list_indexes()
    // ]
    const indexList = await pc.listIndexes();
        console.log("Existing Indexes:", indexList); // Debug log

        // Check if the index already exists
        const existingIndexes = indexList.indexes.map(index => index.name); // Extract index names
        if (!existingIndexes.includes(indexName)) {
      await pc.createIndex({
        name: indexName,
        dimension: dimension,
        metric: "cosine", // Choose from 'cosine', 'dotproduct', or 'euclidean' based on your use case
        spec: { 
            serverless: { 
              cloud: 'aws', 
              region: 'us-east-1' 
            }
        }
    });
      console.log(`Index "${indexName}" created successfully.`);
    } else {
      console.log(`Index "${indexName}" already exists.`);
    }
  } catch (error) {
    console.error("Error creating index in Pinecone:", error);
  }
};

const uploadController = async (req, res) => {
  try {
    const albumId = req.body.albumId;
    const userId = req.body.userId;
    const imagePath = req.file.path;
    const imgDescription = await getImageDescription(imagePath);
    console.log("in match func:", imgDescription);

    const imageEmbedding = await getPromptEmbedding(imgDescription);
    console.log("image embeddings:", imageEmbedding);
    await createPineconeIndex(pc);
    const id = `${userId}_${albumId}_${Date.now()}`; // Create a unique ID for the embedding

    // Insert the embedding into Pinecone
    const indexName = "user-image-embeddings"; // Use your created index name
    const index = pc.Index(indexName);
    await index.upsert([{
      
          "id": id,
          "values": imageEmbedding,
          "metadata": {
            
            "userId": userId,
            "albumId": albumId,
            "description": imgDescription,
            "imagePath": imagePath, // Optional, to keep track of the image location
          },
        
      
    }]);

    res.json({ message: "Image uploaded and description embedded!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Image upload failed" });
  }
};

module.exports = { uploadController };
