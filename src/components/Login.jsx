import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, selectIsLoggedIn } from "../store/slice/authSlice";
import { selectUser } from "../store/slice/UserSlice";
import { setUser } from "../store/slice/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (user && isLoggedIn === true) {
      navigate("/home");
    }
  }, [isLoggedIn]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/loginEmployee`,
        { email, password }
      );
      console.log(response)

      // Check for a successful response (status code 200)
      if (response.status === 200) {
        dispatch(login());
        dispatch(setUser(response.data.employee));
        toast.success(response.data.message);
        navigate("/home");
      } else {
        // Handle unexpected status codes as a generic error
        console.error("Unexpected status code:", response.status);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error logging in:", error);

      // Check if the error response exists and has a message
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response was received:", error.request);
        toast.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        toast.error(error.message);
      }
    }
  };


  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Box
        maxW="md"
        mx="auto"
        mt={20}
        p={6}
        borderWidth="1px"
        borderRadius="lg"
      >
        <Text
          color="black"
          fontSize="5xl"
          fontWeight="extrabold"
          textAlign="center"
          mb={4}
        >
          Employee Login
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {error && (
            <Box color="red.500" mt={2}>
              {error}
            </Box>
          )}
          <Button type="submit" colorScheme="purple" mt={4} w="100%">
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;

