import axios from "axios";
import { useEffect, useState } from "react";
import { CustomKanban } from "./kanban/Board";
import { Spinner } from "@chakra-ui/react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const ManageLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllLeads`
      );
      setLeads(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of error too
    }
  }

  useEffect(() => {
    fetchLeads();
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size="xl" color="purple.500" />
    </div>
  )

  const CreateProjectButton = ({ onOpen }) => {
    return (
      <Link to="/getAllLead">
        <Button
          colorScheme="purple"
          onClick={onOpen}
          className="flex gap-2 items-center mt-5 ml-3"
        >
          View All Leads
        </Button>
      </Link>
    );
  };

  return (
    <>
      <div className="flex items-end justify-end w-full pr-8"><CreateProjectButton /></div>
      <CustomKanban data={leads} />
    </>
  )
}

export default ManageLeads;