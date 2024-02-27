import {
  Box,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Lead from "./forms/Lead";

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
        <h1 className="text-2xl font-semibold">Add Lead</h1>
        <p className="font-light mb-4">Fill the below form to add a new lead</p>

        <Lead />
      </Box>
    </>
  );
};

export default CreateLead;
