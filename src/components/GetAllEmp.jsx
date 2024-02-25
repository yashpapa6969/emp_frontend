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
import CreateEmpB from "./CreateEmpB";
import { GoPlus } from "react-icons/go";
import InfoModal from "./common/InfoModal";
import TableContainer from "./common/TableContainer";

const CreateEmployeeButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        _hover={{ bg: "blue.600" }}
        mb="2"
        className="flex gap-2 items-center"
      >
        <GoPlus /> Create Employee
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateEmpB onClose={onClose} />
          </ModalBody>
          {/* <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

const GetAllEmp = () => {
  const [employee, setEmployees] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllEmployees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Employee Information</h1>
        <CreateEmployeeButton />
        <TableContainer searchText={searchText} setSearchText={setSearchText} setFilteredData={setFilteredEmployee} data={employee}>
          <Thead bg={"#F1F5F9"}>
            <Tr>
              <Th fontWeight="bold">S. No.</Th>
              <Th fontWeight="bold">Name</Th>
              <Th fontWeight="bold">Position</Th>
              <Th fontWeight="bold">Department</Th>
              <Th fontWeight="bold">Joining Date</Th>
              <Th fontWeight="bold">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchText != "" ?
            filteredEmployee.map((emp, index) => (
              <Tr key={emp._id}>
                <Td>{index+1}</Td>
                <Td>{emp.name}</Td>
                <Td>{emp.position}</Td>
                <Td>{emp.department}</Td>
                <Td>{emp.joiningDate}</Td>
                <Td>
                  <Button
                    colorScheme="purple"
                    onClick={() => handleMoreInfo(emp)}
                  >
                    More Info
                  </Button>
                </Td>
              </Tr>
            )) :
            employee.map((emp, index) => (
              <Tr key={emp._id}>
                <Td>{index+1}</Td>
                <Td>{emp.name}</Td>
                <Td>{emp.position}</Td>
                <Td>{emp.department}</Td>
                <Td>{emp.joiningDate}</Td>
                <Td>
                  <Button
                    colorScheme="purple"
                    onClick={() => handleMoreInfo(emp)}
                  >
                    More Info
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableContainer>
      </div>

      <InfoModal modalFor="employee" data={selectedEmployee} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default GetAllEmp;
