import { useState, useEffect } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Flex
} from "@chakra-ui/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Emp from "./forms/Emp";

const CreateEmp = () => {



  return (
    <>
      <ToastContainer></ToastContainer>
      <Box
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        boxShadow="lg"
        m="4"
      >
        <h1 className="text-2xl font-semibold">Add Employee</h1>
        <p className="font-light mb-4">Fill the below form to add a new employee</p>
        
      <Emp></Emp>
      </Box>
    </>
  );
};

export default CreateEmp;
