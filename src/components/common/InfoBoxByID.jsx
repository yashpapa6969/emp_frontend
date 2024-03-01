import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  selectEmployeeIds,
  clearEmployeeIds,
  selectEmployeeId,
  clearEmployeeId,
} from "../../store/slice/EmployeeSlice";
import { selectClientId, clearClientId } from "../../store/slice/ClientSlice";
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
  const clientId = useSelector(selectClientId);
  const employeeId = useSelector(selectEmployeeId);
  const dispatch = useDispatch();
  const borderColor = useColorModeValue("gray.200", "gray.700");
 

 useEffect(() => {
   const fetchData = async () => {
     setLoading(true);
     setError(null);
     try {
       let fetchedData = [];
       if (modalFor === "employee" && employeeId) {
         const employeeResponse = await axios.get(
           `${import.meta.env.VITE_API_BASE}/api/admin/getEmployeeByID/${employeeId}`
         );
         fetchedData.push(employeeResponse.data);
       } else if (modalFor === "employee" && employeeIds.length > 0) {
         const promises = employeeIds.map((id) =>
           axios.get(
             `${import.meta.env.VITE_API_BASE}/api/admin/getEmployeeByID/${id}`
           )
         );
         const responses = await Promise.all(promises);
         fetchedData = responses.map((res) => res.data);
       } else if (modalFor === "client" && clientId) {
         const response = await axios.get(
           `${import.meta.env.VITE_API_BASE}/api/admin/getClientDetails/${clientId}`
         );
         fetchedData.push(response.data);
       }
       setData(fetchedData);
       setLoading(false);
       if (modalFor === "employee") {
         dispatch(clearEmployeeIds());
         dispatch(clearEmployeeId());      
          dispatch(clearClientId()); 
       } else if (modalFor === "client") {
         dispatch(clearClientId());
         
       }
     } catch (error) {
       setError(error.response.data.message);
       setLoading(false);
     }
   };

   if (
     (modalFor === "employee" && employeeIds.length > 0) ||
     (modalFor === "client" && clientId) ||
     (modalFor === "employee" && employeeId)
   ) {
     fetchData();
   }
 }, []);


  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} borderColor={borderColor}>
      <Heading size="lg" mb={4}>
        {modalFor === "employee"
          ? "Employee Information"
          : "Client Information"}
      </Heading>
      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}
      {!loading && !error && (
        <VStack align="start" spacing={2}>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <Box key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    <Text fontWeight="bold">{key}:</Text>
                    {value && typeof value === "object" ? (
                      // If the value is an object, iterate over its properties
                      Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey}>
                          <Text>
                            {subKey}: {subValue}
                          </Text>
                        </div>
                      ))
                    ) : (
                      // If the value is not an object, simply render it
                      <Text>{value}</Text>
                    )}
                  </div>
                ))}
                <Divider mt={2} />
              </Box>
            ))
          ) : (
            <Text>No data available</Text>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default InfoBoxByID;
