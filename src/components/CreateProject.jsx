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
    priority: "",
    startDate: "",
    deadline: "",
    tags: [],
    description: "",
    employees: [],
  });
  const [tags, setTags] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
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
      .get(`${import.meta.env.VITE_API_BASE}/api/admin/getAllTags`)
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });

    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/admin/getAllClients`)
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });

    fetch(`${import.meta.env.VITE_API_BASE}/api/admin/getAllEmployees`)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };
  const handleStartDateChange = (date) => {
    setProjectData({ ...projectData, startDate: date });
  };
  const handleEndDateChange = (date) => {
    setProjectData({ ...projectData, deadline: date });
  };
  const handleClientChange = (e) => {
    const clientId = e.target.value;
    const selectedClient = clients.find(
      (client) => client.client_id === clientId
    );
    setSelectedClient(selectedClient);

    setProjectData({
      ...projectData,
      client_id: clientId,
      brandName: selectedClient.brandName,
    });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
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
    const selectedIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setProjectData({
      ...projectData,
      employees: [...projectData.employees, ...selectedIds],
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
        `${import.meta.env.VITE_API_BASE}/api/admin/createProject`,
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
          toast.success(response.data.message);
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
        <p className="font-light mb-4">
          Fill the below form to add a new project
        </p>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="projectName" isRequired>
              <FormLabel>Project Name</FormLabel>
              <Input name="projectName" onChange={handleChange} />
            </FormControl>
            <FormControl id="client_id" isRequired>
              <FormLabel>Brand Name</FormLabel>
              <Select
                onChange={handleClientChange}
                size="md"
                placeholder="Select Brand"
                isRequired
              >
                {clients.map((client) => (
                  <option key={client.client_id} value={client.client_id}>
                    {client.brandName}
                  </option>
                ))}
              </Select>
            </FormControl>
            {selectedClient && (
              <>
                <FormLabel>Client Name:-{selectedClient.clientName}</FormLabel>
                <FormLabel>
                  Client Company:-{selectedClient.companyName}
                </FormLabel>
              </>
            )}

            <FormControl id="priority" isRequired>
              <FormLabel>Priority</FormLabel>
              <Select
                name="priority"
                onChange={handleChange}
                placeholder="Select priority"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FormControl>

            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Input name="description" onChange={handleChange} />
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
                selected={projectData.deadline}
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
                  <option key={tag._id} value={tag.tag_id}>
                    {tag.tagName}
                  </option>
                ))}
              </Select>
              {projectData.tags.map((tag) => (
                <Tag
                  key={tag._id}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                >
                  <TagLabel>{getTagNameById(tag)}</TagLabel>
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
                  <option key={employee._id} value={employee.employee_id}>
                    {employee.name}
                  </option>
                ))}
              </Select>
              {projectData.employees.map((tag) => (
                <Tag
                  key={tag._id}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                >
                  <TagLabel>{getEmployeeNameById(tag)}</TagLabel>
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
