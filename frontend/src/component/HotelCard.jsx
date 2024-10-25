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
    Progress,
  } from '@chakra-ui/react'
  import StarRating from './StarRating'
  import {Link} from 'react-router-dom'



function HotelCard(props) {
    
    console.log(props.hotel.HotelID);

    
  return (<>
    <Card maxW='md' maxH={'500px'}>
    {/* <Link to={`/hotelDetail/${props.hotel.HotelID}`}> */}
    <CardBody>
    
      <Image
        src={props.hotel.img_url}
        alt='Green hotel'
        borderRadius='lg'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>{props.hotel.HotelName}</Heading>
        
        {/* <Text color='blue.600' fontSize='2xl'>
          Cost: {props.dest.estimated_cost*1000}
        </Text> */}
        {/* <StarRating rating = {props.dest.rating}/> */}

        
        
      </Stack>
    </CardBody>
    {/* </Link> */}
    <Divider />
    
    <CardFooter>
    <Text color='blue.500' fontSize='2xl'>
          <a href={props.hotel.site_url}>Visit Site</a>
        </Text> 
        <Button ml={'30px'} colorScheme='green' onClick={()=>props.selectHandler(props.hotel)}>Select</Button>
    </CardFooter>
  </Card></>
  
  )
}

export default HotelCard