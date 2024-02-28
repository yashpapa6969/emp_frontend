import { useState, useEffect } from "react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Spinner, // Import Spinner component from Chakra UI
} from "@chakra-ui/react";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import InfoModal from "./common/InfoModal";
import TableContainer from "./common/TableContainer";
import { Empty } from "antd";

const CreateEmployeeButton = ({ onOpen }) => {
  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        _hover={{ bg: "blue.600" }}
        mb="2"
        className="flex gap-2 items-center"
      >
        <GoPlus /> Create Employee
      </Button>
    </>
  );
};

const GetAllEmp = () => {
  const [employee, setEmployees] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllEmployees"
        );
        setEmployees(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of error too
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-4xl font-bold mb-4">Employee Information</h1>
        <CreateEmployeeButton onOpen={onOpen} />
        {employee.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
            <span>
              No Employee Data
            </span>
          } />
        ) : (
          <TableContainer
            searchText={searchText}
            setSearchText={setSearchText}
            setFilteredData={setFilteredEmployee}
            data={employee}
          >
            <Thead bg={"#F1F5F9"}>
              <Tr>
                <Th fontWeight="bold">S. No.</Th>
                <Th fontWeight="bold">Name</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">Position</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">Department</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">Joining Date</Th>
                <Th fontWeight="bold">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchText !== ""
                ? filteredEmployee.map((emp, index) => (
                    <Tr key={emp._id}>
                      <Td>{index + 1}</Td>
                      <Td>{emp.name}</Td>
                      <Td className="md:table-cell hidden">{emp.position}</Td>
                      <Td className="md:table-cell hidden">{emp.department}</Td>
                      <Td className="md:table-cell hidden">{emp.joiningDate}</Td>
                      <Td>
                        <Button
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(emp)}
                        >
                          More Info
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : employee.map((emp, index) => (
                    <Tr key={emp._id}>
                      <Td>{index + 1}</Td>
                      <Td>{emp.name}</Td>
                      <Td className="md:table-cell hidden">{emp.position}</Td>
                      <Td className="md:table-cell hidden">{emp.department}</Td>
                      <Td className="md:table-cell hidden">{emp.joiningDate}</Td>
                      <Td>
                        <Button
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(emp)}
                        >
                          More Info
                        </Button>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </TableContainer>
        )}
      </div>

      <InfoModal
        modalFor="employee"
        data={selectedEmployee}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default GetAllEmp;
