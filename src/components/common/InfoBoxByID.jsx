import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  selectEmployeeIds,
  clearEmployeeIds,
} from "../../store/slice/EmployeeSlice";
import { selectClientIds, clearClientIds } from "../../store/slice/ClientSlice";
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
  const clientIds = useSelector(selectClientIds);
  const dispatch = useDispatch();
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let promises = [];
        let fetchedData = [];
        if (modalFor === "employee" && employeeIds.length > 0) {
          promises = employeeIds.map((id) =>
            axios.get(
              `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getEmployeeByID/${id}`
            )
          );
        } else if (modalFor === "client") {
          if (Array.isArray(clientIds)) {
            promises = clientIds.map((id) =>
              axios.get(
                `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getClientDetails/${id}`
              )
            );
          } else {
            promises.push(
              axios.get(
                `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getClientDetails/${clientIds}`
              )
            );
          }
        }
        if (promises.length > 0) {
          const responses = await Promise.all(promises);
          fetchedData = responses.map((res) => res.data);
        }
        setData(fetchedData);
        setLoading(false);
        // Clear employeeIds and clientIds after fetching data
        if (modalFor === "employee") {
          dispatch(clearEmployeeIds());
        } else if (modalFor === "client") {
          dispatch(clearClientIds());
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (
      (modalFor === "employee" && employeeIds.length > 0) ||
      modalFor === "client"
    ) {
      fetchData();
    }
  }, []);

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
          {data.map((item, index) => (
            <Box key={index}>
              {Object.entries(item).map(([key, value]) => (
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
