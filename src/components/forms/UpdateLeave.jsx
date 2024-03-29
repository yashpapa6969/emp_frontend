import { useState, useEffect, useRef } from "react";
import {
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Select,
  Text,
  Box,
  VStack
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import MyDatePicker from "../common/MyDatePicker";
import { useNavigate } from "react-router-dom";
import { selectLeaveId } from "../../store/slice/LeaveSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

const RequiredIndicator = () => {
  return (
    <Text as="span" color="red.500" ml={1}>
      *
    </Text>
  );
};
const UpdateLeave = () => {
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState(null);
  const navigate = useNavigate();
  const leaveId = useSelector(selectLeaveId);
  const [employee, setEmployee] = useState([]);
  const [projectData, setProjectData] = useState({
    employee_id: "",
    type: "",
    startDate: "",
    endDate: "",
    status: "",
    reason: "",
    createdAt: "",
  });
   
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
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getLeaveById/${leaveId}`
      )
      .then((response) => {

        const leaveData = response.data.data[0];
        // console.log(leaveData.data[0])
        setProjectData((projectData) => ({
          ...projectData,
          employee_id: leaveData?.employee_id || projectData.employee_id,
          type: leaveData?.type || projectData.type,
          startDate: leaveData?.startDate || projectData.startDate,
          endDate: leaveData?.endDate || projectData.endDate,
          status: leaveData?.status || projectData.status,
          reason: leaveData?.reason || projectData.reason,
          createdAt: leaveData?.createdAt || projectData.createdAt,
        }));
        setSelectedEmployeeInfo(leaveData?.employee_id || projectData.employee_id);
        if (projectData.employee_id) {
          const selectedEmployeeId = projectData.employee_id;
          const selectedEmployee = employee.find(
            (manager) => manager.employee_id === selectedEmployeeId
          );
          setSelectedEmployeeInfo(selectedEmployee);
          console.log(selectedEmployeeInfo);
          setProjectData({ ...projectData, employee_id: selectedEmployeeId });
        }
        // setSelectedCountry(clientData.country);
        // setSelectedState(clientData.state);
        // setSelectSourceValue(clientData.source);
        // setSelectedTagValue(clientData.requirement);
      })

      .catch((error) => {
        console.error("Error fetching leave details:", error);
        toast.error("Failed to fetch leave details");
      });
  }, [leaveId, selectedEmployeeInfo]);
  const handleSelectManager = (event) => {
    const selectedEmployeeId = event.target.value;
    const selectedEmployee = employee.find(
      (manager) => manager.employee_id === selectedEmployeeId
    );
    setSelectedEmployeeInfo(selectedEmployee);
    setProjectData({ ...projectData, employee_id: selectedEmployeeId });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    const requestData = projectData;
    const requiredFields = [
      "employee_id",
      "startDate",
      "endDate",
      "createdAt",
      "status",
      "type",
      "reason"
    ];

    for (let field of requiredFields) {
      if (!requestData[field]) {
        toast.error(`${field} is required.`);
        return; // Stop further execution if any required field is missing
      }
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE}/api/admin/updateLeave/${leaveId}`,
        requestData, // Simply pass the request data directly, no need to specify headers and stringify
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        toast.error("failed to update leave");
      }

      toast.success("Leave updated successfully.", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/getAllLeaves");
      }, 2000);
    } catch (error) {
      console.log(error)
      toast.error("Failed to update leave.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const formatDate = (date) => {
    if (!date) return ""; // Handle the case where date is null or undefined
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.toLocaleString("default", { month: "short" });
    const year = formattedDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // const startDateFormatted = projectData.startDate ? moment(projectData.startDate,'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD-MM-YY') : null;
  // console.log(startDateFormatted)
  const startDate = projectData.startDate ? moment(projectData.startDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ') : null;
  const endDate = projectData.endDate ? moment(projectData.endDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ') : null;
  const createdAt = projectData.createdAt ? moment(projectData.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ') : null;
  console.log(startDate)
  return (
    <Box
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      boxShadow="lg"
      m="4"
    >
      <h1 className="text-2xl font-semibold">Update Leave Request</h1>
      <p className="font-light mb-4">
        Fill the below form to update a new Leave Request
      </p>
      <form onSubmit={handleSubmit}>
        {employee.length > 0 && (<VStack spacing={4} align="stretch">
          <FormControl id="manager_id" isRequired>
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
              <Text fontWeight="bold">
                Position: {selectedEmployeeInfo.position}
              </Text>
              <Text fontWeight="bold">
                Department: {selectedEmployeeInfo.department}
              </Text>
            </VStack>
          )}

          <div className="flex flex-col md:flex-row gap-3">
            <FormControl id="type">
              <FormLabel>
                Type
                <RequiredIndicator />{" "}
              </FormLabel>
              <Select
                width={300}
                name="type"
                onChange={handleChange}
                placeholder="Select type"
                value={projectData.type}
              >
                <option value="Annual">Annual</option>
                <option value="Sick">Sick</option>
                <option value="Maternity">Maternity</option>
                <option value="Paternity">Paternity</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <FormControl id="startDate">
              <FormLabel>Start Date <RequiredIndicator /> </FormLabel>
              <MyDatePicker
                className="mb-1"
                selected={projectData.startDate}
                onChange={(date) =>
                  setProjectData({ ...projectData, startDate: date })
                }
                value={startDate}
                format={"DD/MM/YYYY"}
              />
              <br />
              <div>{formatDate(projectData.startDate)}</div>
            </FormControl>
            <FormControl id="endDate">
              <FormLabel>End Date <RequiredIndicator /> </FormLabel>
              <MyDatePicker
                className="mb-1"
                selected={projectData.endDate}
                onChange={(date) =>
                  setProjectData({ ...projectData, endDate: date })
                }
                value={endDate}
                format={"DD/MM/YYYY"}
              />
              <br />
              <div>{formatDate(projectData.endDate)}</div>
            </FormControl>
            <FormControl id="applicationDate">
              <FormLabel>Application Date <RequiredIndicator /> </FormLabel>
              <MyDatePicker
                className="mb-1"
                selected={projectData.createdAt}
                onChange={(date) =>
                  setProjectData({ ...projectData, createdAt: date })
                }
                value={createdAt}
                format={"DD/MM/YYYY"}
              />
              <br />
              <div>{formatDate(projectData.createdAt)}</div>
            </FormControl>
          </div>

          <div className="flex gap-3">
            <FormControl id="status">
              <FormLabel>
                Status
                <RequiredIndicator />{" "}
              </FormLabel>
              <Select
                width={300}
                name="status"
                onChange={handleChange}
                placeholder="Select Status"
                value={projectData.status}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </FormControl>
          </div>

          <div className="flex gap-3">
            <FormControl id="Reason" isRequired>
              <FormLabel>Reason</FormLabel>
              <Input
                name="reason"
                onChange={handleChange}
                value={projectData.reason}
              />
            </FormControl>
          </div>

          <Button mt={6} type="submit" colorScheme="purple">
            Update Leave Request
          </Button>
        </VStack>)}
      </form>
    </Box>
  );
};

export default UpdateLeave;
