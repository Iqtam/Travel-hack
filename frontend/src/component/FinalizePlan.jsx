import React from 'react'
import { useEffect,useState } from 'react';
import { useDestDetail } from '../Store';
import { useHotelDetail } from '../Store';
import { useCityStore } from '../Store';
import { useRestDetail } from '../Store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Button, Center, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import api from '../api';
function FinalizePlan() {
    const destinationData = useDestDetail((state) => state.detail);
    const hotelData = useHotelDetail((state) => state.hotel);
    const cityData = useCityStore((state) => state.city);
    const rest = useRestDetail((state) => state.rest);

    const [planData, setPlanData] = useState("");

    console.log(destinationData);
    console.log(hotelData);
    console.log(cityData);

    const getPlan=async()=>{    
        try{
            const apiData = await api.post('plan/',{
                rest: rest.name,
                dest: destinationData.DestinationName,
                hotel: hotelData.HotelName
            });
            console.log(apiData.data);
            setPlanData(apiData.data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getPlan();
    }, [])
  return (
    <div>
        <Flex  w={'100%'} p={'20px'}>
            <Center w='50%'>
                <VStack >
              
                    
                <Heading as={'h2'} p={'30px'} colorScheme='Green'> Generating Your Plan </Heading>
                
                <Text p={'10px'}>City: {cityData}</Text>
                <Text p={'10px'}>Destination: {destinationData.DestinationName}</Text>
                <Text p={'10px'}>Hotel: {hotelData.HotelName}</Text>

                <HStack><Link to='/destination'><Button m={'5px'}>Back</Button></Link>
                <Link to={'/'}><Button m={'10px'} mr={'40px'} colorScheme='green'>Return</Button></Link>
                </HStack>
                </VStack>
        
    
      
    </Center><Center w='50%'>
        {planData}
    </Center></Flex></div>
  )
}

export default FinalizePlan