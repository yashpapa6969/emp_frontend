import { useState, useEffect } from "react";
import {
  Table,
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
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import CreateEmpB from "./CreateEmpB";
import { GoPlus } from "react-icons/go";
import InfoModal from "./common/InfoModal";

const CreateEmployeeButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        _hover={{ bg: "blue.600" }}
        mb="10"
        className="flex gap-2 items-center"
      >
        <GoPlus /> Create Employee
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateEmpB />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const GetAllEmp = () => {
  const [employee, setEmployees] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
        <Table width="100%">
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
            {employee.map((emp, index) => (
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
        </Table>
      </div>

      <InfoModal modalFor="employee" data={selectedEmployee} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default GetAllEmp;
