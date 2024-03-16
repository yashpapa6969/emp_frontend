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
import { useNavigate } from "react-router-dom";
const RequiredIndicator = () => {
  return <Text as="span" color="red.500" ml={1}>*</Text>;
};
const CreateSlip = () => {
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null);
  const navigate=useNavigate();
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
    const requiredFields = [
      { key: 'employee_id', label: 'Select Employee' },
      { key: 'basicPay', label: 'Basic Pay' },
      { key: 'travelPay', label: 'Travel Pay' },
      { key: 'bonus', label: 'Bonus' },
      { key: 'paidLeave', label: 'Paid Leave' },
      { key: 'tds', label: 'TDS' },
      { key: 'totalLeaves', label: 'Total Leaves' },
      { key: 'advanceSalary', label: 'Advance Salary' },
    ];
  
    for (let { key, label, isArray } of requiredFields) {
      if (isArray ? !projectData[key] || projectData[key].length === 0 : !projectData[key]) {
        toast.error(`${label} is required.`);
        return;
      }
    }
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

        if (response.status === 200 || response.status === 201) {
          setSelectedEmployeeInfo(null);
          setProjectData({
    employee_id: "",
    basicPay: "",
    travelPay: "",
    bonus: "",
    paidLeave: "",
    tds: "",
    totalLeaves: "",
    advanceSalary: "",
  })
   toast.success("Salary slip downloaded successfully.", {
     autoClose: 2000,
   });    setTimeout(() => {
     navigate("/getAllSlip");
   }, 2000);
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
        <p className="font-light mb-4">
          Fill the below form to add a new Salary Slip
        </p>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="manager_id" >
              <FormLabel>Select Employee <RequiredIndicator /></FormLabel>
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
                <Text fontWeight="bold">
                  Position: {selectedEmployeeInfo.position}
                </Text>
                <Text fontWeight="bold">
                  Department: {selectedEmployeeInfo.department}
                </Text>
              </VStack>
            )}

            <div className="flex flex-col md:flex-row gap-3">
              <FormControl id="basicPay" >
                <FormLabel>Basic Pay<RequiredIndicator /></FormLabel>
                <Input
                  name="basicPay"
                  onChange={handleChange}
                  value={projectData.basicPay}
                />
              </FormControl>
              <FormControl id="travelPay" >
                <FormLabel>Travel Pay<RequiredIndicator /></FormLabel>
                <Input
                  name="travelPay"
                  onChange={handleChange}
                  value={projectData.travelPay}
                />
              </FormControl>
              <FormControl id="Bonus" >
                <FormLabel>Bonus<RequiredIndicator /></FormLabel>
                <Input
                  name="bonus"
                  onChange={handleChange}
                  value={projectData.bonus}
                />
              </FormControl>
            </div>
            <div className="flex gap-3">
              <FormControl id="paidLeave" >
                <FormLabel>Paid Leave<RequiredIndicator /></FormLabel>
                <Input
                  name="paidLeave"
                  onChange={handleChange}
                  value={projectData.paidLeave}
                />
              </FormControl>
              <FormControl id="tds" >
                <FormLabel>TDS<RequiredIndicator /></FormLabel>
                <Input
                  name="tds"
                  onChange={handleChange}
                  value={projectData.tds}
                />
              </FormControl>
              <FormControl id="totaleaves" >
                <FormLabel>Total Leaves<RequiredIndicator /></FormLabel>
                <Input
                  name="totalLeaves"
                  onChange={handleChange}
                  value={projectData.totalLeaves}
                />
              </FormControl>
            </div>
            <FormControl id="advanceSalary" maxWidth={400} >
              <FormLabel>Advance Salary<RequiredIndicator /></FormLabel>
              <Input
                name="advanceSalary"
                onChange={handleChange}
                value={projectData.advanceSalary}
              />
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
