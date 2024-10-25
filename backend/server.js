const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// database connect code 
const {getClient,connectDB}=require("./data/database.js");
const client=getClient();
connectDB(client);


//import routes
const hotelRoute=require('./routes/hotelRoute.js')
const destinationRouter = require('./routes/destinationRoute.js');
const restaurantRouter = require('./routes/restRoute.js');
const activityRouter = require('./routes/activityRoute.js');
const cityRouter =require('./routes/cityRoute.js');
const blogRouter = require('./routes/blogRoute.js');
const textualSearchRouter = require('./routes/textualSearchRoute.js');
const planRouter=require('./routes/planRoute.js')
const uploadRouter=require('./routes/uploadRoute.js')
const albumRouter=require('./routes/albumRoute.js')

const app = express();
//middleware setup
app.use(cors());
app.use(bodyParser.json());


// Routes setup
app.use('/api/destination', destinationRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/activity', activityRouter);
app.use('/api/city',cityRouter);
app.use('/api/hotel',hotelRoute);
app.use('/api/generate', blogRouter);
app.use('/api/search',textualSearchRouter);
app.use('/api/create-plan',planRouter);
app.use('/api/upload',uploadRouter);
app.use('/api/albums',albumRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

