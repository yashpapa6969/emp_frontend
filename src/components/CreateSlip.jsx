import { useState, useEffect } from "react";
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

const CreateSlip = () => {
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null);
  const [projectData, setProjectData] = useState({
    employee_id: "",
    basicPay: "",
    travelPay: "",
    bonus: "",
    paidLeave: "",
    tds: "",
    totalLeaves: "",
    advanceSalary: "",
  });
  const [tags, setTags] = useState([]);
  const [employee, setEmployee] = useState([]);
  const getEmployeeNameById = (id) => {
    const employee = employees.find((employee) => employee.employee_id === id);
    return employee ? employee.name : "Unknown Employee";
  };
  const getTagNameById = (id) => {
    const tag = tags.find((tag) => tag.tag_id === id);
    return tag ? tag.tagName : "Unknown Tag";
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/admin/getAllEmployees`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };
  const handleSelectManager = (event) => {
    const selectedEmployeeId = event.target.value;
    const selectedEmployee = employee.find(
      (manager) => manager.employee_id === selectedEmployeeId
    );
    setSelectedEmployeeInfo(selectedEmployee);
    setProjectData({ ...projectData, employee_id: selectedEmployeeId });
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_API_BASE}/api/admin/createSalarySlip`,
        projectData,
        {
          responseType: 'blob', // Important: This tells Axios to expect a binary response instead of JSON
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: 'application/pdf' });
        // Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        // Create a temp <a> tag to trigger download
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', 'salary_slip.pdf'); // or any other extension
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        if (response.status === 200) {
          toast.success('Salary slip downloaded successfully.');
        } else {
          console.error("Failed to download slip");
          toast.error('Failed to download slip.');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response && error.response.data) {
          toast.error(error.response.data.error || error.response.data.message);
        }
      });
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
        <h1 className="text-2xl font-semibold">Add Salary Slip</h1>
        <p className="font-light mb-4">Fill the below form to add a new Salary Slip</p>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="manager_id">
              <FormLabel>Select Employee</FormLabel>
              <select
                onChange={handleSelectManager}
                value={projectData.employee_id}
              >
                <option value="">Select Employee</option>
                {employee.map((manager) => (
                  <option key={manager.employee_id} value={manager.employee_id}>
                    {manager.name}
                  </option>
                ))}
              </select>
            </FormControl>
            {selectedEmployeeInfo && (
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold">Name: {selectedEmployeeInfo.name}</Text>
                <Text fontWeight="bold">Position: {selectedEmployeeInfo.position}</Text>
                <Text fontWeight="bold">Department: {selectedEmployeeInfo.department}</Text>
              </VStack>
            )}


            <div className="flex flex-col md:flex-row gap-3">
              <FormControl id="basicPay"  isRequired>
                <FormLabel>Basic Pay</FormLabel>
                <Input name="basicPay" onChange={handleChange} />
              </FormControl>
              <FormControl id="travelPay" isRequired>
                <FormLabel>Travel Pay</FormLabel>
                <Input name="travelPay" onChange={handleChange} />
              </FormControl>
              <FormControl id="Bonus"  isRequired>
                <FormLabel>Bonus</FormLabel>
                <Input name="bonus" onChange={handleChange} />
              </FormControl>
            </div>
            <div className="flex gap-3">
              <FormControl id="paidLeave" isRequired>
                <FormLabel>Paid Leave</FormLabel>
                <Input name="paidLeave" onChange={handleChange} />
              </FormControl>
              <FormControl id="tds"  isRequired>
                <FormLabel>TDS</FormLabel>
                <Input name="tds" onChange={handleChange} />
              </FormControl>
              <FormControl id="totaleaves"  isRequired>
                <FormLabel>Total Leaves</FormLabel>
                <Input name="totalLeaves" onChange={handleChange} />
              </FormControl>
            </div>
            <FormControl id="advanceSalary" maxWidth={400} isRequired>
              <FormLabel>Advance Salary</FormLabel>
              <Input name="advanceSalary" onChange={handleChange} />
            </FormControl>

            <Button mt={6} type="submit" colorScheme="purple">
              Create Salary Slip
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default CreateSlip;
