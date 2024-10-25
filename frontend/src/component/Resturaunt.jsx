import React from 'react'
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    Highlight, 
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Grid,
    GridItem,
    SimpleGrid,
    InputGroup,
    InputLeftAddon,
    Input,
    Tabs,
    TabList,
    Tab,
    TabIndicator,
    Heading,
    VStack,
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Image,
    Divider,
    ButtonGroup,
  } from '@chakra-ui/react'
 
  import {useHotelStore} from '../Store'
  import { useRestDetail } from '../Store'
  import { useHotelDetail } from '../Store'
  import DestinationCard from './DestinationCard'
  import { useState,useEffect } from 'react'
  import { useParams } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom'
    import HotelCard from './HotelCard'
    import RestCard from './RestCard'
    import { useCityStore } from '../Store'

import api from '../api';


function Restaurant() {
    const { id } = useParams();
    const [rest, setrest] = useState([]);
    const [selectedRest, setSelectedRest] = useState({});
    const [responseMessage, setResponseMessage] = useState('');
    const cityName=useCityStore((state)=>state.city);

    const SelectHandler = (r) => {
        setSelectedRest(r);
        // console.log(r.);
    }

    //const destinations = useDestStore((state) => state.dest);

    // console.log(props.data);
    // const getDest = () => {
    //     console.log('getDest');
    //     console.log(destinations);
    // }
   ;
   const navigate = useNavigate();
    

   const RestSet= useRestDetail((state) => state.setRest);

   const HandleProceed = ()=>{
    console.log('Proceeding to final planning');
    RestSet(selectedRest);
    console.log(selectedRest);
    navigate('/finalize');
   }


    // useEffect(() => {
    //     setHotels(hotels2);

    // }, [hotels2])

    const getRestHandler = async () => {
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
            const response = await fetch('http://localhost:5000/api/restaurant', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Define content type
              },
              body: requestBody, // Pass the string body
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(data)
              setrest(data)
              
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
        const data = getRestHandler();
    }, [])
    
  return (
        <Box padding={'20px'}>
            <HStack><Heading as={'h2'} padding={'20px'}>Available Restaurant</Heading>
            { Object.keys(selectedRest).length>0 ? (<><Text>Selected- {selectedRest.RestaurantName}</Text><Button m={'10px'} colorScheme='green' onClick={HandleProceed}>Proceed</Button></>) : (<Text>Select a Restaurant</Text>)}</HStack>
          
            {/* <HStack> */}
                {/* <Box backgroundColor={'purple'}><div style={{width:"600px", height:"96vh"}} >text</div></Box> */}
                {/* <Box padding={2} style={{  }}><Heading as={'h2'} style={{ }}>Cards here</Heading> */}
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill,minmax(300px,1fr))'>
                {rest.length>0? ( rest.map((r) => (<div 
                  style={{
                    cursor: 'pointer',
                  }}>
                <RestCard key={r.RestaurantID} rest={r} selectHandler={SelectHandler}/></div>
                    ))): <p>Loading...</p>}
                

                </SimpleGrid>
                {/* <Heading as={'h2'} style={{ }}>{data}</Heading>
                <Heading as={'h2'}>1</Heading> */}
                {/* <Button onClick={increasePopulation} m={'5px'}>Increase</Button>
                <Button onClick={getDest} m={'5px'}>Destinations</Button> */}
                {/* </Box>

            </HStack> */}
        </Box>

  )
}

export default Restaurant