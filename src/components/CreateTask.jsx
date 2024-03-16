import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MyDatePicker from "./common/MyDatePicker";
import { toast } from "react-toastify";
import { convertDateFormatString } from "../helpers";


const CreateTask = () => {
  const [brandNames, setBrandNames] = useState([]);
  const [selectedBrandName, setSelectedBrandName] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    // Fetch brand names
    axios
      .get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllClients`
      )
      .then((response) => {
        setBrandNames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brand names:", error);
      });
  }, []);

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrandName(selectedBrand);

    axios
      .post(
        `${import.meta.env.VITE_API_BASE}/api/admin/getProjectsByBrandName`,
        { brandName: selectedBrand }
      )
      .then((response) => {
        setProjects(response.data);

      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        toast.error(error.response.data.message);
      });

  };

  const handleProjectChange = (event) => {
    const selectedProjectId = event.target.value;
    setSelectedProject(selectedProjectId);

    // Find the selected project
    const selectedProject = projects.find(
      (project) => project.project_id === selectedProjectId
    );

    // Log selectedProject


    // Fetch employees based on the selected project's employee IDs
    const employeeIds = selectedProject.employees;
    setEmployees(employeeIds);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Make API call to post task data
    const taskData = {
      brandName: selectedBrandName,
      project_id: selectedProject,
      employee_id: selectedEmployee,
      client_id: getClientId(selectedBrandName),
      description: description,
      startDate: startDate,
      deadline: deadline,
      priority: priority,
    };
    axios
      .post(
        `${import.meta.env.VITE_API_BASE}/api/admin/addTask`,
        taskData
      )
      .then((response) => {
        console.log("Task added successfully:", response.data);
        // Clear form fields after successful submission
        setSelectedBrandName("");
        setSelectedProject("");
        setSelectedEmployee("");
        setDescription("");
        setStartDate("");
        setDeadline("");
        setStatus("");
        setPriority("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const getClientId = (brandName) => {
    const brand = brandNames.find((brand) => brand.brandName === brandName);
    return brand ? brand.client_id : "";
  };

  return (
    <Box
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      boxShadow="lg"
      m="4"
    >
      <h1 className="text-2xl font-semibold">Add Task</h1>
      <p className="font-light mb-4">Fill the below form to add a new task</p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <FormControl isRequired>
            <FormLabel>Brand Name</FormLabel>
            <Select value={selectedBrandName} onChange={handleBrandChange}>
              <option disabled value="">
                Select Brand
              </option>
              {brandNames.map((brand) => (
                <option key={brand._id} value={brand.brandName}>
                  {brand.brandName}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Project</FormLabel>
            <Select value={selectedProject} onChange={handleProjectChange}>
              <option disabled value="">
                Select Project
              </option>
              {projects.map((project) => (
                <option key={project.project_id} value={project.project_id}>
                  {project.projectName}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Employee</FormLabel>
            <Select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option disabled value="">
                Select Employee
              </option>
              {employees.map((employeeId) => (
                <option key={employeeId._id} value={employeeId._id}>
                  {employeeId.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <div className="flex gap-3 my-3">
          <FormControl isRequired>
            <FormLabel>Priority</FormLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="2">High</option>
              <option value="1">Medium</option>
              <option value="0">Low</option>
            </Select>
          </FormControl>
          <FormControl maxWidth={200} isRequired>
            <FormLabel>Start Date</FormLabel>
            <MyDatePicker
              className="mb-1"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              format={"DD/MM/YYYY"}
              placeholderText="Pick Date"
            />
            <br />
            {startDate && <p>{convertDateFormatString(startDate)}</p>}
          </FormControl>

          <FormControl maxWidth={200} isRequired>
            <FormLabel>Deadline</FormLabel>
            <MyDatePicker
              className="mb-1"
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              format={"DD/MM/YYYY"}
              placeholderText="Pick Date"
            />
            <br />
            {deadline && <p>{convertDateFormatString(deadline)}</p>}
          </FormControl>
        </div>

        <Button mt={4} width={"full"} colorScheme="purple" type="submit">
          Add Task
        </Button>
      </form>
    </Box>
  );
};

export default CreateTask;