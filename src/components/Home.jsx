import { Button, ChakraProvider, Box, Text, Flex } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { selectUser } from "../store/slice/UserSlice"; 
import { useSelector, useDispatch } from "react-redux";


const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.800",
      },
    },
  },
});


function Home() {
  const user = useSelector(selectUser);
  return (
    <ChakraProvider theme={theme}>
      <Navbar className="mt-0" />
     
        <Flex
          height="100vh"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text
            textColor="black" // Set text color to black
            fontSize="5xl"
            fontWeight="extrabold"
            textAlign="center"
          >
            Hello User {user.name} !!!!
          </Text>
        
      </Flex>
    </ChakraProvider>
  );
}

export default Home;
