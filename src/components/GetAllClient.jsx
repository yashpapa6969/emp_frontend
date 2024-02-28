import { useState, useEffect } from "react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Spinner, // Import Spinner component from Chakra UI
} from "@chakra-ui/react";
import axios from "axios";
import CreateClientB from "./CreateClientB";
import InfoModal from "./common/InfoModal";
import { GoPlus } from "react-icons/go";
import TableContainer from "./common/TableContainer";
import { Empty } from "antd";

const CreateClientButton = ({ onOpen }) => {
  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        _hover={{ bg: "blue.600" }}
        mb="2"
        className="flex gap-2 items-center"
      >
        <GoPlus /> Add a client
      </Button>
    </>
  );
};

const GetAllClient = () => {
  const [clients, setClients] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllClients"
        );
        setClients(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of error too
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (client) => {
    setSelectedClient(client);
    onOpen();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Client Information</h1>
        <CreateClientButton onOpen={onOpen} />

        {clients.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
            <span>
              No Clients Available
            </span>
          } />
        )}

        <TableContainer
          formFor="client"
          searchText={searchText}
          setSearchText={setSearchText}
          setFilteredData={setFilteredClients}
          data={clients}
        >
          <Thead bg={"#F1F5F9"}>
            <Tr>
              <Th fontWeight="bold">S. No.</Th>
              <Th fontWeight="bold">Client Name</Th>
              <Th fontWeight="bold" className="md:table-cell hidden">Brand Name</Th>
              <Th fontWeight="bold" className="md:table-cell hidden">Phone No.</Th>
              <Th fontWeight="bold" className="md:table-cell hidden">Enqury Date</Th>
              <Th fontWeight="bold">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchText !== ""
              ? filteredClients.map((client, index) => (
                  <Tr key={client._id}>
                    <Td>{index + 1}</Td>
                    <Td>{client.clientName}</Td>
                    <Td className="md:table-cell hidden">{client.brandName}</Td>
                    <Td className="md:table-cell hidden">{client.phone1}</Td>
                    <Td className="md:table-cell hidden">{client.enquiryDate}</Td>
                    <Td>
                      <Button
                        colorScheme="purple"
                        onClick={() => handleMoreInfo(client)}
                      >
                        More Info
                      </Button>
                    </Td>
                  </Tr>
                ))
              : clients.map((client, index) => (
                  <Tr key={client._id}>
                    <Td>{index + 1}</Td>
                    <Td>{client.clientName}</Td>
                    <Td className="md:table-cell hidden">{client.brandName}</Td>
                    <Td className="md:table-cell hidden">{client.phone1}</Td>
                    <Td className="md:table-cell hidden">{client.enquiryDate}</Td>
                    <Td>
                      <Button
                        colorScheme="purple"
                        onClick={() => handleMoreInfo(client)}
                      >
                        More Info
                      </Button>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </TableContainer>
      </div>

      <InfoModal
        modalFor="client"
        data={selectedClient}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default GetAllClient;
