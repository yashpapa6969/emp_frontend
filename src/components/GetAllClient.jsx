import { useState, useEffect } from "react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import InfoModal from "./common/InfoModal";
import { GoPlus } from "react-icons/go"; // Import GoTrashcan for delete icon
import TableContainer from "./common/TableContainer";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CreateClientButton = () => {
  return (
    <Link to="/CreateClient">
      <Button
        colorScheme="blue"
        _hover={{ bg: "blue.600" }}
        mb="2"
        className="flex gap-2 items-center"
      >
        <GoPlus /> Add a Client
      </Button>
    </Link>
  );
};

const GetAllClient = () => {
  const [clients, setClients] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/getAllClients`
        );
        setClients(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (client) => {
    setSelectedClient(client);
    onOpen();
  };

  const handleDeleteClient = async (clientId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE
        }/api/admin/deleteClientById/${clientId}`
      );
      toast.success("Successfully deleted Client");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllClients`
      );
      setClients(response.data);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
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
        <CreateClientButton />
        {clients.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No Clients Available</span>}
          />
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
              <Th fontWeight="bold" className="md:table-cell hidden">
                Brand Name
              </Th>
              <Th fontWeight="bold" className="md:table-cell hidden">
                Phone No.
              </Th>
              <Th fontWeight="bold" className="md:table-cell hidden">
                Enquiry Date
              </Th>
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
                    <Td className="md:table-cell hidden">
                      {client.enquiryDate}
                    </Td>
                    <Td>
                      <Button
                        size={"sm"}
                        colorScheme="purple"
                        onClick={() => handleMoreInfo(client)}
                      >
                        More Info
                      </Button>
                      <Button
                        size={"sm"}
                        colorScheme="red"
                        ml={2}
                        onClick={() => handleDeleteClient(client.client_id)}
                      >
                        Delete
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
                    <Td className="md:table-cell hidden">
                      {client.enquiryDate}
                    </Td>
                    <Td>
                      <Button
                        size={"sm"}
                        colorScheme="purple"
                        onClick={() => handleMoreInfo(client)}
                      >
                        More Info
                      </Button>
                      <Button
                        size={"sm"}
                        colorScheme="red"
                        ml={2}
                        onClick={() => handleDeleteClient(client.client_id)}
                      >
                        Delete
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
