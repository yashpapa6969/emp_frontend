// Login.jsx

import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
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
import { login,selectIsLoggedIn } from "../store/slice/authSlice";
import { selectUser } from "../store/slice/UserSlice";
import Navbar from "./Navbar";
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
        "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/loginEmployee",
        {
          email,
          password,
        }
      );
     if (response.status === 200) {
       dispatch(login());
       dispatch(setUser(response.data.employee));
       toast.success(response.data.message);
       navigate("/home"); 
     } else {
       toast.error(error.response.data.message);
       setError("Invalid credentials");
     }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response) {
        // Check if there's a response object in the error
        toast.error(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
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
          bgGradient="linear(to-r, green.500, yellow.500)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
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
          <Button type="submit" colorScheme="teal" mt={4} w="100%">
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
