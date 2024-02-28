import { useState, useEffect } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Flex
} from "@chakra-ui/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEmp = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: null,
    position: "",
    department: "",
    email: "",
    password: "",
    joiningDate: "",
    manager_id: "",
  });
  const [departments, setDepartments] = useState([
    "IT",
    "Finance",
    "Marketing",
    "Human Resources",
    "Operations",
  ]);
  const [positions, setPositions] = useState([
    "superadmin",
    "admin",
    "user",
    "manager"
  ]);
  const [managers, setManagers] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(false);

  useEffect(() => {
    if (formData.department !== "") {
      setLoadingManagers(true);
      axios
        .get(
          `${
            import.meta.env.VITE_API_BASE
          }/api/admin/getAllManagersbyDepartment/${formData.department}`
        )

        .then((response) => {
          if (response.data.length === 0) {
            setManagers([]);
          }
          setManagers(response.data);
          setLoadingManagers(false);
        })
        .catch((error) => {
          console.error("Error fetching managers:", error);
          setManagers([]);
          setLoadingManagers(false);
        });
    }
  }, [formData.department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };
  const handleJoiningDateChange = (date) => {
    setFormData({ ...formData, joiningDate: date });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_API_BASE}/api/admin/createEmployee`,
        formData
      )
      .then((response) => {
        toast.success(response.data.message, {
        });

      })
      .catch((error) => {
        console.error("Error creating employee:", error);
        toast.error(error.response.data.message);
      });
  };




  return (
    <>
      <ToastContainer></ToastContainer>
      <Box
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        p="4"
        boxShadow="lg"
        m="4"
      >
        <h1 className="text-2xl font-semibold">Add Employee</h1>
        <p className="font-light mb-4">Fill the below form to add a new employee</p>
        
        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Date of Birth</FormLabel>
            <DatePicker
              selected={formData.dob}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              placeholderText="Pick Date"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Position</FormLabel>
            <Select
              name="position"
              value={formData.position}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Select position
              </option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Department</FormLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select an option
              </option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Joining Date</FormLabel>
            <DatePicker
              selected={formData.joiningDate}
              onChange={handleJoiningDateChange}
              dateFormat="MM/dd/yyyy"
              placeholderText="Pick Date"
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Manager</FormLabel>
            <Select
              name="manager_id"
              value={formData.manager_id}
              onChange={handleChange}
              disabled={loadingManagers}
            >
              {loadingManagers ? (
                <option value="" disabled>
                  Loading...
                </option>
              ) : (
                <>
                  {managers.length === 0 && (
                    <option value="" disabled>
                      No Manager Available
                    </option>
                  )}
                  {managers.length > 0 && (
                    <option value="" disabled>
                      Select an option
                    </option>
                  )}
                  {managers.map((manager) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.name}
                    </option>
                  ))}
                </>
              )}
            </Select>
          </FormControl>
          <Flex justify="center">
            <Button type="submit" colorScheme="purple">
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default CreateEmp;
