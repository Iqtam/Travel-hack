// const { getClient } = require("../data/database");
// const client = getClient();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
require("dotenv").config();
const apiKey =process.env.GOOGLE_MAP_API ; 

// Function to get coordinates of a city using Google Geocoding API
const getCoordinates = async (city) => {
  console.log("cordinates",city)
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
  try {
      const response = await axios.get(geocodeUrl);
      if (response.data.results && response.data.results.length > 0) {
          const location = response.data.results[0].geometry.location;
          return location; // Returns { lat: ..., lng: ... }
      } else {
          throw new Error('City not found');
      }
  } catch (error) {
      throw new Error('Error fetching city coordinates');
  }
};

// Function to fetch nearby hotels using Google Places API
let getHotels = (lat, lon) => {
  let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=lodging&key=${apiKey}`;
  return fetch(placesUrl)
      .then(response => response.json())
      .then(data => data.results); // Returns an array of hotel results
};


const transformHotelData = (googleData) => {
  console.log('Transforming Hotel Data:', googleData); 
  const transformedData = {
      _id: uuidv4(), // Generate a unique ID
      HotelID: null, // Set to null for empty field
      HotelName: googleData.name,
      city_id: null, // Set to null for empty field
      low: null, // Set to null for empty field
      mid: null, // Set to null for empty field
      high: null, // Set to null for empty field
      star: googleData.rating ? Math.round(googleData.rating) : null, // Handle missing rating
      lat: googleData.geometry && googleData.geometry.location ? googleData.geometry.location.lat : null,
      lng: googleData.geometry && googleData.geometry.location ? googleData.geometry.location.lng : null,
      site_url: `https://www.google.com/search?q=${encodeURIComponent(googleData.name)}`,
      img_url: googleData.photos && googleData.photos.length > 0 
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${googleData.photos[0].photo_reference}&key=${apiKey}` 
          : "https://picsum.photos/200/300?image=14" ,
          price_level: googleData.price_level !== undefined ? googleData.price_level : null // Add price level handling// Fallback image
  };

  console.log('Transformed Hotel Data:', transformedData); // Log the transformed data
  return transformedData;

};


const hotel_controller = async (req, res) => {
  try {
    console.log(req)
    const city = req.body.city;

     // Step 1: Get the coordinates of the city
     const location = await getCoordinates(city);

     // Step 2: Get the hotels near the city's coordinates
     const hotels = await getHotels(location.lat, location.lng);

    // const transformedHotels = hotels.map(hotel => transformHotelData(hotel));
    const transformedHotels = await Promise.all(hotels.map(hotel => transformHotelData(hotel)));

     console.log("ans:",transformedHotels);
     res.json(transformedHotels);


  } catch (err) {
    console.error("Error in hotelController: ", err);
    res.status(500).json({ error: 'Failed to fetch response for hotel', details: err.message });
  }
};

module.exports = { hotel_controller };
