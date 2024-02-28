import React, { useState, useEffect } from "react";
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

const GetAllLead = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllLeads"
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
        `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/updateLeadStatus/${leadId}/${statusNo}`
      );
      // Fetch data again after updating status
      const response = await axios.get(
        "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllLeads"
      );
      setClients(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error.response.data.message);
    }
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
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Lead Information</h1>
        <Link to="/CreateLead">
          <Button
            colorScheme="blue"
            _hover={{ bg: "blue.600" }}
            mb="2"
            className="flex gap-2 items-center"
          >
            <GoPlus /> Add a Lead
          </Button>
        </Link>
        {clients.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
              <span>
                No Leads Available
              </span>
            } />
        ) : (
          <TableContainer
            searchText={searchText}
            setSearchText={setSearchText}
            setFilteredData={setFilteredClients}
            data={clients}
          >
            <Thead bg={"#F1F5F9"}>
              <Tr>
                <Th fontWeight="bold">S. No.</Th>
                <Th fontWeight="bold">Company Name</Th>
                <Th fontWeight="bold">Status</Th>
                <Th fontWeight="bold">Brand Name</Th>
                <Th fontWeight="bold">Status</Th>
                <Th fontWeight="bold">Enquiry Date</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">Source</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">Brand Name</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">Status</Th>
                <Th fontWeight="bold">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchText !== ""
                ? filteredClients.map((client, index) => (
                    <Tr key={client._id}>
                      <Td>{index + 1}</Td>
                      <Td>{client.companyName}</Td>
                      <Td className="md:table-cell hidden">{client.status}</Td>
                      <Td className="md:table-cell hidden">{client.brandName}</Td>
                      <Td className="md:table-cell hidden">
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
                                handleStatusChange(client.lead_id, 0)
                              }
                            >
                              Raw
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(client.lead_id, 1)
                              }
                            >
                              In-Progress
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(client.lead_id, 2)
                              }
                            >
                              Converted
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(client.lead_id, 3)
                              }
                            >
                              Lost
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
                    <Tr key={client._id}>
                      <Td>{index + 1}</Td>
                      <Td>{client.enquiryDate}</Td>
                      <Td className="md:table-cell hidden">{client.source}</Td>
                      <Td className="md:table-cell hidden">{client.brandName}</Td>
                      <Td className="md:table-cell hidden">
                      <Td>{client.companyName}</Td>
                      <Td>{client.status}</Td>
                      <Td>{client.brandName}</Td>
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
                                handleStatusChange(client.lead_id, 0)
                              }
                            >
                              Raw
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(client.lead_id, 1)
                              }
                            >
                              In-Progress
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(client.lead_id, 2)
                              }
                            >
                              Converted
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(client.lead_id, 3)
                              }
                            >
                              Lost
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
        )}
      </div>

      <InfoModal
        modalFor="lead"
        data={selectedClient}
        onClose={() => setSelectedClient(null)}
        isOpen={selectedClient !== null}
      />
    </>
  );
};

export default GetAllLead;
