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
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { selectUser,clearUser } from "../store/slice/UserSlice";
import { Link } from "react-router-dom";// Import selectUser selector

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => { 
    dispatch(clearUser());
    dispatch(logout());
    navigate("/login");
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
        {isLoggedIn && <Button onClick={toggleDrawer}>menu</Button>}
        <Link to="/home">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white" // Set color to white
            bgGradient="linear(to-r, teal.200, cyan.200)"
            bgClip="text"
          >
            EMP DB SYSTEM
          </Text>
        </Link>
        <Box>
          {/* Conditionally render logout button based on login state */}
          {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
        </Box>
      </Flex>
      {isLoggedIn && ( // Render the Drawer only if user is logged in
        <Drawer placement="left" isOpen={isOpen} onClose={toggleDrawer}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4}>
                <UserMenu />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

const UserMenu = () => {
  const user = useSelector(selectUser); 

  return (
    <>
    
      {user &&
        user.permissions.map((permission, index) => (
          <Button key={index}>{permission}</Button>
        ))}
    </>
  );
};

export default Navbar;
