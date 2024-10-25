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
  import {useBearStore} from '../Store'
  import {useDestStore} from '../Store'
  import DestinationCard from './DestinationCard'
  import { useState } from 'react'

function Plan() {

  const [isHovered2, setIsHovered2] = useState({});
    
    const increasePopulation = useBearStore((state) => state.increasePopulation)
    const data = useBearStore((state) => state.bears);
    const destinations = useDestStore((state) => state.dest);

    // console.log(props.data);
    const getDest = () => {
        console.log('getDest');
        console.log(destinations);
    }
    
  return (
        <Box padding={'20px'}>
          <Heading as={'h2'} padding={'20px'}>Available Destinations</Heading>
            {/* <HStack> */}
                {/* <Box backgroundColor={'purple'}><div style={{width:"600px", height:"96vh"}} >text</div></Box> */}
                {/* <Box padding={2} style={{  }}><Heading as={'h2'} style={{ }}>Cards here</Heading> */}
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill,minmax(300px,1fr))'>
                {destinations.map((dest) => (<div 
          
                  style={{
                    
                    cursor: 'pointer',
          
                  }}>
                <DestinationCard key={dest.DestinationID} dest={dest} /></div>
                    ))}
                

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

export default Plan