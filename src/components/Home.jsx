import { Button, ChakraProvider, Box, Text, Flex } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

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

const boxData = [
  {
    title: "User Information",
    buttonLabel: "View User Information",
    route: "/UserInfo",
  },
  {
    title: "Get All Manager Details",
    buttonLabel: "View All Manager Information",
    route: "/getAllManager",
  },
  {
    title: "Employee Information",
    buttonLabel: "View Employee Information",
    route: "/getAllEmp",
  },
  {
    title: "Client Information",
    buttonLabel: "View Client Information",
    route: "/getAllClient",
  },
  {
    title: "Employee Information",
    buttonLabel: "View Employee Information",
    route: "/getAllEmp",
  },
  // Add more box data as needed
];

// Function to generate alternating gradients
const generateGradient = (index) => {
  return index % 2 === 0
    ? "linear(to-l, #7928CA, #FF0080)"
    : "linear(to-r, green.500, yellow.500)";
};

function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar className="mt-0" />
      <Flex flexWrap="wrap" justifyContent="space-between" mt={10}>
        {boxData.map((data, index) => (
          <Box
            key={index}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="md"
            p="4"
            mt="4"
            flexBasis={{ base: "100%", md: "30%" }}
          >
            <Text
              bgGradient={generateGradient(index)}
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              {data.title}
            </Text>
            <Link to={data.route}>
              <Button colorScheme="blue">{data.buttonLabel}</Button>
            </Link>
          </Box>
        ))}
      </Flex>
    </ChakraProvider>
  );
}

export default Home;
