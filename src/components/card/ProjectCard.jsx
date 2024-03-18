import { useEffect, useState } from "react";
import { Card, CardBody, Flex, Progress,Text } from "@chakra-ui/react";
import { HiArrowNarrowUp } from "react-icons/hi";
import axios from "axios";

const ProjectCard = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [leadsInProgress, setLeadsInProgress] = useState(0);
  const [convertedLeads, setConvertedLeads] = useState(0);
  const [lostLeads, setLostLeads] = useState(0);
  const [rawLeads, setRawLeads] = useState(0);

  useEffect(() => {
    // Fetch total lead count
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/admin/getTotalProjects`)
      .then((response) => {
        setTotalLeads(response.data.totalProjectCount);
      })
      .catch((error) => {
        console.error("Error fetching total lead count:", error);
      });

    // Fetch leads by status
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/admin/getProjectCountByStatus`)
      .then((response) => {
        const leads = response.data;
        const inProgressLead = leads.find((lead) => lead._id === "Not Started");
        const convertedLead = leads.find((lead) => lead._id === "In Progress");
        const lostLead = leads.find((lead) => lead._id === "Completed");
        const rawLead = leads.find((lead) => lead._id === "On Hold");

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
          Projects
        </Text>
        <CardBody>
          <Flex alignItems="center" justifyContent="space-between">
            <div className="flex gap-4 items-center text-lg">
              <HiArrowNarrowUp fontSize={18} />
              In progress
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
              Not Started
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
              Completed
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
              On Hold
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

export default ProjectCard;
