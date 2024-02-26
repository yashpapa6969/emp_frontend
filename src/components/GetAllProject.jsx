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
} from "@chakra-ui/react";
import axios from "axios";
import CreateClientB from "./CreateClientB";
import InfoModal from "./common/InfoModal";
import { GoPlus } from "react-icons/go";
import TableContainer from "./common/TableContainer";
import { Link } from "react-router-dom";
import InfoModalByID from "./common/InfoModalByID";

const GetAllProject = () => {
  const [clients, setClients] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);


  const CreateClientButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Link to="/CreateProject">
          <Button
            colorScheme="blue"
            onClick={onOpen}
            _hover={{ bg: "blue.600" }}
            mb="2"
            className="flex gap-2 items-center"
          >
            <GoPlus /> Add a Project
          </Button>
        </Link>
      </>
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllProjects"
        );
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (client) => {
    setSelectedClient(client);
    onOpen();
  };

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Project Information</h1>
        <CreateClientButton />
        <TableContainer
          searchText={searchText}
          setSearchText={setSearchText}
          setFilteredData={setFilteredClients}
          data={clients}
        >
          <Thead bg={"#F1F5F9"}>
            <Tr>
              <Th fontWeight="bold">S. No.</Th>
              <Th fontWeight="bold">Project Name</Th>
              <Th fontWeight="bold">Progress</Th>
              <Th fontWeight="bold">Billing Type</Th>
              <Th fontWeight="bold">Status</Th>
              <Th fontWeight="bold">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchText != ""
              ? filteredClients.map((client, index) => (
                  <Tr key={client._id}>
                    <Td>{index + 1}</Td>
                    <Td>{client.projectName}</Td>
                    <Td>{client.progress}</Td>
                    <Td>{client.billingType}</Td>
                    <Td>{client.status}</Td>
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
                    <Td>{client.projectName}</Td>
                    <Td>{client.progress}</Td>
                    <Td>{client.billingType}</Td>
                    <Td>{client.status}</Td>
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
        modalFor="project"
        data={selectedClient}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default GetAllProject;
