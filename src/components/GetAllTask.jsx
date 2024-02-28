import { useState, useEffect } from "react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import axios from "axios";
import InfoModal from "./common/InfoModal";
import { GoPlus } from "react-icons/go";
import TableContainer from "./common/TableContainer";
import { Link } from "react-router-dom";

const GetAllTask = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllTasks"
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
  };

  const handleStatusChange = async (leadId, statusNo) => {
    try {
      await axios.get(
        `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/updateTaskStatus/${leadId}/${statusNo}`
      );
      // Fetch data again after updating status
      const response = await axios.get(
        "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllTasks"
      );
      setClients(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Task Information</h1>
        <Link to="/CreateTask">
          <Button
            colorScheme="blue"
            _hover={{ bg: "blue.600" }}
            mb="2"
            className="flex gap-2 items-center"
          >
            <GoPlus /> Add a Task
          </Button>
        </Link>
        <TableContainer
          formFor="brand"
          searchText={searchText}
          setSearchText={setSearchText}
          setFilteredData={setFilteredClients}
          data={clients}
        >
          <Thead bg={"#F1F5F9"}>
            <Tr>
              <Th fontWeight="bold">S. No.</Th>
              <Th fontWeight="bold">Brand Name</Th>
              <Th fontWeight="bold">Priority</Th>
              <Th fontWeight="bold">Status</Th>
              <Th fontWeight="bold">Update Status</Th>
              <Th fontWeight="bold">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchText !== ""
              ? filteredClients.map((client, index) => (
                  <Tr
                    key={client._id}
                    className={`${
                      client.priority.toLowerCase() === "urgent" && "bg-red-400"
                    } ${
                      client.priority.toLowerCase() === "high" &&
                      "bg-orange-300"
                    } ${
                      client.priority.toLowerCase() === "medium" &&
                      "bg-blue-300"
                    } ${
                      client.priority.toLowerCase() === "low" && "bg-gray-300"
                    }`}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{client.brandName}</Td>
                    <Td>{client.priority}</Td>
                    <Td>{client.status}</Td>
                    <Td>
                      {client.status === 0 && "Raw"}
                      {client.status === 1 && "In-Progress"}
                      {client.status === 2 && "Converted"}
                      {client.status === 3 && "Lost"}
                      <Menu>
                        <MenuButton as={Button} colorScheme="purple">
                          Change Status
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() =>
                              handleStatusChange(client.task_id, 0)
                            }
                          >
                            Not Started
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleStatusChange(client.task_id, 1)
                            }
                          >
                            Working
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleStatusChange(client.task_id, 2)
                            }
                          >
                            Awaited Feedback
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleStatusChange(client.task_id, 3)
                            }
                          >
                            Completed
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
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
                  <Tr
                    key={client._id}
                    className={`${
                      client.priority.toLowerCase() === "urgent" && "bg-red-400"
                    } ${
                      client.priority.toLowerCase() === "high" &&
                      "bg-orange-300"
                    } ${
                      client.priority.toLowerCase() === "medium" &&
                      "bg-blue-300"
                    } ${
                      client.priority.toLowerCase() === "low" && "bg-gray-300"
                    }`}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{client.brandName}</Td>
                    <Td>{client.priority}</Td>
                    <Td>{client.status}</Td>
                    <Td>
                      {client.status === 0 && "Not Started"}
                      {client.status === 1 && "In-Progress"}
                      {client.status === 2 && "Awaited Feedback"}
                      {client.status === 3 && "Completed"}
                      <Menu>
                        <MenuButton as={Button} colorScheme="purple">
                          Change Status
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() =>
                              handleStatusChange(client.task_id, 0)
                            }
                          >
                            Not Started
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleStatusChange(client.task_id, 1)
                            }
                          >
                            In-Progress
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleStatusChange(client.task_id, 2)
                            }
                          >
                            Awaited Feedback
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              handleStatusChange(client.task_id, 3)
                            }
                          >
                            Completed
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
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
        modalFor="task"
        data={selectedClient}
        onClose={() => setSelectedClient(null)}
        isOpen={selectedClient !== null}
      />
    </>
  );
};

export default GetAllTask;
