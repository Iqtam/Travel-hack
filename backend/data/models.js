const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for Trips
const tripSchema = new Schema({
  
  destinationid: {
    type: String,
    required: true
  },
  hotelid: {
    type: String,
    required: true
  },
  restaurantid: {
    type: String,
    required: true
  },
  eventid: {
    type: String,
    required: true
  },
  activityid: {
    type: String,
    required: true
  }
});

const imageSchema=new Schema({
  path:{
      type:String,
      required:true
  },
  description:{
      type:String,
      required:true
  }
})
// Define the schema for Albums
const albumSchema = new Schema({
  userId:{
    type:String,
    required:true
  },
  albumname:{
    type:String,
    required:true
  },
  tripid: {
    type: String,
    required: true
  },
  images: [imageSchema]
});

// Define the schema for Blogs
const blogSchema = new Schema({
  blog: {
    type: String, // Blog content in text form
    required: true
  },
  userId:{
    type: String,
    required:true
  }
});

const vlogSchema = new Schema({
    vlog: {
      type: String, // vlog content in text form
      required: true
    },
    userId:{
      type: String,
      required:true
    }
  });

// Define the schema for User
const userSchema = new Schema({
  userId:{
    type:String,
    required:true
  },
  trips: [tripSchema],
  albums: [albumSchema],
  blogs: [blogSchema],
  vlogs:[vlogSchema]
});

// Create the User model
const User = mongoose.model('User', userSchema);

const Album=mongoose.model('Album',albumSchema);
const Trip =mongoose.model('Trip',tripSchema);
const Image=mongoose.model('Image',imageSchema);
const Blog =mongoose.model('Blog',blogSchema);
const Vlog=mongoose.model('Vlog',vlogSchema);

// Export the User model
module.exports = {User,Album,Trip,Image,Blog,Vlog};
