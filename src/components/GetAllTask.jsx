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
  Spinner, // Import Spinner component from Chakra UI
} from "@chakra-ui/react";
import axios from "axios";
import InfoModal from "./common/InfoModal";
import { GoPlus } from "react-icons/go";
import TableContainer from "./common/TableContainer";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { toast } from "react-toastify";
import { DeleteIcon } from "@chakra-ui/icons";
import { IoFlag } from "react-icons/io5";


const GetAllTask = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading
  
  const priorityArray = ["low", "medium", "high", "urgent"];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/getAllTasks`
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
  };

  const handleStatusChange = async (leadId, statusNo) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/updateTaskStatus/${leadId}/${statusNo}`
      );
      // Fetch data again after updating status
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllTasks`
      );
      setClients(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }

  const handleDeleteTask = async (projectId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE
        }/api/admin/deleteTaskById/${projectId}`
      );
      toast.success("Successfully deleted Task");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllTasks`
      );
      setClients(response.data);
    } catch (error) {
      console.error("Error deleting project:", error);
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

        {clients.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No Tasks Assigned</span>}
          />
        )}

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
              <Th fontWeight="bold" className="md:table-cell hidden">
                Priority
              </Th>
              <Th fontWeight="bold" className="md:table-cell hidden">
                Status
              </Th>
              <Th fontWeight="bold" className="md:table-cell hidden">
                Update Status
              </Th>
              <Th fontWeight="bold">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchText != ""
              ? filteredClients.map((client, index) => (
                <Tr key={client._id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <div>
                      {client.brandName}
                      {priorityArray.includes(client.priority.toLowerCase()) &&
                        <IoFlag
                          size={18}
                          className={`${client.priority.toLowerCase() === "urgent" && "text-red-400"
                            } ${client.priority.toLowerCase() === "high" &&
                            "text-orange-300"
                            } ${client.priority.toLowerCase() === "medium" &&
                            "text-blue-300"
                            } ${client.priority.toLowerCase() === "low" && "text-gray-300"
                            }`} />
                      }
                    </div>
                  </Td>
                  <Td className="md:table-cell hidden">{priorityArray[client.priority] || client.priority}</Td>
                  <Td className="md:table-cell hidden">{client.status}</Td>
                  <Td className="md:table-cell hidden">
                    {client.status === 0 && "Not Started"}
                    {client.status === 1 && "Working"}
                    {client.status === 2 && "Awaited Feedback"}
                    {client.status === 3 && "Completed"}
                    <Menu>
                      <MenuButton
                        size={"sm"}
                        as={Button}
                        colorScheme="purple"
                      >
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
                      size={"sm"}
                      colorScheme="purple"
                      onClick={() => handleMoreInfo(client)}
                    >
                      More Info
                    </Button>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      colorScheme="red"
                      ml={2}
                      onClick={() => handleDeleteTask(client.task_id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Td>
                </Tr>
              ))
              : clients.map((client, index) => (
                <Tr
                  key={client._id}
                >
                  <Td>{index + 1}</Td>
                  <Td>
                    <div className="flex gap-2 items-center">
                      {client.brandName}
                      {priorityArray.includes(client.priority.toLowerCase()) &&
                        <IoFlag
                          size={18}
                          className={`${client.priority.toLowerCase() === "urgent" && "text-red-400"
                            } ${client.priority.toLowerCase() === "high" &&
                            "text-orange-300"
                            } ${client.priority.toLowerCase() === "medium" &&
                            "text-blue-300"
                            } ${client.priority.toLowerCase() === "low" && "text-gray-300"
                            }`} />
                      }
                    </div>
                  </Td>
                  <Td className="md:table-cell hidden capitalize">{priorityArray[client.priority] || client.priority}</Td>
                  <Td className="md:table-cell hidden">
                    <div className="flex gap-2 items-center">
                      {client.status === "Not Started" ? <div className="h-3 w-3 rounded-full bg-red-600" /> :
                        (client.status === "Working" ? <div className="h-3 w-3 rounded-full bg-yellow-400" /> :
                          (client.status === "Awaited Feedback" ? <div className="h-3 w-3 rounded-full bg-blue-600" /> :
                            <div className="h-3 w-3 rounded-full bg-green-600" />))
                      } {client.status}
                    </div>
                  </Td>
                  <Td className="md:table-cell hidden">
                    {client.status === 0 && "Not Started"}
                    {client.status === 1 && "Working"}
                    {client.status === 2 && "Awaited Feedback"}
                    {client.status === 3 && "Completed"}
                    <Menu>
                      <MenuButton
                        size={"sm"}
                        as={Button}
                        colorScheme="purple"
                      >
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
                      size={"sm"}
                      colorScheme="purple"
                      onClick={() => handleMoreInfo(client)}
                    >
                      More Info
                    </Button>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      colorScheme="red"
                      ml={2}
                      onClick={() => handleDeleteTask(client.task_id)}
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
        modalFor="task"
        data={selectedClient}
        onClose={() => setSelectedClient(null)}
        isOpen={selectedClient !== null}
      />
    </>
  );
};

export default GetAllTask;
