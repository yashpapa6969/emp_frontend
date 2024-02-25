import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import InfoModal from "./common/InfoModal";

const GetAllManagers = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getManagersAllDetails"
        );
        setManagers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (manager) => {
    setSelectedManager(manager);
    onOpen();
  };

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-10">Manager Information</h1>
        <Table width="100%">
          <Thead bg={"#F1F5F9"}>
            <Tr>
              <Th fontWeight="bold">Id</Th>
              <Th fontWeight="bold">Name</Th>
              <Th fontWeight="bold">Position</Th>
              <Th fontWeight="bold">Department</Th>
              <Th fontWeight="bold">Joining Date</Th>
              <Th fontWeight="bold">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {managers.map((manager) => (
              <Tr key={manager._id}>
                <Td>{manager.manager_id}</Td>
                <Td>{manager.name}</Td>
                <Td>{manager.position}</Td>
                <Td>{manager.department}</Td>
                <Td>{manager.joiningDate}</Td>
                <Td>
                  <Button
                    colorScheme="purple"
                    onClick={() => handleMoreInfo(manager)}
                  >
                    More Info
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <InfoModal modalFor="manager" data={selectedManager} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default GetAllManagers;
