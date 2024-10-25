import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import AlbumCard from './AlbumCard'
import ImageCard from './ImageCard';

function AlbumView() {

    const handleClick = () => {
        console.log('Add Image');
    }

    const albums = ['alice', 'bob','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];
  return (
    <div>
        <Button onClick={handleClick} m={'20px'} pos={'sticky'} colorScheme='green'>Add Image</Button>
        <Flex w={'100%'} p={'20px'}>
        <SimpleGrid spacing={4} w={'80%'} ml={'10%'} templateColumns='repeat(auto-fill,minmax(300px,1fr))'>
                {albums.map((alb) => (<div> 
                <ImageCard key={alb.ID} album={alb} /></div>
                    ))}
                

                </SimpleGrid>
        </Flex>
    </div>
  )
}

export default AlbumView