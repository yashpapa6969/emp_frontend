import axios from "axios";
import { useEffect, useState } from "react";
import { CustomKanban } from "./kanban/Board";
import { Spinner } from "@chakra-ui/react";
import {
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import GetAllLead from "./GetAllLead";

const ManageLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("manage");

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

  return (
    <div className="p-6">
      <div className="w-full flex items-center justify-between mb-6">
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
        <div className="flex flex-col md:flex-row justify-end mb-3">
          <div className={`py-2 px-3 cursor-pointer border-b-[3px] rounded-t-md ${activeTab === "manage" ? "bg-gray-100 border-purple-600" : "text-gray-500"}`} onClick={() => setActiveTab("manage")}>
            Pipeline View
          </div>
          <div className={`py-2 px-3 cursor-pointer border-b-[3px] rounded-t-md ${activeTab === "info" ? "bg-gray-100 border-purple-600" : "text-gray-500"}`} onClick={() => setActiveTab("info")}>
            Table View
          </div>
        </div>
      </div>
      {activeTab === "manage" &&
        <CustomKanban data={leads} />
      }
      {activeTab === "info" &&
        <GetAllLead />
      }
    </div>
  )
}

export default ManageLeads;