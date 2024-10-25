import React from 'react'

 
  import {useHotelStore} from '../Store'
  import DestinationCard from './DestinationCard'
  import { useState,useEffect } from 'react'
  import { useParams,useNavigate } from 'react-router-dom';
    import HotelCard from './HotelCard'
import {useCityStore} from '../Store' 
import api from '../api';

function Hotel() {
    const { id } = useParams();

    const navigate = useNavigate();
    
    const [responseMessage, setResponseMessage] = useState('');
    //const destinations = useDestStore((state) => state.dest);

    // console.log(props.data);
    // const getDest = () => {
    //     console.log('getDest');
    //     console.log(destinations);
    // }
    const hotelSet = useHotelStore((state) => state.setHotels);
    const hotels2 = useHotelStore((state) => state.hotels);
    const cityName=useCityStore((state)=>state.city);
    
    console.log(cityName);
    console.log(hotels2);



    const getHotelHandler = async () => {
        // return new Promise(async (resolve, reject) => {
        //     try {
        //         const city=cityName
        //         const apiData = await api.post(`hotel`,city);
        //          console.log('in hotel list');
        //         console.log(apiData.data);
        //         hotelSet(apiData.data);
                
        //         resolve(apiData.data);
        //     } catch (error) {
        //         reject(error);
        //     } finally {
        //         navigate(`/hotel2/${id}`);
        //         console.log('finally');
        //     }
        // });
        const requestBody = JSON.stringify({
            city: cityName,  // Your string body here
          });
      
          try {
            const response = await fetch('http://localhost:5000/api/hotel', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Define content type
              },
              body: requestBody, // Pass the string body
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(data)
              hotelSet(data)
              navigate(`/hotel2/${id}`);
              setResponseMessage('Success: ' + data.message);
            } else {
              setResponseMessage('Error: Failed to post data');
            }
          } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Error: ' + error.message);
          }
      };


    useEffect(() => {
        const data = getHotelHandler();
    }, [])
    
  return (
        <div >  </div> )
}

export default Hotel