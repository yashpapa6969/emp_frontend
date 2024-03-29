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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import InfoModal from "./common/InfoModal";
import { GoPlus } from "react-icons/go";
import TableContainer from "./common/TableContainer";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DeleteIcon } from "@chakra-ui/icons";
import { setClientId } from "../store/slice/ClientSlice";
import { useDispatch } from "react-redux";
import { IoMdEye } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";

const GetAllClient = () => {
  const [clients, setClients] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteClientId, setDeleteClientId] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const dispatch = useDispatch();

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
        `${import.meta.env.VITE_API_BASE
        }/api/admin/deleteClientById/${clientId}`
      );
      toast.success("Successfully deleted Client");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllClients`
      );
      setClients(response.data);
      setIsDeleteAlertOpen(false);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleDeleteConfirmation = (clientId) => {
    setDeleteClientId(clientId);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteAlertOpen(false);
  };

  const handleUpdateClient = (clientId) => {
    dispatch(setClientId(clientId));
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
      <div className="w-full p-8 md:block flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Client Information</h1>
        <Link to="/CreateClient">
          <Button
            colorScheme="blue"
            _hover={{ bg: "blue.600" }}
            mb="6"
            className="flex gap-2 items-center"
          >
            <GoPlus /> Add a Client
          </Button>
        </Link>
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
          <Thead position="sticky" top={0} bg={"#F1F5F9"} zIndex={10}>
            <Tr>
              <Th fontWeight="bold" className="md:table-cell hidden">S. No.</Th>
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
              <Th fontWeight="bold"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchText !== ""
              ? filteredClients.map((client, index) => (
                <Tr key={client._id}>
                  <Td className="md:table-cell hidden">{index + 1}</Td>
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
                      <IoMdEye />
                    </Button>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      colorScheme="red"
                      ml={2}
                      onClick={() =>
                        handleDeleteConfirmation(client.client_id)
                      }
                    >
                      <DeleteIcon />
                    </Button>
                    <Link to="/UpdateClient">
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        colorScheme="blue"
                        ml={2}
                        p={0}
                        onClick={() => handleUpdateClient(client.client_id)}
                      >
                      <MdModeEditOutline size={18} />
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))
              : clients.map((client, index) => (
                <Tr key={client._id}>
                  <Td className="md:table-cell hidden">{index + 1}</Td>
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
                      <IoMdEye />
                    </Button>

                    <Link to="/UpdateClient">
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        colorScheme="blue"
                        ml={2}
                        p={0}
                        onClick={() => handleUpdateClient(client.client_id)}
                      >
                        <MdModeEditOutline size={18} />
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      colorScheme="red"
                      ml={50}
                      onClick={() =>
                        handleDeleteConfirmation(client.client_id)
                      }
                    >
                      <DeleteIcon />
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

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={undefined}
        onClose={handleDeleteCancel}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Client
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete this client?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleDeleteCancel}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteClient(deleteClientId)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default GetAllClient;
