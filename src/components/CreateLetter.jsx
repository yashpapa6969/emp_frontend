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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const RequiredIndicator = () => {
  return (
    <Text as="span" color="red.500" ml={1}>
      *
    </Text>
  );
};

const formatDate = (date) => {
  if (!date) return ""; // Handle the case where date is null or undefined
  return moment(date).format("YYYY-MM-DD");
};
const CreateLetter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    createdAt: new Date(),
    singleFile: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "singleFile") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, singleFile: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("createdAt", formData.createdAt);
    formDataToSend.append("singleFile", formData.singleFile);


    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/admin/createLetter`,
        formDataToSend
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/success"); // Redirect to success page
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
        <h1 className="text-2xl font-semibold">Create Letter</h1>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </FormControl>
            <FormControl id="createdAt">
              <FormLabel>
                Created At <RequiredIndicator />
              </FormLabel>
              <Input
                width={300}
                type="date"
                name="createdAt"
                onChange={handleChange}
                value={formatDate(formData.createdAt)} // Format the date
              />
            </FormControl>
            <FormControl id="singleFile" isRequired>
              <FormLabel>Single File</FormLabel>
              <VStack spacing={2} align="stretch">
                {formData.singleFile && (
                  <Box display="flex" alignItems="center">
                    <Text>{formData.singleFile.name}</Text>
                    <Button
                      aria-label="Remove file"
                      variant="ghost"
                      colorScheme="red"
                      onClick={handleRemoveFile}
                    >
                      X
                    </Button>
                  </Box>
                )}
                {!formData.singleFile && (
                  <Input
                    type="file"
                    name="singleFile"
                    onChange={handleChange}
                  />
                )}
              </VStack>
            </FormControl>
            <Button mt={6} type="submit" colorScheme="purple">
              Create Letter
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default CreateLetter;
