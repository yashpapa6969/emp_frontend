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
import { selectUser, clearUser } from "../store/slice/UserSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(logout());
    navigate("/login");
  };

  const boxData = [
    {
      label: "User Information",
      route: "/UserInfo",
    },
    {
      label: "Manager Information",
      route: "/getAllManager",
    },
    {
      label: "Employee Information",
      route: "/getAllEmp",
    },
    {
      label: "Client Information",
      route: "/getAllClient",
    },
    {
      label: "Employee",
      route: "/createEmp",
    },
    {
      label: "Client",
      route: "/createClient",
    },
    {
      label: "Add Project",
      route: "/createProject",
    },
  ];
  return (
    <>
      <Flex
        bg="navy"
        justify="space-between"
        align="center"
        px={5}
        py={5}
        color="white"
      >
        {isLoggedIn && <Button onClick={toggleDrawer}>menu</Button>}
        <Link to="/home">
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color="white"
            align="center"
            textAlign="center"
          >
            EMP DB SYSTEM
          </Text>
        </Link>
        <Box>
          {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
        </Box>
      </Flex>
      {isLoggedIn && (
        <Drawer placement="left" isOpen={isOpen} onClose={toggleDrawer}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4}>
                {boxData.map((data, index) => (
                  <Button
                    key={index}
                    as={Link}
                    to={data.route}
                    onClick={toggleDrawer}
                  >
                    {data.label}
                  </Button>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
