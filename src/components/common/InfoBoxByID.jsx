import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const InfoBoxByID = ({ modalFor }) => {
  const [data, setData] = useState(null);
  const { employee } = useParams();
  const { client } = useParams();
  console.log(client);
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    async function fetchData() {
      try {
        let response;
        if (modalFor === "employee") {
          response = await axios.get(
            `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getEmployeeByID/${employee}`
          );
        } else if (modalFor === "client") {
          response = await axios.get(
            `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getClientDetails/${client}`
          );
        }
        setData(response.data);
        
      } catch (error) {
        alert(error.response.data.message);
       
      }
    }
    fetchData();
  }, [modalFor, employee]);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <Heading size="md" mb={4}>
        {modalFor === "employee"
          ? "Employee Information"
          : "Client Information"}
      </Heading>
      {!data ? (
        <Spinner />
      ) : (
        <VStack align="start" spacing={2}>
          {Object.entries(data).map(([key, value]) => (
            <Box key={key}>
              <Text fontWeight="bold">{key}:</Text>
              <Text>{value}</Text>
              <Divider mt={2} />
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default InfoBoxByID;
