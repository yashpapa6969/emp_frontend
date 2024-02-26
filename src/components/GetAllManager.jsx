import { useState, useEffect } from "react";
import {
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
import TableContainer from "./common/TableContainer";

const GetAllManagers = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchText, setSearchText] = useState('');

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

        <TableContainer searchText={searchText} setSearchText={setSearchText} setFilteredData={setFilteredManagers} data={managers}>
          <Thead bg={"#F1F5F9"}>
            <Tr>
              {/* <Th width={"5%"}><Checkbox defaultIsChecked /></Th> */}
              <Th fontWeight="bold">Id</Th>
              <Th fontWeight="bold">Name</Th>
              <Th fontWeight="bold">Position</Th>
              <Th fontWeight="bold">Department</Th>
              <Th fontWeight="bold">Joining Date</Th>
              <Th fontWeight="bold">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchText != "" ?
              filteredManagers.map((manager) => (
                <Tr key={manager._id}>
                  {/* <Td><Checkbox defaultIsChecked /></Td> */}
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
              )) :
              managers.map((manager) => (
                <Tr key={manager._id}>
                  {/* <Td><Checkbox defaultIsChecked /></Td> */}
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
        </TableContainer>
      </div>

      <InfoModal modalFor="manager" data={selectedManager} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default GetAllManagers;
