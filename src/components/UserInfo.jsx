import { useEffect, useState } from "react";
import { Box, Text, useToast, Center } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slice/UserSlice";
import Navbar from "./Navbar";

const UserInfo = () => {
  const user = useSelector(selectUser);
  const toast = useToast();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getEmployeeByID/${user.employee_id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch user data. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      <Center mt="4">
        <Box
          borderWidth="2px"
          borderRadius="lg"
          p="4"
          width="400px"
          boxShadow="md"
          textAlign="left"
          bgGradient="linear(to-r, red.500,blue.500)"
          color="white"
        >
          <Text fontWeight="bold" mb="4" fontSize="2xl" textAlign="center">
            User Profile
          </Text>
          {userData ? (
            <>
              <Text fontWeight="bold" color="white">
                Name:
              </Text>
              <Text color="cyan.50">{userData.name}</Text>
              <Text fontWeight="bold" color="white">
                Email:
              </Text>
              <Text color="cyan.50">{userData.email}</Text>
              <Text fontWeight="bold" color="white">
                Position:
              </Text>
              <Text color="cyan.50">{userData.position}</Text>
              <Text fontWeight="bold" color="white">
                Department:
              </Text>
              <Text color="cyan.50">{userData.department}</Text>
              <Text fontWeight="bold" color="white">
                Manager ID:
              </Text>
              <Text color="cyan.50">{userData.manager_id}</Text>
              <Text fontWeight="bold" color="white">
                Join Date:
              </Text>
              <Text color="cyan.50">{userData.joiningDate}</Text>
              <Text fontWeight="bold" color="white">
                Employee ID:
              </Text>
              <Text color="cyan.50">{userData.employee_id}</Text>

              {/* Iterate through permissions array and display */}
              <Text fontWeight="bold" color="white.200">
                Permissions:
              </Text>
              <ul>
                {userData.permissions.map((permission, index) => (
                  <li key={index} color="cyan.50">
                    {permission}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Text>Loading user data...</Text>
          )}
        </Box>
      </Center>
    </>
  );
};

export default UserInfo;
