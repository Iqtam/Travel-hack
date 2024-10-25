import React from 'react'
import { useParams } from 'react-router-dom';
import api from '../api';
import { Flex, Center, Text, Heading,Image, HStack, VStack, Button } from '@chakra-ui/react';
import { useDestDetail, useDestStore } from '../Store';
import { useEffect,useState } from 'react';
import MapComponent from './MapComponent'; // Import the MapComponent
import MapsPlaceHolder from './MapsPlaceHolder';

import {Link} from 'react-router-dom'

class ErrorBoundary extends React.Component {
    state = { hasError: false };
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      console.error('Map Error:', error, info);
    }
  
    render() {
      if (this.state.hasError) {
        return <div>Something went wrong with the map.</div>;
      }
      return this.props.children;
    }
  }

function DestinationDetail() {
    const { id } = useParams();

    const [destinationData, setdestinationData] = useState({});

    const destinationSet = useDestDetail((state) => state.setDet);
    const destinationData1 = useDestDetail((state) => state.detail);
    const destlist=useDestStore((state)=>state.dest);
    console.log(destlist)
    const getDetailHandler = async (tourData) => {
        // return new Promise(async (resolve, reject) => {
        //     try {
        //         const apiData = await api.get(`destination/${id}`);
        //         // console.log('in destination detail');
        //         // console.log(apiData.data);
        //         destinationSet(apiData.data[0]);
        //         setdestinationData(apiData.data[0]);
        //         resolve(apiData.data);
        //     } catch (error) {
        //         reject(error);
        //     }
        // });
        console.log("abcd")
        console.log(destlist)
        const onedest= destlist.find(destination => destination.DestinationID == id);
        setdestinationData(onedest);
        destinationSet(onedest);
        console.log(onedest)
        

      };

    


    console.log('in destination detail');

    console.log(destinationData);

    useEffect(() => {
        const data = getDetailHandler();
        
    }, [])

    const locationData = destinationData.lat && destinationData.lng ? [{
        id: destinationData.DestinationID,
        name: destinationData.DestinationName,
        lat: destinationData.lat,
        lng: destinationData.lng,
        type: "destination"
      }] : [];

  return (
    <div>
        <Flex  w={'100%'} p={'20px'}>
            <Center w='50%'>
                <VStack>
                    <HStack>
                        <Image
                        src={destinationData.img_url}
                        alt='Green area'
                        borderRadius='lg'
                        p={'2px'}
                    />
                <Heading as={'h2'} p={'10px'}> {destinationData.DestinationName} </Heading>
                </HStack>
                <Text p={'30px'}>{destinationData.Description}</Text>
                <HStack><Link to='/destination'><Button m={'5px'}>Back</Button></Link>
                <Link to={`/hotel/${destinationData.DestinationID}`}><Button m={'10px'} mr={'40px'} colorScheme='green'>Proceed</Button></Link>
                </HStack>
                </VStack>
        
    
      
    </Center><Center w='50%'>
    {locationData.length > 0 ? (
        <ErrorBoundary>
            {/* <MapComponent locations={locationData} /> // Pass the location data to the MapComponent */}
            <MapComponent/>
            </ErrorBoundary>
          ) : (
            <Text>Loading map...</Text> // Show loading message or fallback UI
          )}
    </Center></Flex></div>
  )
}

export default DestinationDetail