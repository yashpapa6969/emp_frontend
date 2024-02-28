import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";


const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    client_id: "",
    progress: "",
    billingType: "",
    status: "",
    totalRate: "",
    estimatedHours: "",
    startDate: "",
    endDate: "",
    tags: [],
    description: "",
    employees: [],
  });
  const [tags, setTags] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllTags"
      )
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });

    axios
      .get(
        "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllClients"
      )
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });

    fetch(
      "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllEmployees"
    )
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };
  const handleStartDateChange = (date) => {
    setProjectData({ ...projectData, startDate: date });
  };
  const handleEndDateChange = (date) => {
    setProjectData({ ...projectData, endDate: date });
  };
  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setProjectData({ ...projectData, client_id: clientId });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => ({
      id: option.value,
      tagName: option.label,
    }));
    setProjectData({
      ...projectData,
      tags: [...projectData.tags, ...selectedTags],
    });
  };
  const removeTagById = (tagToRemove) => {
    setProjectData({
      ...projectData,
      tags: projectData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleEmployeeChange = (e) => {
    const selectedEmployees = Array.from(e.target.selectedOptions, (option) => ({
      id: option.value,
      employeeName: option.label,
    }));
    setProjectData({
      ...projectData,
      employees: [...projectData.employees, ...selectedEmployees],
    });
  };

  const removeEmployeeById = (employeeIdToRemove) => {
    setProjectData({
      ...projectData,
      employees: projectData.employees.filter(
        (employeeId) => employeeId !== employeeIdToRemove
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/createProject",
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          console.error("Failed to create project");
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(error.response.data.message);
        console.log(error);
        toast.error(error.response.data.message);
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
        <h1 className="text-2xl font-semibold">Add Project</h1>
        <p className="font-light mb-4">Fill the below form to add a new project</p>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="projectName" isRequired>
              <FormLabel>Project Name</FormLabel>
              <Input name="projectName" onChange={handleChange} />
            </FormControl>
            <FormControl id="client_id" isRequired>
              <FormLabel>Client Name</FormLabel>
              <Select
                onChange={handleClientChange}
                size="md"
                placeholder="Select client"
                isRequired
              >
                {clients.map((client) => (
                  <option key={client.client_id} value={client.client_id}>
                    {client.clientName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="progress" isRequired>
              <FormLabel>Progress</FormLabel>
              <Input name="progress" onChange={handleChange} />
            </FormControl>
            <FormControl id="billingType" isRequired>
              <FormLabel>Billing Type</FormLabel>
              <Input name="billingType" onChange={handleChange} />
            </FormControl>
            <FormControl id="status" isRequired>
              <FormLabel>Status</FormLabel>
              <Input name="status" onChange={handleChange} />
            </FormControl>
            <FormControl id="totalRate" isRequired>
              <FormLabel>Total Rate</FormLabel>
              <Input name="totalRate" onChange={handleChange} />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Input name="description" onChange={handleChange} />
            </FormControl>
            <FormControl id="estimatedHours" isRequired>
              <FormLabel>Estimated Hours</FormLabel>
              <Input name="estimatedHours" onChange={handleChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Start Date</FormLabel>
              <DatePicker
                selected={projectData.startDate}
                onChange={handleStartDateChange}
                dateFormat="MM/dd/yyyy"
                placeholderText="Pick Date"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>End Date</FormLabel>
              <DatePicker
                selected={projectData.endDate}
                onChange={handleEndDateChange}
                dateFormat="MM/dd/yyyy"
                placeholderText="Pick Date"
              />
            </FormControl>
            <FormControl id="tags" isRequired>
              <FormLabel>Tags</FormLabel>
              <Select
                onChange={handleTagChange}
                size="md"
                placeholder="Select tags"
                isRequired
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag.tagName}
                  </option>
                ))}
              </Select>
              {projectData.tags.map((tag) => (
                <Tag
                  key={tag.id}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                >
                  <TagLabel>{tag.tagName}</TagLabel>
                  <TagCloseButton onClick={() => removeTagById(tag)} />
                </Tag>
              ))}
            </FormControl>
            <FormControl id="employees" isRequired>
              <FormLabel>Employees</FormLabel>
              <Select
                onChange={handleEmployeeChange}
                size="md"
                placeholder="Select employees"
                isRequired
              >
                {employees.map((employee) => (
                  <option
                    key={employee}
                    value={employee}
                  >
                    {employee.name}
                  </option>
                ))}
              </Select>
              {projectData.employees.map((tag) => (
                <Tag
                  key={tag.id}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                >
                  <TagLabel>{tag.employeeName}</TagLabel>
                  <TagCloseButton onClick={() => removeEmployeeById(tag)} />
                </Tag>
              ))}
            </FormControl>
            <Button type="submit" colorScheme="purple">
              Create Project
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default CreateProject;
