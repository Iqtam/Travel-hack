const dummyData = {
  users: [
    {
        userId:"user1",
      trips: [
        {
          destinationid: "dest123",
          hotelid: "hotel456",
          restaurantid: "rest789",
          eventid: "event101",
          activityid: "activity112",
        },
        {
          destinationid: "dest124",
          hotelid: "hotel457",
          restaurantid: "rest790",
          eventid: "event102",
          activityid: "activity113",
        },
      ],
      albums: [
        {
          userId: "user1",
          albumname: "Summer Vacation",
          tripid: "trip123",
          images: [
            {
              path: "uploads/image1.jpg",
              description: "Beautiful sunset at the beach",
            },
            {
              path: "uploads/image2.jpg",
              description: "Fun day at the amusement park",
            },
          ],
        },
      ],
      blogs: [
        {
          blog: "My adventures in Hawaii were unforgettable!",
          userId: "user1",
        },
        {
          blog: "Top 10 places to visit in Paris",
          userId: "user1",
        },
      ],
      vlogs: [
        {
          vlog: "Exploring the streets of Tokyo",
          userId: "user1",
        },
        {
          vlog: "A day in the life in New York City",
          userId: "user1",
        },
      ],
    },
    {
        userId:"user2",
      trips: [
        {
          destinationid: "dest125",
          hotelid: "hotel458",
          restaurantid: "rest791",
          eventid: "event103",
          activityid: "activity114",
        },
      ],
      albums: [
        {
          userId: "user2",
          albumname: "Winter Getaway",
          tripid: "trip124",
          images: [
            {
              path: "uploads/image3.jpg",
              description: "Snow-covered mountains",
            },
            {
              path: "uploads/image4.jpg",
              description: "Skiing at the resort",
            },
          ],
        },
      ],
      blogs: [
        {
          blog: "Winter activities in the Alps",
          userId: "user2",
        },
      ],
      vlogs: [
        {
          vlog: "A trip through the snowy countryside",
          userId: "user2",
        },
      ],
    },
  ],
};

// Sample code to insert the dummy data into the database
const mongoose = require("mongoose");
const { User } = require("./models"); // Adjust the path as necessary

mongoose
  .connect("mongodb+srv://travelhack:travelhack@travelhackcluster.chkjx.mongodb.net/?retryWrites=true&w=majority&appName=TravelHackCluster", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await User.insertMany(dummyData.users);
    console.log("Dummy data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting dummy data:", error);
  });
