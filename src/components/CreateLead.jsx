import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Lead from "./forms/Lead";
import Client from "./forms/Client";

const CreateLead = () => {
  return (
    <>
      <ToastContainer />
      <Box
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        boxShadow="lg"
        m="4"
      >
        <Tabs>
          <TabList>
            <Tab>Lead</Tab>
            <Tab>Client</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Lead />
            </TabPanel>
            <TabPanel>
              <Client />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default CreateLead;
