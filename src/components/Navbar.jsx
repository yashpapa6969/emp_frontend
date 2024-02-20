import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Text,
} from "@chakra-ui/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Flex
        bg="teal"
        justify="space-between"
        align="center"
        px={4}
        py={2}
        color="white"
      >
        <Button onClick={toggleDrawer}>Toggle Sidebar</Button>
        <Text fontSize="xl" fontWeight="bold">
          My Website
        </Text>
        <Box>{/* Add your other Navbar items here */}</Box>
      </Flex>
      <Drawer placement="left" isOpen={isOpen} onClose={toggleDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <Button>Link 1</Button>
              <Button>Link 2</Button>
              <Button>Link 3</Button>
              {/* Add more sidebar items as needed */}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
