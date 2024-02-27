import {
  Box,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
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
        <h1 className="text-2xl font-semibold">Add Client</h1>
        <p className="font-light mb-4">Fill the below form to add a new client</p>

        <Client />
      </Box>
    </>
  );
};

export default CreateClient;
