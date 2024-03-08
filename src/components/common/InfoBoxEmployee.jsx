import { Box, Card, CardBody, Divider, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployeeIds, clearEmployeeIds } from "../../store/slice/EmployeeSlice";

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
              `${import.meta.env.VITE_API_BASE
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
    <Box overflow="hidden" p="4">
      {employeeDetails.length > 0 ? (
        <>
          {employeeDetails.map((employee, index) => (
            <div key={`${employee._id}-${index}`} className="w-full flex flex-col gap-3 mt-6 rounded-xl shadow-md p-4">
              <div className="w-[40px] h-[40px] flex items-center justify-center bg-purple-500 rounded-full text-white">{index+1}</div>
              <div className="flex gap-3 w-full">
                {employee.name && (<Card bg={"purple.100"} className="w-1/3">
                  <CardBody>
                    <Heading pb={4} size='xs'>
                      Name:
                    </Heading>
                    <Text fontSize={28} textTransform={"capitalize"}>{employee.name}</Text>
                  </CardBody>
                </Card>)}
                {employee.position && (<Card className="w-1/3">
                  <CardBody>
                    <Heading pb={4} size='xs'>
                      Position:
                    </Heading>
                    <Divider mb={5} />
                    <Text fontSize={18} textTransform={"capitalize"}>{employee.position}</Text>
                  </CardBody>
                </Card>)}
                {employee.department && (<Card className="w-1/3">
                  <CardBody>
                    <Heading pb={4} size='xs'>
                      Department:
                    </Heading>
                    <Divider mb={5} />
                    <Text fontSize={18} textTransform={"capitalize"}>{employee.department}</Text>
                  </CardBody>
                </Card>)}
              </div>
              <div className="flex flex-col md:flex-row gap-3 w-full mt-4">
                {employee.dob && (<Card className="md:w-1/3 w-full">
                  <CardBody>
                    <Heading pb={4} size='xs'>
                      Date of Birth:
                    </Heading>
                    <Divider mb={5} />
                    <Text fontSize={18} textTransform={"capitalize"}>{employee.dob}</Text>
                  </CardBody>
                </Card>)}
                {employee.joiningDate && (<Card className="md:w-1/3 w-full">
                  <CardBody>
                    <Heading pb={4} size='xs'>
                      Joining Date:
                    </Heading>
                    <Divider mb={5} />
                    <Text fontSize={18} textTransform={"capitalize"}>{employee.joiningDate}</Text>
                  </CardBody>
                </Card>)}
                {employee.email && (<Card className="md:w-1/3 w-full">
                  <CardBody>
                    <Heading pb={4} size='xs'>
                      Email:
                    </Heading>
                    <Divider mb={5} />
                    <Text fontSize={18} textTransform={"capitalize"}>{employee.email}</Text>
                  </CardBody>
                </Card>)}
              </div>
            </div>
          ))}
        </>) : (
        <Text>No client details available</Text>
      )}
    </Box>
  );
};

export default InfoBoxEmployee;
