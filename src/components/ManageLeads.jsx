import axios from "axios";
import { useEffect, useState } from "react";
import { CustomKanban } from "./kanban/Board";
import { Spinner } from "@chakra-ui/react";

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

    return (
        <div>
            <CustomKanban data={leads} />
        </div>
    )
}

export default ManageLeads;