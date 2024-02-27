import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { selectEmployeeIds,clearEmployeeIds } from "../../store/slice/EmployeeSlice";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const employeeIds = useSelector(selectEmployeeIds);
  
  const dispatch = useDispatch();
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const promises = employeeIds.map((id) =>
          axios.get(
            `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getEmployeeByID/${id}`
          )
        );
        const responses = await Promise.all(promises);
        const employeeData = responses.map((res) => res.data);
        setData(employeeData);
         dispatch(clearEmployeeIds());
        setLoading(false);      
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (employeeIds.length > 0) {
      fetchData();
    }
  }, [employeeIds]);

 

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <Heading size="md" mb={4}>
        {modalFor === "employee"
          ? "Employee Information"
          : "Client Information"}
      </Heading>
      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}
      {!loading && !error && (
        <VStack align="start" spacing={2}>
          {data.map((employee, index) => (
            <Box key={index}>
              {Object.entries(employee).map(([key, value]) => (
                <div key={key}>
                  <Text fontWeight="bold">{key}:</Text>
                  <Text>{value}</Text>
                </div>
              ))}
              <Divider mt={2} />
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default InfoBoxByID;
