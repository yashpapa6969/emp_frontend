import {
  Box,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Lead from "./forms/Lead";
import Client from "./forms/Client";

const CreateClient = () => {

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
            <Tab>Client</Tab>
            <Tab>Lead</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Client />
            </TabPanel>
            <TabPanel>
              <Lead />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default CreateClient;
