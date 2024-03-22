import { useEffect, useState } from "react";
import { Card, CardBody, Flex, Progress, Select } from "@chakra-ui/react";
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
  const [selectedYear, setSelectedYear] = useState(null);

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

    // Fetch leads according to selected year
    if (selectedYear) {
      axios
        .get(`${import.meta.env.VITE_API_BASE}/api/admin/getLeadsByStatus`)
        // .filter((data) => {
        //   return data.workStartDate === selectedYear.strip(2,3);
        // })
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
    }
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
        <Select
          placeholder='Select Year'
          mt={4}
          value={selectedYear || ""}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2025">2025-2026</option>
          <option value="2024">2024-2025</option>
          <option value="2023">2023-2024</option>
          <option value="2022">2022-2023</option>
          <option value="2021">2021-2022</option>
          <option value="2020">2020-2021</option>
          <option value="2020">2019-2020</option>
          <option value="2019">2018-2019</option>
          <option value="2018">2017-2018</option>
          <option value="2017">2016-2017</option>
          <option value="2015">2015-2016</option>
          <option value="2014">2014-2015</option>
          <option value="2013">2013-2014</option>
          <option value="2012">2012-2013</option>
          <option value="2011">2011-2012</option>
        </Select>
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
