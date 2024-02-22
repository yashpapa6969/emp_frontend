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
        >
          <Text fontWeight="bold" mb="4" fontSize="xl">
            User Profile
          </Text>
          {userData ? (
            <>
              <Text fontWeight="bold">Name:</Text>
              <Text>{userData.name}</Text>
              <Text fontWeight="bold">Email:</Text>
              <Text>{userData.email}</Text>
              <Text fontWeight="bold">Position:</Text>
              <Text>{userData.position}</Text>
              <Text fontWeight="bold">Department:</Text>
              <Text>{userData.department}</Text>
              <Text fontWeight="bold">Manager ID:</Text>
              <Text>{userData.manager_id}</Text>
              <Text fontWeight="bold">Join Date:</Text>
              <Text>{userData.joiningDate}</Text>
              <Text fontWeight="bold">Employee ID:</Text>
              <Text>{userData.employee_id}</Text>

              {/* Iterate through permissions array and display */}
              <Text fontWeight="bold">Permissions:</Text>
              <ul>
                {userData.permissions.map((permission, index) => (
                  <li key={index}>{permission}</li>
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
