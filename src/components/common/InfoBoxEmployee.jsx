import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployeeIds,clearEmployeeIds } from "../../store/slice/EmployeeSlice";

const InfoBoxEmployee = () => {
  const employeeIds = useSelector(selectEmployeeIds);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (employeeIds.length > 0) {
        try {
          const requests = employeeIds.map(async (employeeId) => {
            const response = await fetch(
              `${
                import.meta.env.VITE_API_BASE
              }/api/admin/getEmployeeByID/${employeeId}`
            );
            return response.json();
          });
          const employeeData = await Promise.all(requests);
          setEmployeeDetails(employeeData);
          dispatch(clearEmployeeIds()); // Clear the employee IDs after fetching data
        } catch (error) {
          console.error("Error fetching employee details:", error);
        }
      }
    };

    fetchEmployeeDetails();
  }, [employeeIds, dispatch]);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      {employeeDetails.length > 0 ? (
        <>
          {employeeDetails.map((employee, index) => (
            <Box key={index} mb="4">
              <Text fontWeight="bold">Employee ID: {employee.employee_id}</Text>
              {employee.guardianDetails && (
                <Box mt="2">
                  <Text fontWeight="bold">Guardian Details:</Text>
                  <Text>
                    Guardian Name: {employee.guardianDetails.guardianName}
                  </Text>
                  <Text>
                    Guardian Contact No:{" "}
                    {employee.guardianDetails.guardianContactNo}
                  </Text>
                </Box>
              )}
              {employee.bankDetails && (
                <Box mt="2">
                  <Text fontWeight="bold">Bank Details:</Text>
                  <Text>Bank Name: {employee.bankDetails.bankName}</Text>
                  <Text>
                    Bank Account No: {employee.bankDetails.bankAccountNo}
                  </Text>
                  <Text>
                    Bank IFSC Code: {employee.bankDetails.bankIfscCode}
                  </Text>
                  <Text>Type: {employee.bankDetails.type}</Text>
                </Box>
              )}
              <Box mt="2">
                <Text fontWeight="bold">Employee Details:</Text>
                <Text>Name: {employee.name}</Text>
                <Text>Gender: {employee.gender}</Text>
                <Text>Contact No: {employee.contactNo}</Text>
                <Text>Type: {employee.type}</Text>
                <Text>DOB: {employee.dob}</Text>
                <Text>Position: {employee.position}</Text>
                <Text>Department: {employee.department}</Text>
                <Text>Designation: {employee.designation}</Text>
                <Text>Manager ID: {employee.manager_id}</Text>
                <Text>Email: {employee.email}</Text>
                <Text>Joining Date: {employee.joiningDate}</Text>
                <Text>Probation Period: {employee.probationPeriod}</Text>
                <Text>Leaving Date: {employee.leavingDate}</Text>
                <Text>Aadhar Number: {employee.aadharNumber}</Text>
                <Text>PAN Number: {employee.panNumber}</Text>
                <Text>Permanent Address: {employee.permanentAddress}</Text>
                <Text>
                  Correspondence Address: {employee.correspondenceAddress}
                </Text>
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <Text>No employee details available</Text>
      )}
    </Box>
  );
};

export default InfoBoxEmployee;
