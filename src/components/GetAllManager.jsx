import { useState, useEffect } from "react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Spinner, // Import Spinner component from Chakra UI
} from "@chakra-ui/react";
import axios from "axios";
import InfoModal from "./common/InfoModal";
import TableContainer from "./common/TableContainer";
import { Empty } from "antd";
import { toast } from "react-toastify";
import { DeleteIcon } from "@chakra-ui/icons";
const GetAllManagers = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/getManagersAllDetails`
        );
        setManagers(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of error too
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (manager) => {
    setSelectedManager(manager);
    onOpen();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }
   const handleDeleteManager = async (projectId) => {
     try {
       await axios.delete(
         `${
           import.meta.env.VITE_API_BASE
         }/api/admin/deleteManagerById/${projectId}`
       );
       toast.success("Successfully deleted Manager");
       const response = await axios.get(
         `${import.meta.env.VITE_API_BASE}/api/admin/getAllManagers`
       );
       setManagers(response.data);
     } catch (error) {
       console.error("Error deleting project:", error);
     }
   };

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-10">Manager Information</h1>

        {managers.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No Managers Assigned</span>}
          />
        )}

        {managers.length > 0 && (
          <TableContainer
            searchText={searchText}
            setSearchText={setSearchText}
            setFilteredData={setFilteredManagers}
            data={managers}
          >
            <Thead position="sticky" top={0} zIndex={50} bg={"#F1F5F9"}>
              <Tr>
                <Th fontWeight="bold">Id</Th>
                <Th fontWeight="bold">Name</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Position
                </Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Department
                </Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Joining Date
                </Th>
                <Th fontWeight="bold">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchText !== ""
                ? filteredManagers.map((manager) => (
                    <Tr key={manager._id}>
                      <Td>{manager.manager_id}</Td>
                      <Td>{manager.name}</Td>
                      <Td className="md:table-cell hidden">
                        {manager.position}
                      </Td>
                      <Td className="md:table-cell hidden">
                        {manager.department}
                      </Td>
                      <Td className="md:table-cell hidden">
                        {manager.joiningDate}
                      </Td>
                      <Td>
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(manager)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          colorScheme="red"
                          variant={"outline"}
                          ml={2}
                          onClick={() =>
                            handleDeleteManager(manager.manager_id)
                          }
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : managers.map((manager) => (
                    <Tr key={manager._id}>
                      <Td>{manager.manager_id}</Td>
                      <Td>{manager.name}</Td>
                      <Td className="md:table-cell hidden">
                        {manager.position}
                      </Td>
                      <Td className="md:table-cell hidden">
                        {manager.department}
                      </Td>
                      <Td className="md:table-cell hidden">
                        {manager.joiningDate}
                      </Td>
                      <Td>
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(manager)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          colorScheme="red"
                          variant={"outline"}
                          ml={2}
                          onClick={() =>
                            handleDeleteManager(manager.manager_id)
                          }
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </TableContainer>
        )}
      </div>

      <InfoModal
        modalFor="manager"
        data={selectedManager}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default GetAllManagers;
