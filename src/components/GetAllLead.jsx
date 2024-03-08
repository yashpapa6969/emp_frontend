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
import { DeleteIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify"; // Import DeleteIcon

const GetAllLead = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/getAllLeads`
        );
        setLeads(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of error too
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (lead) => {
    setSelectedLead(lead);
  };

  const handleStatusChange = async (leadId, statusNo) => {
    try {
      await axios.get(
        `${
          import.meta.env.VITE_API_BASE
        }/api/admin/updateLeadStatus/${leadId}/${statusNo}`
      );
      // Fetch data again after updating status
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllLeads`
      );
      setLeads(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error.response.data.message);
    }
  };

  const handleDeleteLead = async (leadId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE}/api/admin/deleteLeadById/${leadId}`
      );
      toast.success("Successfully deleted Lead")
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllLeads`
      );
      setLeads(response.data);
    } catch (error) {
      console.error("Error deleting lead:", error);
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
        {leads.length === 0 ? (
          <p className="text-red-500 text-lg">No Lead Available</p>
        ) : (
          <TableContainer
            formFor="lead"
            searchText={searchText}
            setSearchText={setSearchText}
            setFilteredData={setFilteredLeads}
            data={leads}
          >
            <Thead bg={"#F1F5F9"}>
              <Tr>
                <Th fontWeight="bold">S. No.</Th>
                <Th fontWeight="bold">Company Name</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Status
                </Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Brand Name
                </Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Status
                </Th>
                <Th fontWeight="bold">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchText !== ""
                ? filteredLeads.map((lead, index) => (
                    <Tr key={lead._id}>
                      <Td>{index + 1}</Td>
                      <Td>{lead.companyName}</Td>
                      <Td className="md:table-cell hidden">{lead.status}</Td>
                      <Td className="md:table-cell hidden">{lead.brandName}</Td>
                      <Td className="md:table-cell hidden">
                        {lead.status === 0 && "Raw"}
                        {lead.status === 1 && "In-Progress"}
                        {lead.status === 2 && "Converted"}
                        {lead.status === 3 && "Lost"}
                        <Menu>
                          <MenuButton
                            size="sm"
                            as={Button}
                            colorScheme="purple"
                          >
                            Change Status
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(lead.lead_id, 0)
                              }
                            >
                              Raw
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(lead.lead_id, 1)
                              }
                            >
                              In-Progress
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(lead.lead_id, 2)
                              }
                            >
                              Converted
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(lead.lead_id, 3)
                              }
                            >
                              Lost
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                      <Td>
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(lead)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          onClick={() => handleDeleteLead(lead.lead_id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : leads.map((lead, index) => (
                    <Tr key={lead._id}>
                      <Td>{index + 1}</Td>
                      <Td>{lead.companyName}</Td>
                      <Td className="md:table-cell hidden">{lead.status}</Td>
                      <Td className="md:table-cell hidden">{lead.brandName}</Td>
                      <Td className="md:table-cell hidden">
                        {lead.status === 0 && "Raw"}
                        {lead.status === 1 && "In-Progress"}
                        {lead.status === 2 && "Converted"}
                        {lead.status === 3 && "Lost"}
                        <Menu>
                          <MenuButton
                            size="sm"
                            as={Button}
                            colorScheme="purple"
                          >
                            Change Status
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(lead.lead_id, 0)
                              }
                            >
                              Raw
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(lead.lead_id, 1)
                              }
                            >
                              In-Progress
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(lead.lead_id, 2)
                              }
                            >
                              Converted
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatusChange(lead.lead_id, 3)
                              }
                            >
                              Lost
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                      <Td>
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(lead)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          ml={2}
                          onClick={() => handleDeleteLead(lead.lead_id)}
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
        modalFor="lead"
        data={selectedLead}
        onClose={() => setSelectedLead(null)}
        isOpen={selectedLead !== null}
      />
    </>
  );
};

export default GetAllLead;
