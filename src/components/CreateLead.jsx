import { useState } from "react";
import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreateLead = () => {
  const [projectData, setProjectData] = useState({
    enquiryDate: new Date(),
    source: "",
    brandName: "",
    firstName: "",
    lastName: "",
    phone1: "",
    phone2: "",
    email1: "",
    email2: "",
    website: "",
    businessAddress: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    requirement: "",
    additionalInformation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/createLead",
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          console.error("Failed to create project");
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(error.response.data.message);
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <Box
        maxW="3xl"
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        boxShadow="lg"
        mt="4"
      >
        <form onSubmit={handleSubmit}>
          <Text
            textColor="black"
            fontSize="3xl"
            fontWeight="extrabold"
            textAlign="center"
          >
            Add Lead
          </Text>
          <FormControl id="enquiryDate" isRequired>
            <FormLabel>Enquiry Date</FormLabel>
            <DatePicker
              selected={projectData.enquiryDate}
              onChange={(date) =>
                setProjectData({ ...projectData, enquiryDate: date })
              }
              dateFormat="MM/dd/yyyy"
            />
          </FormControl>
          <VStack spacing={4} align="stretch">
            <FormControl id="source" isRequired>
              <FormLabel>Source</FormLabel>
              <Input name="source" onChange={handleChange} />
            </FormControl>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl id="brandName" isRequired >
                <FormLabel>Brand Name</FormLabel>
                <Input name="brandName" onChange={handleChange} />
              </FormControl>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input name="firstName" onChange={handleChange} />
              </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl id="lastName" isRequired flexBasis="30%">
                <FormLabel>Last Name</FormLabel>
                <Input name="lastName" onChange={handleChange} />
              </FormControl>
              <FormControl id="phone1" isRequired flexBasis="30%">
                <FormLabel>Phone Number 1</FormLabel>
                <Input name="phone1" onChange={handleChange} />
              </FormControl>
              <FormControl id="phone2" flexBasis="30%">
                <FormLabel>Phone Number 2</FormLabel>
                <Input name="phone2" onChange={handleChange} />
              </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl id="email1" isRequired>
                <FormLabel>Email 1</FormLabel>
                <Input name="email1" onChange={handleChange} />
              </FormControl>
              <FormControl id="email2">
                <FormLabel>Email 2</FormLabel>
                <Input name="email2" onChange={handleChange} />
              </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl id="website" isRequired>
                <FormLabel>Website</FormLabel>
                <Input name="website" onChange={handleChange} />
              </FormControl>
              <FormControl id="businessAddress" isRequired>
                <FormLabel>Business Address</FormLabel>
                <Input name="businessAddress" onChange={handleChange} />
              </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl id="city" isRequired>
                <FormLabel>City</FormLabel>
                <Input name="city" onChange={handleChange} />
              </FormControl>
              <FormControl id="pincode" isRequired>
                <FormLabel>Pincode</FormLabel>
                <Input name="pincode" onChange={handleChange} />
              </FormControl>
              <FormControl id="country" isRequired>
                <FormLabel>Country</FormLabel>
                <Input name="country" onChange={handleChange} />
              </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl id="requirement">
                <FormLabel>Requirement</FormLabel>
                <Input name="requirement" onChange={handleChange} />
              </FormControl>
              <FormControl id="additionalInformation">
                <FormLabel>Additional Information</FormLabel>
                <Input name="additionalInformation" onChange={handleChange} />
              </FormControl>
            </div>

            <Button type="submit" colorScheme="purple">
              Create Lead
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default CreateLead;
