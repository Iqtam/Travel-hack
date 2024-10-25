const { getCoordinates, getDestinations, transformDestinationData } = require('../services/cityService');

exports.cityController = async (req, res) => {
    try {
        const cityName = req.body.city;
        console.log("CityName:", cityName);

        // Step 1: Get the coordinates of the city
        const location = await getCoordinates(cityName);

        // Step 2: Get the destinations near the city's coordinates
        const destinations = await getDestinations(location.lat, location.lng);
        
       // const transformedDestinations = await destinations.map(destination => transformDestinationData(destination));
        const transformedDestinations = await Promise.all(destinations.map(destination => transformDestinationData(destination)));

        console.log("ans:", transformedDestinations);

        // Return the destination data
        res.json(transformedDestinations);

    } catch (err) {  // err instead of error
        console.log("In error cityController: ", err);
        res.status(500).json({ error: 'Failed to fetch response for city', details: err.message });  // err.message instead of error.message
    }
};
