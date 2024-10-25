import React from 'react'
import {useNavigate} from 'react-router-dom'
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
    UnorderedList,
    ListItem
  } from '@chakra-ui/react'
  import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
  import { useEffect, useState } from 'react'
  import {useCityStore} from '../Store'
  import api from '../api';

//   import HotelCard from './components/HotelCard'
//   import Navbar from './components/Navbar'
//   import Hero from './components/Hero'
//   import Navbar2 from './components/Navbar2'
  
  export default function Home(props) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const [list, setList] = useState([]);
    // const [search, setSearch] = useState('')
  
    // const [hotels, setHotels] = useState([])
    // const [restaurants, setRestaurants] = useState([])
    // const [activities, setActivities] = useState([])
    // const [trips, setTrips] = useState([])
    const [city, setcity] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    // const [budget, setBudget] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [cities, setCities] = useState([]);

    const navigate = useNavigate();

    const storeCity = useCityStore((state) => state.setCity);

    // setSelectedDate=(new Date().toISOString().split('T')[0]);
    
    
  
    // async function getDestinations() {
    //   const url = `http://localhost:3000/api/v1/destination?name=${search}&page=1&per_page=5&orderby=name&ordertype=asc`
    //   const f = await fetch(url)
    //   const j = await f.json()
    //   setDestinations(j)
    // }
    // async function getTrips() {
    //   const url = `http://localhost:3000/api/v1/trip?name=${search}`
    //   const f = await fetch(url)
    //   const j = await f.json()
    //   setTrips(j)
    // }
    // async function getActivities() {
    //   const url = `http://localhost:3000/api/v1/activity?name=${search}&page=1&per_page=6&orderby=name&ordertype=desc`
    //   const f = await fetch(url)
    //   const j = await f.json()
    //   setActivities(j)
    // }
    // async function getHotels() {
    //   const url = `http://localhost:3000/api/v1/hotel?name=${search}&orderby=price_per_day&ordertype=desc&page=1&per_page=10`
    //   const f = await fetch(url)
    //   const j = await f.json()
    //   setHotels(j)
    // }
    // async function getRestaurants() {
    //   const url = `http://localhost:3000/api/v1/restaurant?name=${search}&page=1&per_page=10`
    //   const f = await fetch(url)
    //   const j = await f.json()
    //   setRestaurants(j)
    // }

    
  
    function searchClick() {
    //   getHotels()
    //   getRestaurants()
    //   getActivities()
    //   getTrips()
    //   getDestinations()

    if(city === "" || selectedDate==='') {
        alert('Please fill all fields');
        return;
    }
    storeCity(city);
      const tourData = {
          city: city,
          start_date: selectedDate
      }
    console.log(tourData);

    const apiResponse = props.getDetail(tourData);
    navigate('/destination');
    }
    
  
    useEffect(() => {
        setSelectedDate(new Date().toISOString().split('T')[0]);
        getCity();
    }, [])

    const getCity = async (city) => {
      const res=["Dhaka","Sylhet","Chittagong"];
      setCities(res);    }

    //var names = [''];

    const handleInputChange = (e) => {
      const value = e.target.value;
      setcity(value);
  
      // Filter names based on input value
      if (value) {
        const filteredSuggestions = cities.filter((name) =>
          name.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    };

      // Handle the click on suggestion
  const handleSuggestionClick = (suggestion) => {
    setcity(suggestion);
    console.log(suggestion);
    setSuggestions([]); // Clear suggestions once a name is selected
  };


    return (
      <Box>
        {/* <Navbar2 /> */}
        {/* <Hero /> */}
        <Box p={4}>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <Tabs variant='unstyled'>
              <TabList>
                <Tab>Search All</Tab>
                <Tab>Hotels</Tab>
                <Tab>Activities</Tab>
                <Tab>Restaurants</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
            </Tabs> */}
           <Heading lineHeight='tall'>
                Plan Your Tour.
            
            </Heading>
          </Box><br />
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <VStack>
            <Text color={'gray.1000'}>
                <Text p={'2'}>Enter city</Text>
              <InputGroup>
                <Input value={city} style={{ width: '600px', height: '50px', borderRadius: '50px', borderColor: 'gray' }} onChange={handleInputChange}></Input>
              </InputGroup>
              {suggestions.length > 0 && (
                <UnorderedList>
                {suggestions.map((suggestion, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    >
                    {suggestion}
                    </ListItem>
                  ))}
                    </UnorderedList>
                   )}
            </Text>
            <Text color={'gray.1000'}>
            <Text p={'2'}>When will you start</Text>
              <InputGroup>
              <Input placeholder='Select Date and Time' size='md' type='date' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </InputGroup>
            </Text>
            </VStack>
          </Box><br />
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              onClick={searchClick}
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              size='md'
              _hover={{
                bg: 'green.500',
              }}>
              Plan
            </Button>
          </Box>
          <br />
          {/* <InputGroup style={{ 'width': '50%' }}>
              <InputLeftAddon children='Search' />
              <Input variant='outline' placeholder='Where do you wanna go?' onChange={(e) => setSearch(e.target.value)} />
            </InputGroup> */}
  
          {/* {hotels.length > 0 && <Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'centers' }}>
              <Heading>Hotels</Heading>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'centers' }}>
                {
                  hotels.map((item, index) => (
                    <HotelCard style={{width:'400px'}} props={item} />
                  ))
                }
            </Box>
          </Box>
          }
          
          {destinations.length > 0 && <Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'centers' }}>
              <Heading>Destinations</Heading>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'centers' }}>
              <SimpleGrid columns={{ sm: 1, md: 3, lg: 4, xl: 5 }} spacing={5} style={{ width: '100%' }} p='30px'>
                {
                  destinations.map((item, index) => (
                    <HotelCard props={item} />
                  ))
                }
              </SimpleGrid>
            </Box>
          </Box>
          } */}
  
        </Box>
      </Box >
    )
  }
  const styles = {
    container: {
      position: 'relative',
      width: '300px',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    suggestionsList: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '4px',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      maxHeight: '150px',
      overflowY: 'auto',
      zIndex: 1,
    },
    suggestionItem: {
      padding: '10px',
      cursor: 'pointer',
    },
  };