import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  selectEmployeeId,
  clearEmployeeId,
} from "../store/slice/EmployeeSlice";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const GetEmpSlip = ({ modalFor }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const employeeId = useSelector(selectEmployeeId);
  const dispatch = useDispatch();
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllSlipsByEmployee/${employeeId}`
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchData();
    }

    return () => {
      dispatch(clearEmployeeId());
    };
  }, [employeeId, dispatch]);

  return (
    <Box>
      <Heading size="lg" mb={4}>
      Employee Salary Slip History
      </Heading>
      {loading && <Spinner />}
      {error && <Text>Error: {error.message}</Text>}
      {data && (
        <VStack>
          {Object.entries(data).map(([key, value]) => (
            <Box
              key={key}
              border="1px"
              borderColor={borderColor}
              p={4}
              borderRadius="md"
            >
              <Text fontWeight="bold">{key}</Text>
              <Text>{value}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default GetEmpSlip;
