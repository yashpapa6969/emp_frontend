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
  console.log(employeeIds);
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
          dispatch(clearEmployeeIds());
          dispatch(clearEmployeeId());  
         
       }
     } catch (error) {
       setError(error.response.data.message);
       setLoading(false);
        dispatch(clearEmployeeIds());
        dispatch(clearEmployeeId());  
        dispatch(clearClientId()); 
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
            <div key={`item-${index}`} className="grid grid-cols-2 gap-3 w-full">
              {item.clientName && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Client Name:</Text>
                <Text>{item.clientName}</Text>
              </>)}
              {item.companyName && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Company Name:</Text>
                <Text>{item.companyName}</Text>
              </>)}
              {item.enquiryDate && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Enquiry Date:</Text>
                <Text>{item.enquiryDate}</Text>
              </>)}
              {item.brandName && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Brand Name:</Text>
                <Text>{item.brandName}</Text>
              </>)}
              {item.requirement && item.requirement.length > 0 && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Requirement:</Text>
                <div className="flex gap-2">{item.requirement.map((el, index) => <Tag key={`req-${index}`} color="magenta">{el}</Tag>)}</div>
              </>)}
              {item.source && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Source:</Text>
                <div className="flex gap-2">{item.source.map((el, index) => <Tag key={`req-${index}`} color="geekblue">{el}</Tag>)}</div>
              </>)}
              {item.businessAddress && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Business Address:</Text>
                <Text>{item.businessAddress}</Text>
              </>)}
              {item.city && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">City:</Text>
                <Text>{item.city}</Text>
              </>)}
              {item.state && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">State:</Text>
                <Text>{item.state}</Text>
              </>)}
              {item.country && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Country:</Text>
                <Text>{item.country}</Text>
              </>)}
              {item.pincode && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Pin Code:</Text>
                <Text>{item.pincode}</Text>
              </>)}
              {(item.email1 || item.email2) && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Emails:</Text>
                <Text>{item.email1} {item.email2 && `(AND) ${item.email2}`}</Text>
              </>)}
              {(item.phone1 || item.phone2) && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Phones:</Text>
                <Text>{item.phone1} {item.phone2 && `(AND) ${item.phone2}`}</Text>
              </>)}
              {item.website && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Website:</Text>
                <Text>{item.website}</Text>
              </>)}
            </div>
            ))) :
            <Text>No data available</Text>
          }
        </VStack>
      )}
    </Box>
  );
};

export default InfoBoxByID;