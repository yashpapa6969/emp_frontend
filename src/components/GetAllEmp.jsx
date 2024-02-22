import React, { useState, useEffect } from "react";
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
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "./Navbar";
import CreateEmpB from "./CreateEmpB"; 

const CreateEmployeeButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        mt="4" 
        _hover={{ bg: "yellow.500", color: "black.500" }}
        mb="2" 
      >
        Create Employee
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
  const [managers, setManagers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllEmployees"
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
      <Navbar />
      <Box display="flex" flexDirection="column" alignItems="center" pt={10}>
        <Text
          color="black"
          fontSize="5xl"
          fontWeight="extrabold"
          textAlign="center"
          mb={4} 
        >
          All Employee Details
        </Text>
        <CreateEmployeeButton />
        <Table variant="striped" colorScheme="blue" width="60%">
          <Thead>
            <Tr>
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
                <Td fontWeight="bold">{manager.name}</Td>
                <Td fontWeight="bold">{manager.position}</Td>
                <Td fontWeight="bold">{manager.department}</Td>
                <Td fontWeight="bold">{manager.joiningDate}</Td>
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
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedManager && (
              <div>
                <Text fontWeight="bold">Name: </Text>
                <Text>{selectedManager.name}</Text>
                <Text fontWeight="bold">Email: </Text>
                <Text>{selectedManager.email}</Text>
                <Text fontWeight="bold">Position: </Text>
                <Text>{selectedManager.position}</Text>
                <Text fontWeight="bold">Department: </Text>
                <Text>{selectedManager.department}</Text>
                <Text fontWeight="bold">Joining Date: </Text>
                <Text>{selectedManager.joiningDate}</Text>
                <Text fontWeight="bold">Employee ID: </Text>
                <Text>{selectedManager.employee_id}</Text>
                <Text fontWeight="bold">Manager ID: </Text>
                <Text>{selectedManager.manager_id}</Text>
                <Text fontWeight="bold">Permissions:</Text>
                {selectedManager.permissions.map((permission, index) => (
                  <Text key={index}>{permission}</Text>
                ))}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GetAllEmp;
