import React, { useState } from 'react';
import { Avatar, Box, Button, Center, CloseButton, Flex, HStack, Heading,IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, VStack, chakra, useColorMode, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
// import { useLocalStorage } from "../LocalStorage";

const Navbar3 = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue("white", "gray.700");
    const txtCol = useColorModeValue("green.600", "green.300");

    return (
        <Box style={{ zIndex: '20' }} position={'sticky'} top='0' color={''}>
            <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4, }} py={3} shadow="md">
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <Flex>
                        <chakra.a href="/" title="Home Page" display="flex" alignItems="center" style={{ padding: '2px' }}>
                            <img src={'/logo.png'}
                                width='50px' alt='logo' />
                           
                        </chakra.a>
                        <Heading as={'h2'} color={txtCol}>TravelHack</Heading>

                    </Flex>
                    <HStack display="flex" alignItems="center" spacing={1}>
                       

                        <HStack spacing={1} mr={1} color="brand.500" display={{ base: "none", md: "inline-flex", }}>
                            <Link to={'/'} style={{margin:"10px"}} >Home</Link>
                            <Link to={'/albums'} >Albums</Link>
                            <Link to={'/about' } style={{marginLeft:"10px"}}>About</Link>
                            <Button onClick={toggleColorMode} variant="ghost">
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            

                        </HStack>
                    </HStack>
                </Flex>
            </chakra.header>
        </Box>
    );
}
export default Navbar3;