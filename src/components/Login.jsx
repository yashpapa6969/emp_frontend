// Login.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, FormControl, FormLabel, Input,Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../store/slice/authSlice";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { setUser } from "../store/slice/UserSlice"; // Import setUser action from userSlice

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      if (response.data.status === "success") {
        dispatch(login());
        dispatch(setUser(response.data.employee)); // Dispatch user data to Redux store
        navigate("/home");
        console.log("Login successful!");
        console.log(response.data.message);
        toast.success(response.data.message);
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response.data.message);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar></Navbar>
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
