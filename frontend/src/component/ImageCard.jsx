import React from 'react'
import { Card, CardBody, CardFooter, ButtonGroup, Button, Image, Divider,Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function ImageCard() {

    // const clickHandler = () => {
    //     console.log('View Album');

    // };
    const id=0;
  return (
    <div><Card maxW='sm'>
    <CardBody>
      <Image
        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Green double couch with wooden legs'
        borderRadius='lg'
      />
      
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button variant='solid'  colorScheme='green' w={'100'}>
          View
        </Button>
        <Button variant='solid'  colorScheme='red' w={'100'}>
          Delete
        </Button>
        {/* <Button variant='ghost' colorScheme='red'>
          Delete
        </Button> */}
      </ButtonGroup>
      <Text ml={'20px'} fontSize={'2xl'}></Text>
    </CardFooter>
  </Card></div>
  )
}

export default ImageCard
