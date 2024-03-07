import { useState, useEffect } from "react";
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
  useColorModeValue,
} from "@chakra-ui/react";
import { Tag } from "antd";

const InfoBoxByID = ({ modalFor }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
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
        setData(fetchedData[0]);
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

  console.log(data)


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
        <VStack align="start" spacing={2} mx={4} mt={6}>
          {data ? (
            <div className="grid grid-cols-2 gap-3">
              {data.clientName && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Client Name:</Text>
                <Text>{data.clientName}</Text>
              </>)}
              {data.companyName && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Company Name:</Text>
                <Text>{data.companyName}</Text>
              </>)}
              {data.enquiryDate && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Enquiry Date:</Text>
                <Text>{data.enquiryDate}</Text>
              </>)}
              {data.brandName && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Brand Name:</Text>
                <Text>{data.brandName}</Text>
              </>)}
              {data.requirement && data.requirement.length > 0 && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Requirement:</Text>
                <div className="flex gap-2">{data.requirement.map((el, index) => <Tag key={`req-${index}`} color="magenta">{el}</Tag>)}</div>
              </>)}
              {data.source && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Source:</Text>
                <div className="flex gap-2">{data.source.map((el, index) => <Tag key={`req-${index}`} color="geekblue">{el}</Tag>)}</div>
              </>)}
              {data.businessAddress && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Business Address:</Text>
                <Text>{data.businessAddress}</Text>
              </>)}
              {data.city && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">City:</Text>
                <Text>{data.city}</Text>
              </>)}
              {data.state && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">State:</Text>
                <Text>{data.state}</Text>
              </>)}
              {data.country && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Country:</Text>
                <Text>{data.country}</Text>
              </>)}
              {data.pincode && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Pin Code:</Text>
                <Text>{data.pincode}</Text>
              </>)}
              {(data.email1 || data.email2) && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Emails:</Text>
                <Text>{data.email1} {data.email2 && `(AND) ${data.email2}`}</Text>
              </>)}
              {(data.phone1 || data.phone2) && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Phones:</Text>
                <Text>{data.phone1} {data.phone2 && `(AND) ${data.phone2}`}</Text>
              </>)}
              {data.website && (<>
                <Text fontWeight={"bold"} className="min-w-[150px]">Website:</Text>
                <Text>{data.website}</Text>
              </>)}
            </div>
          ) : (
            <Text>No data available</Text>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default InfoBoxByID;
