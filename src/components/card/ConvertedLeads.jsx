import { useEffect, useState } from "react";
import { Card, CardBody, Flex, Progress,Text } from "@chakra-ui/react";
import { HiArrowNarrowUp } from "react-icons/hi";
import axios from "axios";

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
      <Card className="w-full md:w-1/4">
        <Text fontSize="3xl" mb={4} textAlign="center">
          Leads
        </Text>
        <CardBody>
          <Flex alignItems="center" justifyContent="space-between">
            <div className="flex gap-4 items-center text-lg">
              <HiArrowNarrowUp fontSize={18} />
              Converted
            </div>
            {convertedLeads}/{totalLeads}
          </Flex>
          <Progress
            value={(convertedLeads / totalLeads) * 100}
            colorScheme="green"
            mt={4}
            height={2}
            rounded="lg"
          />
        </CardBody>
        <CardBody>
          <Flex alignItems="center" justifyContent="space-between">
            <div className="flex gap-4 items-center text-lg">
              <HiArrowNarrowUp fontSize={18} />
              In Progress
            </div>
            {leadsInProgress}/{totalLeads}
          </Flex>
          <Progress
            value={(leadsInProgress / totalLeads) * 100}
            colorScheme="green"
            mt={4}
            height={2}
            rounded="lg"
          />
        </CardBody>
        <CardBody>
          <Flex alignItems="center" justifyContent="space-between">
            <div className="flex gap-4 items-center text-lg">
              <HiArrowNarrowUp fontSize={18} />
              Lost
            </div>
            {lostLeads}/{totalLeads}
          </Flex>
          <Progress
            value={(lostLeads / totalLeads) * 100}
            colorScheme="green"
            mt={4}
            height={2}
            rounded="lg"
          />
        </CardBody>
        <CardBody>
          <Flex alignItems="center" justifyContent="space-between">
            <div className="flex gap-4 items-center text-lg">
              <HiArrowNarrowUp fontSize={18} />
              Raw
            </div>
            {rawLeads}/{totalLeads}
          </Flex>
          <Progress
            value={(rawLeads / totalLeads) * 100}
            colorScheme="green"
            mt={4}
            height={2}
            rounded="lg"
          />
        </CardBody>
      </Card>
    </>
  );
};

export default ConvertedLeads;
