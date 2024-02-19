import { useState } from "react";
import { Button, ChakraProvider, Flex, Heading, Text } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <ChakraProvider theme={theme}>
      <h1 className="text-5xl font-bold underline">Hello world!</h1>
      <Flex direction="column" align="center" justify="center" h="100vh">
        <img src={reactLogo} alt="React Logo" className="logo" />
        <Heading mb={4}>Counter App</Heading>
        <Text fontSize="xl" mb={4}>
          Count: {count}
        </Text>
        <Flex>
          <Button colorScheme="blue" mr={2} onClick={increment}>
            Increment
          </Button>
          <Button colorScheme="red" onClick={decrement}>
            Decrement
          </Button>
        </Flex>
        <img src={viteLogo} alt="Vite Logo" className="logo" />
      </Flex>
    </ChakraProvider>
  );
}

export default function WrappedApp() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}
