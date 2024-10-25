/*import { Flex, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import AlbumCard from './AlbumCard'

function Album() {

    const albums = ['alice', 'bob'];
  return (
    <div>
        <Flex w={'100%'} p={'20px'}>
        <SimpleGrid spacing={4} w={'80%'} templateColumns='repeat(auto-fill,minmax(300px,1fr))'>
                {albums.map((alb) => (<div> 
                <AlbumCard key={alb.ID} album={alb} /></div>
                    ))}
                

                </SimpleGrid>
        </Flex>
    </div>
  )
}

export default Album
*/

//
import { Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AlbumCard from './AlbumCard';
import axios from 'axios'; // or you can use fetch if you prefer

function Album() {
  // State to store album data
  const [albums, setAlbums] = useState([]);

  // Fetch albums from API on component mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // Example API call (replace with your actual API URL)
        const response = await axios.get('albums/${userId}');
        setAlbums(response.data); // Set the fetched albums into the state
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums(); // Call the fetch function
  }, []);

  return (
    <div>
      <Flex w={'100%'} p={'20px'}>
        <SimpleGrid spacing={4} w={'80%'} templateColumns='repeat(auto-fill,minmax(300px,1fr))'>
          {albums.length > 0 ? (
            albums.map((album) => (
              <div key={album.id}> 
                {/* Pass the album object to AlbumCard */}
                <AlbumCard album={album} />
              </div>
            ))
          ) : (
            <p>Loading albums...</p>
          )}
        </SimpleGrid>
      </Flex>
    </div>
  );
}

export default Album;
