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
  import { useHotelDetail } from '../Store'
  import DestinationCard from './DestinationCard'
  import { useState,useEffect } from 'react'
  import { useParams } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom'
    import HotelCard from './HotelCard'

import api from '../api';


function Hotel() {
    const { id } = useParams();
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState({});

    const SelectHandler = (hotel) => {
        setSelectedHotel(hotel);
        console.log(hotel.HotelName);
    }

    //const destinations = useDestStore((state) => state.dest);

    // console.log(props.data);
    // const getDest = () => {
    //     console.log('getDest');
    //     console.log(destinations);
    // }
   ;
   const navigate = useNavigate();
    
   

   const hotels2 = useHotelStore((state) => state.hotels);
   console.log(hotels2);
   console.log('hotels2');

   const hotelSet= useHotelDetail((state) => state.setHotel);

   const HandleProceed = ()=>{
    console.log('Proceeding to resturant');
    hotelSet(selectedHotel);
    console.log(selectedHotel);
    navigate('/restu');
   }


    // useEffect(() => {
    //     setHotels(hotels2);

    // }, [hotels2])
    
  return (
        <Box padding={'20px'}>
            <HStack><Heading as={'h2'} padding={'20px'}>Available Hotels</Heading>
            { Object.keys(selectedHotel).length>0 ? (<><Text>Selected- {selectedHotel.HotelName}</Text><Button m={'10px'} colorScheme='green' onClick={HandleProceed}>Proceed</Button></>) : (<Text>Select a hotel</Text>)}</HStack>
          
            {/* <HStack> */}
                {/* <Box backgroundColor={'purple'}><div style={{width:"600px", height:"96vh"}} >text</div></Box> */}
                {/* <Box padding={2} style={{  }}><Heading as={'h2'} style={{ }}>Cards here</Heading> */}
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill,minmax(300px,1fr))'>
                {hotels2.length>0? ( hotels2.map((hot) => (<div 
                  style={{
                    cursor: 'pointer',
                  }}>
                <HotelCard key={hot.HotelID} hotel={hot} selectHandler={SelectHandler}/></div>
                    ))): <p>Loading hotels...</p>}
                

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

export default Hotel