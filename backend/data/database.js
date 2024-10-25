const mongoose = require("mongoose");
const {MongoClient}=require('mongodb');
const uri=process.env.MONGO_URI;

const getClient=()=>{
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return client;
}

const connectDB = async (client) => {
    try {
      await client.connect();
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

module.exports = {connectDB,getClient};


// const { MongoClient } = require('mongodb');
// const uri = process.env.MONGO_URI;

// const getClient = () => {
//     const client = new MongoClient(uri, { tls: true, tlsAllowInvalidCertificates: true });
//     return client;
// };

// const connectDB = async (client) => {
//     try {
//         await client.connect();
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// };

// module.exports = { connectDB, getClient };

