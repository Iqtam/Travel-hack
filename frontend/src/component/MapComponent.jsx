// import React, { useCallback, useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

// const MapComponent = ({ locations }) => {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [directions, setDirections] = useState(null);

//   const mapCenter = { lat: 23.7806365, lng: 90.4193257 }; // Initial center

//   // Handle marker click
//   const handleMarkerClick = (location) => {
//     setSelectedLocation(location);
//   };

//   // Route visualization between two stops
//   const visualizeRoute = useCallback(async (start, end) => {
//     const directionsService = new window.google.maps.DirectionsService();
//     const result = await directionsService.route({
//       origin: { lat: start.lat, lng: start.lng },
//       destination: { lat: end.lat, lng: end.lng },
//       travelMode: window.google.maps.TravelMode.DRIVING,
//     });
//     if (result.status === "OK") {
//       setDirections(result);
//     }
//   }, []);

//   useEffect(() => {
//     // Example: Visualize the route between first two stops
//     if (locations.length >= 2) {
//       visualizeRoute(locations[0], locations[1]);
//     }
//   }, [locations, visualizeRoute]);

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyB1UOBnfU2NMx2soTgoz1BqhcA2jkhzflA">
//       <GoogleMap mapContainerStyle={{ height: "90vh", width: "100%" }} center={mapCenter} zoom={12}>
//         {locations.map((loc) => (
//           <Marker
//             key={loc.id}
//             position={{ lat: loc.lat, lng: loc.lng }}
//             title={loc.name}
//             onClick={() => handleMarkerClick(loc)}
//           />
//         ))}

//         {selectedLocation && (
//           <div className="location-details">
//             <h2>{selectedLocation.name}</h2>
//             <p>Type: {selectedLocation.type}</p>
//             {/* Additional details can be added here */}
//           </div>
//         )}

//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;

// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";

// const MapComponent = ({ locations }) => {
//   const [map, setMap] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const mapCenter = { lat: 23.7806365, lng: 90.4193257 }; // Center the map

//   // Handle directions rendering between the first two locations
//   useEffect(() => {
//     if (locations.length >= 2) {
//       const directionsService = new window.google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: { lat: locations[0].lat, lng: locations[0].lng }, // Start point
//           destination: { lat: locations[1].lat, lng: locations[1].lng }, // End point
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === "OK") {
//             setDirections(result);
//           }
//         }
//       );
//     }
//   }, [locations]);

//   // Handle map load and marker placement
//   const handleLoad = (mapInstance) => {
//     setMap(mapInstance);

//     // Add advanced markers for each location
//     locations.forEach((location) => {
//       if (window.google?.maps?.marker?.AdvancedMarkerElement) {
//         const markerElement = new window.google.maps.marker.AdvancedMarkerElement({
//           map: mapInstance,
//           position: { lat: location.lat, lng: location.lng },
//           title: location.name,
//         });
//       } else {
//         // Fallback to using the traditional Marker if AdvancedMarkerElement is undefined
//         new window.google.maps.Marker({
//           map: mapInstance,
//           position: { lat: location.lat, lng: location.lng },
//           title: location.name,
//         });
//       }
//     });
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyB1UOBnfU2NMx2soTgoz1BqhcA2jkhzflA" version="beta" libraries={['marker']}>
//       <GoogleMap
//         onLoad={handleLoad}
//         mapContainerStyle={{ height: "90vh", width: "100%" }}
//         center={mapCenter}
//         zoom={12}
//       >
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;

// "use client";

// import { useState } from "react";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
//   InfoWindow,
// } from "@vis.gl/react-google-maps";

// export default function MapComponent({location}) {
//   const position = { lat: 53.54, lng: 10 };
//   const [open, setOpen] = useState(false);

//   return (
//     <APIProvider apiKey={"AIzaSyB1UOBnfU2NMx2soTgoz1BqhcA2jkhzflA"}>
//       <div style={{ height: "100vh", width: "100%" }}>
//         <Map zoom={9} center={position} mapId={"fd166f18b262a2b"}>
//           <AdvancedMarker position={position} onClick={() => setOpen(true)}>
//             <Pin
//               background={"grey"}
//               borderColor={"green"}
//               glyphColor={"purple"}
//             />
//           </AdvancedMarker>

//           {open && (
//             <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
//               <p>I'm in Hamburg</p>
//             </InfoWindow>
//           )}
//         </Map>
//       </div>
//     </APIProvider>
//   );
// }

import React, { useEffect, useState } from "react";
import {Spinner } from "@chakra-ui/react";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";


const MapComponent = ({ locations }) => {

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const mapCenter = { lat: 23.7806365, lng: 90.4193257 }; // Center the map
console.log(locations);
  useEffect(() => {
    if (locations) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: mapCenter, // Start point
          destination: { lat: locations[0].lat, lng: locations[0].lng }, // End point
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          }
        }
      );
    }
  }, [locations]);
  useEffect(() => {
    if(window){if (window.google && window.google.maps) {
      setMapLoaded(true);
      initializeMap();
      return;
    }}
  });
  const initializeMap = () => {
    try {
      if (!window.google || !window.google.maps) {
        throw new Error('Google Maps not loaded');
      }

      const mapInstance = new window.google.maps.Map(
        document.getElementById('google-map'),
        {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        }
      );

      setMap(mapInstance);
    } catch (error) {
      setMapError('Error initializing map');
      console.error('Map initialization error:', error);
    }
  };

  const handleLoad = (mapInstance) => {
    setMap(mapInstance);

    locations.forEach((location) => {
      if (window.google?.maps?.marker?.AdvancedMarkerElement) {
        const markerElement = new window.google.maps.marker.AdvancedMarkerElement({
          map: mapInstance,
          position: { lat: location.lat, lng: location.lng },
          title: location.name,
        });
      } else {
        new window.google.maps.Marker({
          map: mapInstance,
          position: { lat: location.lat, lng: location.lng },
          title: location.name,
        });
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB1UOBnfU2NMx2soTgoz1BqhcA2jkhzflA" version="beta" libraries={['marker']}>
      <GoogleMap
        onLoad={handleLoad}
        mapContainerStyle={{ height: "85vh", width: "100%" }}
        center={mapCenter}
        zoom={12}
        options={{ mapId: "fd166f18b262a2b" }}  // Set your Map ID here
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
