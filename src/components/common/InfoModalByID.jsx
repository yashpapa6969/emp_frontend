import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const InfoModalByID = ({ modalFor, id, onClose, isOpen }) => {
  const [data, setData] = useState(null);
  console.log(id)

  useEffect(() => {
    async function fetchData() {
      try {
        let response;
        // Fetch data based on the modalFor prop
        if (modalFor === "employee") {
          response = await axios.get(
            `${import.meta.env.VITE_API_BASE}/api/admin/getEmployeeByID/${id}`
          ); // Example endpoint for fetching employee data
        } else if (modalFor === "client") {
          response = await axios.get(
            `${import.meta.env.VITE_API_BASE}/api/clientsByID/${id}`
          ); // Example endpoint for fetching client data
        }
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (isOpen) {
      fetchData();
    }
  }, [modalFor, id, isOpen]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalFor === "employee"
            ? "Employee Information"
            : "Client Information"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {data && (
            <div>
              {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                  <Text fontWeight="bold">{key}: </Text>
                  <Text>{value}</Text>
                </div>
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InfoModalByID;
