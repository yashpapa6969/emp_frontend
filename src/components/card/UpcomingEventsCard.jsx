import { useState, useEffect } from "react";
import { Box, Text, VStack, Button, Card,CardBody } from "@chakra-ui/react";
import axios from "axios";

const UpcomingEventsCard = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/specialDates`
        );
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId);
  };

  return (
    <Card maxW="md" borderWidth="1px" borderRadius="lg" p="4">
      <CardBody>
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Upcoming Events
        </Text>
        <VStack spacing="4">
          {clients.map((client) => (
            <Box
              key={client._id}
              onClick={() => handleClientSelect(client._id)}
              cursor="pointer"
              maxH="200px"
              overflowY="auto"
            >
              <Text
                fontSize="lg"
                fontWeight="bold"
                display="flex"
                justifyContent="space-between"
              >
                <span style={{ alignSelf: "flex-start" }}>
                  Client: {client.clientName}
                </span>
                <span style={{ alignSelf: "flex-end" }}>
                   Brand: {client.brandName}
                </span>
              </Text>

              {selectedClient === client._id && (
                <VStack align="start" spacing="2">
                  {client.upcomingEvents.map((event, index) => (
                    <Text key={index} fontSize="sm">
                      {event}
                    </Text>
                  ))}
                </VStack>
              )}
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default UpcomingEventsCard;
