import { useEffect, useState } from "react";
import { Card, CardBody, Flex, Progress } from "@chakra-ui/react";
import axios from "axios";
import { FaTty } from "react-icons/fa6";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { TfiBarChart } from "react-icons/tfi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { SlDrawer } from "react-icons/sl"
import { Divider } from "antd";

const ConvertedLeads = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [leadsInProgress, setLeadsInProgress] = useState(0);
  const [convertedLeads, setConvertedLeads] = useState(0);
  const [lostLeads, setLostLeads] = useState(0);
  const [rawLeads, setRawLeads] = useState(0);

  useEffect(() => {
    // Fetch total lead count
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/admin/getTotalLeads`)
      .then((response) => {
        setTotalLeads(response.data.totalLeadCount);
      })
      .catch((error) => {
        console.error("Error fetching total lead count:", error);
      });

    // Fetch leads by status
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/admin/getLeadsByStatus`)
      .then((response) => {
        const leads = response.data;
        const inProgressLead = leads.find((lead) => lead._id === "In-Progress");
        const convertedLead = leads.find((lead) => lead._id === "Client");
        const lostLead = leads.find((lead) => lead._id === "Lost");
        const rawLead = leads.find((lead) => lead._id === "Raw");

        if (inProgressLead) {
          setLeadsInProgress(inProgressLead.count);
        }
        if (convertedLead) {
          setConvertedLeads(convertedLead.count);
        }
        if (lostLead) {
          setLostLeads(lostLead.count);
        }
        if (rawLead) {
          setRawLeads(rawLead.count);
        }
      })
      .catch((error) => {
        console.error("Error fetching leads by status:", error);
      });
  }, []);

  return (
    <>
      <Card className="w-full md:w-1/3 p-4 pb-8">
        <div className="flex items-center justify-between text-gray-600">
          <h1 className="flex text-xl gap-2 items-center">
          <FaTty /> Leads
          </h1>
          <div className="bg-blue-500 rounded-full h-[25px] min-w-[25px] flex items-center justify-center text-white text-[10px]">{totalLeads}</div>
        </div>
        <Divider />
        <CardBody m={0} p={0}>
          <Flex color={"gray.500"} alignItems="center" justifyContent="space-between">
            <div className="flex gap-4 items-center text-lg">
              <HiArrowTrendingUp />
              Converted
            </div>
            {convertedLeads}/{totalLeads}
          </Flex>
          <Progress
            value={(convertedLeads / totalLeads) * 100}
            colorScheme="green"
            mt={2}
            height={2}
            rounded="lg"
          />
          <Flex color={"gray.500"} mt={4} alignItems="center" justifyContent="space-between">
            <div className="flex gap-4 items-center text-lg">
              <TfiBarChart />
              In Progress
            </div>
            {leadsInProgress}/{totalLeads}
          </Flex>
          <Progress
            value={(leadsInProgress / totalLeads) * 100}
            colorScheme="blue"
            mt={2}
            height={2}
            rounded="lg"
          />
          <Flex color={"gray.500"} mt={4} alignItems="center" justifyContent="space-between">
            <div className="flex gap-4 items-center text-lg">
              <IoAlertCircleOutline />
              Lost
            </div>
            {lostLeads}/{totalLeads}
          </Flex>
          <Progress
            value={(lostLeads / totalLeads) * 100}
            colorScheme="red"
            mt={2}
            height={2}
            rounded="lg"
          />
          <Flex color={"gray.500"} mt={4} alignItems="center" justifyContent="space-between">
            <div className="flex gap-4 items-center text-lg">
              <SlDrawer />
              Raw
            </div>
            {rawLeads}/{totalLeads}
          </Flex>
          <Progress
            value={(rawLeads / totalLeads) * 100}
            colorScheme="yellow"
            mt={2}
            height={2}
            rounded="lg"
          />
        </CardBody>
      </Card>
    </>
  );
};

export default ConvertedLeads;
