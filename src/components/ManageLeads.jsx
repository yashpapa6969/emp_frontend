import axios from "axios";
import { useEffect, useState } from "react";
import { CustomKanban } from "./kanban/Board";
import { Divider, Menu, MenuButton, MenuItem, MenuList, Spinner } from "@chakra-ui/react";
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
import { Tabs } from "antd";
import GetAllLead from "./GetAllLead";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
      <div className="flex mb-3">
        <div className={`py-2 px-3 cursor-pointer border-b-[3px] rounded-t-md ${activeTab === "manage" ? "bg-gray-100 border-purple-600" : "text-gray-500"}`} onClick={() => setActiveTab("manage")}>
          Manage Leads
        </div>
        <div className={`py-2 px-3 cursor-pointer border-b-[3px] rounded-t-md ${activeTab === "info" ? "bg-gray-100 border-purple-600" : "text-gray-500"}`} onClick={() => setActiveTab("info")}>
          Lead Information
        </div>
        <Menu>
          <MenuButton className="border-b-[3px] px-3 text-gray-500 hover:bg-gray-100">
            Actions <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
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