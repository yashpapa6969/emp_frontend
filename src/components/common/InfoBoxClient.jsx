import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectClientId,clearClientId } from "../../store/slice/ClientSlice";

const InfoBoxClient = () => {
  const clientId = useSelector(selectClientId);
  const [clientDetails, setClientDetails] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClientDetails = async () => {
      if (clientId) {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_BASE
            }/api/admin/getClientDetails/${clientId}`
          );
          const data = await response.json();
          setClientDetails(data);
          dispatch(clearClientId());
        } catch (error) {
          console.error("Error fetching client details:", error);
        }
      }
    };

    fetchClientDetails();
  }, [clientId]);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      {clientDetails ? (
        <>
          {Object.entries(clientDetails).map(([key, value]) => (
            <Box key={key} mb="2">
              <Text fontWeight="bold">{key}:</Text>
              <Text>{value}</Text>
            </Box>
          ))}
        </>
      ) : (
        <Text>No client details available</Text>
      )}
    </Box>
  );
};

export default InfoBoxClient;
