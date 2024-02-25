import { useEffect, useState } from "react";
import { Box, Text, useToast, Center } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slice/UserSlice";

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
  });

  return (
    <>
      <Center mt="4">
        <Box
          borderWidth="2px"
          borderRadius="lg"
          p="4"
          width="400px"
          boxShadow="md"
          mt="5"
        >
          <Text fontWeight="bold" mb="4" fontSize="2xl" textAlign="center">
            User Profile
          </Text>
          {userData ? (
            <>
              <Text fontWeight="bold" color="black">
                Name:
              </Text>
              <Text color="black.50">{userData.name}</Text>
              <Text fontWeight="bold" color="black">
                Email:
              </Text>
              <Text color="black.50">{userData.email}</Text>
              <Text fontWeight="bold" color="black">
                Position:
              </Text>
              <Text color="black.50">{userData.position}</Text>
              <Text fontWeight="bold" color="black">
                Department:
              </Text>
              <Text color="black.50">{userData.department}</Text>
              <Text fontWeight="bold" color="black">
                Manager ID:
              </Text>
              <Text color="black.50">{userData.manager_id}</Text>
              <Text fontWeight="bold" color="black">
                Join Date:
              </Text>
              <Text color="black.50">{userData.joiningDate}</Text>
              <Text fontWeight="bold" color="black">
                Employee ID:
              </Text>
              <Text color="black.50">{userData.employee_id}</Text>

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
