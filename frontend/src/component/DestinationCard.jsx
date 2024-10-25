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


function DestinationCard(props) {
  return (<Link to={`./${props.dest.DestinationID}`}>
    <Card maxW='md' maxH={'500px'}>
    <CardBody>
      <Image
        src={props.dest.img_url}
        alt='Green area'
        borderRadius='lg'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>{props.dest.DestinationName}</Heading>
        
        <Text color='blue.600' fontSize='2xl'>
          Cost: {props.dest.estimated_cost*1000}
        </Text>
        <StarRating rating = {props.dest.rating}/>
        
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      
    </CardFooter>
  </Card>
  </Link>
  )
}

export default DestinationCard