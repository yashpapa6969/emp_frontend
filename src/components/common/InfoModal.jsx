import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployeeId } from "../../store/slice/EmployeeSlice";
import { setClientId } from "../../store/slice/ClientSlice";
import { setProjectId } from "../../store/slice/ProjectSlice";
import {
  setEmployeeId,
} from "../../store/slice/EmployeeSlice";
import { useEffect } from "react";

const InfoModal = ({ modalFor, data, onClose, isOpen }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalFor === "project" && data?.employees) {
      const employeeIds = data.employees;
      employeeIds.forEach((id) => {
        dispatch(addEmployeeId(id));
      });
      console.log(employeeIds);
    }
    if (modalFor === "slip" && data?.employee_id) {
      const employeeId = data.employee_id;
      dispatch(setEmployeeId(employeeId));
    }
    if (modalFor === "invoice" && data?.client_id) {
      const clientId = data.client_id;
      dispatch(setClientId(clientId));
    }
    if (modalFor === "task" && data?.employee_id) {
      const employeeId = data.employee_id;
      const p = data.project_id;
      const c = data.client_id;
      dispatch(setEmployeeId(employeeId));
      dispatch(setClientId(c));
      dispatch(setProjectId(p));
    }

    if (modalFor === "project" && data && data.client_id) {
      const clientId = data.client_id;
      dispatch(setClientId(clientId));
    }
  }, [modalFor, data, dispatch]);

  if (modalFor === "manager")
    return (
      <Modal
        size={"6xl"}
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manager Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <div>
                <Text fontWeight="bold">Name: </Text>
                <Text>{data.name}</Text>
                <Text fontWeight="bold">Email: </Text>
                <Text>{data.email}</Text>
                <Text fontWeight="bold">Position: </Text>
                <Text>{data.position}</Text>
                <Text fontWeight="bold">Department: </Text>
                <Text>{data.department}</Text>
                <Text fontWeight="bold">Date Of Birth: </Text>
                <Text>{data.dob}</Text>
                <Text fontWeight="bold">Joining Date: </Text>
                <Text>{data.joiningDate}</Text>
                <Text fontWeight="bold">Employee ID: </Text>
                <Text>{data.employee_id}</Text>
                <Text fontWeight="bold">Manager ID: </Text>
                <Text>{data.manager_id}</Text>
                <Text fontWeight="bold">Permissions:</Text>
                {data?.permissions && data.permissions.length > 0 ? (
                  data.permissions.map((permission, index) => (
                    <Text key={index}>{permission}</Text>
                  ))
                ) : (
                  <Text color="red">No permissions</Text>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );

  if (modalFor === "employee")
    return (
      <Modal
        size={"6xl"}
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <div>
                <Text>
                  <b>Id: </b> {data.manager_id}
                </Text>
                {data.probationPeriod && (
                  <Text>
                    <b>Probation period: </b> {data.probationPeriod}
                  </Text>
                )}
                {data.leavingDate && (
                  <Text>
                    <b>Leaving date: </b> {data.leavingDate}
                  </Text>
                )}
                <h1 className="mt-3 text-xl font-semibold mb-2 text-gray-500">
                  Personal Information
                </h1>
                <div className="flex flex-col md:flex-row justify-between">
                  <Text>
                    <b>Name: </b> {data.title} {data.name}
                  </Text>
                  {data.gender && (
                    <Text>
                      <b>Gender: </b> {data.gender}
                    </Text>
                  )}
                  {data.dob && (
                    <Text>
                      <b>DOB: </b> {data.dob}
                    </Text>
                  )}
                  {data.joiningDate && (
                    <Text>
                      <b>Joining date: </b> {data.joiningDate}
                    </Text>
                  )}
                </div>
                <div className="flex flex-col md:flex-row md:gap-[100px]">
                  {data.aadharNumber && (
                    <Text>
                      <b>Aadhar no.: </b> {data.aadharNumber}
                    </Text>
                  )}
                  {data.panNumber && (
                    <Text>
                      <b>Pan no.: </b> {data.panNumber}
                    </Text>
                  )}
                </div>
                <Text fontWeight="bold">Guardian details: </Text>
                {data?.guardianDetails &&
                  data.guardianDetails.map &&
                  data.guardianDetails.map((item, index) => (
                    <div key={index}>
                      {item.guardianName && (
                        <Text>Name: {item.guardianName}</Text>
                      )}
                      {item.guardianContactNo && (
                        <Text>Contact: {item.guardianContactNo}</Text>
                      )}
                    </div>
                  ))}
                <h1 className="mt-4 text-xl font-semibold mb-2 text-gray-500">
                  Position details
                </h1>
                <div className="flex max-w-[700px] flex-col md:flex-row justify-between">
                  {data.position && (
                    <Text>
                      <b>Position: </b> {data.position}
                    </Text>
                  )}
                  {data.designation && (
                    <Text>
                      <b>Designation: </b> {data.designation}
                    </Text>
                  )}
                  {data.department && (
                    <Text>
                      <b>Department: </b> {data.department}
                    </Text>
                  )}
                </div>
                <h1 className="mt-4 text-xl font-semibold mb-2 text-gray-500">
                  Contact details
                </h1>
                <div>
                  {data.permanentAddress && (
                    <Text fontWeight="bold">Permanent Address: </Text>
                  )}
                  {data.permanentAddress && (
                    <Text>{data.permanentAddress}</Text>
                  )}
                  {data.correspondenceAddress && (
                    <Text fontWeight="bold">Corespondance Address: </Text>
                  )}
                  {data.correspondenceAddress && (
                    <Text>{data.correspondenceAddress}</Text>
                  )}
                  {data.email && (
                    <Text>
                      <b>Email: </b> {data.email}
                    </Text>
                  )}
                  {data.contactNo && (
                    <Text>
                      <b>Contact no.: </b> {data.contactNo}
                    </Text>
                  )}
                </div>
                <h1 className="mt-4 text-xl font-semibold mb-2 text-gray-500">
                  Permissions
                </h1>
                {data?.permissions && data.permissions.length > 0 ? (
                  data.permissions.map((permission, index) => (
                    <Text key={index}>{permission}</Text>
                  ))
                ) : (
                  <Text color="red">No permissions</Text>
                )}
                <h1 className="mt-4 text-xl font-semibold mb-2 text-slate-600">
                  Bank details
                </h1>
                {data?.bankDetails && data.bankDetails.length > 0 ? (
                  data.bankDetails.map((bd, index) => (
                    <Text key={index}>{bd}</Text>
                  ))
                ) : (
                  <Text color="red">No permissions</Text>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );

  if (modalFor === "client")
    return (
      <Modal
        size={"6xl"}
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Client Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <div>
                <Text>
                  <b>Client Anniversary: </b>{" "}
                  {data.clientAnniversary || "Not defined"}
                </Text>
                <Text>
                  <b>Company Anniversary: </b>{" "}
                  {data.companyAnniversary || "Not defined"}
                </Text>
                <div className="flex my-3 flex-col md:flex-row justify-between">
                  <Text>
                    <b>Name: </b> {data.clientName || "Not defined"}
                  </Text>
                  <Text>
                    <b>Birthday: </b> {data.clientBirthday || "Not defined"}
                  </Text>
                  <Text>
                    <b>Work start date: </b>{" "}
                    {data.workStartDate || "Not defined"}
                  </Text>
                </div>
                <Text fontWeight="bold">Brand Name: </Text>
                <Text>{data.brandName}</Text>
                <Text fontWeight="bold">Company Name: </Text>
                <Text>{data.companyName}</Text>
                <Text fontWeight="bold">Email1: </Text>
                <Text>{data.email1}</Text>
                <Text fontWeight="bold">Email2: </Text>
                <Text>{data.email2}</Text>
                <Text fontWeight="bold">Phone1: </Text>
                <Text>{data.phone1}</Text>
                <Text fontWeight="bold">Phone2: </Text>
                <Text>{data.phone2}</Text>
                <Text fontWeight="bold">Enquiry Date: </Text>
                <Text>{data.enquiryDate}</Text>
                <Text fontWeight="bold">Website: </Text>
                <Text>{data.website}</Text>
                <Text fontWeight="bold">Business Address: </Text>
                <Text>{data.buisnessAddress}</Text>
                <Text fontWeight="bold">City: </Text>
                <Text>{data.city}</Text>
                <Text fontWeight="bold">State: </Text>
                <Text>{data.state}</Text>
                <Text fontWeight="bold">Pincode: </Text>
                <Text>{data.pincode}</Text>
                <Text fontWeight="bold">Country: </Text>
                <Text>{data.country}</Text>
                <Text fontWeight="bold">Requirement: </Text>
                <Text>{data.requirement}</Text>
                <Text fontWeight="bold">Additional Information: </Text>
                <Text>{data.additionalInformation}</Text>
                <Text fontWeight="bold">Client ID: </Text>
                <Text>{data.client_id}</Text>

                {Array.isArray(data.multipleFiles) &&
                data.multipleFiles.length > 0 ? (
                  <div>
                    <Text fontWeight="bold">Files Provided: </Text>
                    {data.multipleFiles.map((file, index) => (
                      <div key={index}>
                        <Button
                          as="a"
                          href={`${import.meta.env.VITE_API_BASE}/uploads/${
                            file.split("/")[4]
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          textDecoration="none"
                          _hover={{ textDecoration: "none" }}
                          display="inline-block"
                          mr={2}
                          mb={2}
                          variant="solid"
                        >
                          View File {index + 1}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Text fontWeight="bold">No files provided</Text>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  if (modalFor === "project") {
    return (
      <Modal
        size={"6xl"}
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        {data && ( // Check if data exists
          <ModalContent>
            <ModalHeader>Project Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <Text fontWeight="bold">Client Details: </Text>
                <Link to={`/GetClient`}>
                  <Button>Get Client details</Button>
                </Link>

                {data.projectName && ( // Check if projectName exists
                  <>
                    <Text fontWeight="bold">Project Name: </Text>
                    <Text>{data.projectName}</Text>
                  </>
                )}
                {data.brandName && ( // Check if brandName exists
                  <>
                    <Text fontWeight="bold">Brand Name: </Text>
                    <Text>{data.brandName}</Text>
                  </>
                )}
                {data.priority && ( // Check if priority exists
                  <>
                    <Text fontWeight="bold">Priority: </Text>
                    <Text>{data.priority}</Text>
                  </>
                )}
                {data.startDate && ( // Check if startDate exists
                  <>
                    <Text fontWeight="bold">Start Date: </Text>
                    <Text>{data.startDate}</Text>
                  </>
                )}
                {data.deadline && ( // Check if deadline exists
                  <>
                    <Text fontWeight="bold">End Date: </Text>
                    <Text>{data.deadline}</Text>
                  </>
                )}
                {data.tags &&
                  data.tags.length > 0 && ( // Check if tags exist and have length greater than 0
                    <>
                      <Text fontWeight="bold">Tags: </Text>
                      {data.tags.map((tag, index) => (
                        <Text key={index}>{tag.tagName}</Text>
                      ))}
                    </>
                  )}
                {data.project_id && ( // Check if project_id exists
                  <>
                    <Text fontWeight="bold">Project ID: </Text>
                    <Text>{data.project_id}</Text>
                  </>
                )}
                {data.description && ( // Check if description exists
                  <>
                    <Text fontWeight="bold">Description: </Text>
                    <Text>{data.description}</Text>
                  </>
                )}
              </div>
              <Text fontWeight="bold">Emp Details: </Text>
              <Link to={`/GetEmp`}>
                <Button>Get Emp details</Button>
              </Link>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    );
  }

  if (modalFor === "invoice") {
    return (
      <Modal
        size={"6xl"}
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invoice Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <div>
                <Text>{data.client_id}</Text>
                <Text fontWeight="bold">Gst: </Text>
                <Text>{data.gst}</Text>
                <Text fontWeight="bold">Invoice Id: </Text>
                <Text>{data.invoive_id}</Text>
                <Text fontWeight="bold">Client ID: </Text>
                <Link to={`/GetClient`}>
                  <Button>Get Client details</Button>
                </Link>

                <Text fontWeight="bold">Date </Text>
                <Text>{data.date1}</Text>
                <Text fontWeight="bold">Time </Text>
                <Text>{data.time1}</Text>

                <Text fontWeight="bold">Services </Text>

                {data.services.map((service, index) => (
                  <div key={index}>
                    <Text fontWeight="bold">Invoice: </Text>
                    <Text>{service.product}</Text>
                    <Text fontWeight="bold">Description: </Text>
                    <Text>{service.serviceDescription}</Text>
                    <Text fontWeight="bold">Duration: </Text>
                    <Text>{service.duration}</Text>
                    <Text fontWeight="bold">Quantity: </Text>
                    <Text>{service.quantity}</Text>
                    <Text fontWeight="bold">Unit Price: </Text>
                    <Text>{service.unitPrice}</Text>
                    <Text fontWeight="bold">Start Date: </Text>
                    <Text>{service.startDate}</Text>
                    <Text fontWeight="bold">End Date: </Text>
                    <Text>{service.endDate}</Text>
                  </div>
                ))}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  if (modalFor === "lead")
    return (
      <Modal
        size={"6xl"}
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lead Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <div>
                <Text fontWeight="bold">Enquiry Date: </Text>
                <Text>{data.enquiryDate}</Text>
                <Text fontWeight="bold">Company Name: </Text>
                <Text>{data.companyName}</Text>
                <Text fontWeight="bold">Gender: </Text>
                <Text>{data.gender}</Text>
                <Text fontWeight="bold">Title: </Text>
                <Text>{data.title}</Text>
                <Text fontWeight="bold">Brand Name: </Text>
                <Text>{data.brandName}</Text>
                <Text fontWeight="bold">Client Name: </Text>
                <Text>{data.clientName}</Text>
                <Text fontWeight="bold">Phone Number 1: </Text>
                <Text>{data.phone1}</Text>
                <Text fontWeight="bold">Phone Number 2: </Text>
                <Text>{data.phone2}</Text>
                <Text fontWeight="bold">Email 1: </Text>
                <Text>{data.email1}</Text>
                <Text fontWeight="bold">Email 2: </Text>
                <Text>{data.email2}</Text>
                <Text fontWeight="bold">Status: </Text>
                <Text>{data.status}</Text>
                <Text fontWeight="bold">Business Address: </Text>
                <Text>{data.businessAddress}</Text>
                <Text fontWeight="bold">Billing Address: </Text>
                <Text>{data.billingAddress}</Text>
                <Text fontWeight="bold">City: </Text>
                <Text>{data.city}</Text>
                {data.state && (
                  <div>
                    <Text fontWeight="bold">State: </Text>
                    <Text>{data.state}</Text>
                  </div>
                )}
                <Text fontWeight="bold">Pincode: </Text>
                <Text>{data.pincode}</Text>
                <Text fontWeight="bold">Country: </Text>
                <Text>{data.country}</Text>
                <Text fontWeight="bold">Additional Information: </Text>
                <Text>{data.additionalInformation}</Text>
                <Text fontWeight="bold">Requirements: </Text>
                <ul>
                  {data.requirement.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                {data.singleFile && (
                  <div>
                    <Text fontWeight="bold">Single File: </Text>
                    <Button
                      as="a"
                      href={`${import.meta.env.VITE_API_BASE}/uploads/${
                        data.singleFile.split("/")[4]
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                      mb={2}
                      variant="solid"
                    >
                      View Single File
                    </Button>
                  </div>
                )}
                {Array.isArray(data.multipleFiles) &&
                data.multipleFiles.length > 0 ? (
                  <div>
                    <Text fontWeight="bold">Files Provided: </Text>
                    {data.multipleFiles.map((file, index) => (
                      <div key={index}>
                        <Button
                          as="a"
                          href={`${import.meta.env.VITE_API_BASE}/uploads/${
                            file.split("/")[4]
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          textDecoration="none"
                          _hover={{ textDecoration: "none" }}
                          display="inline-block"
                          mr={2}
                          mb={2}
                          variant="solid"
                        >
                          View File {index + 1}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Text fontWeight="bold">No files provided</Text>
                )}

                <Text fontWeight="bold">Lead ID: </Text>
                <Text>{data.lead_id}</Text>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  if (modalFor === "task")
    return (
      <Modal
        size={"6xl"}
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <div>
                <Text fontWeight="bold">BrandName </Text>
                <Text>{data.brandName}</Text>
                <Text fontWeight="bold">Project: </Text>
                <Link to={`/GetProject`}>
                  <Button>Get Project details</Button>
                </Link>
                <Text fontWeight="bold">Employee: </Text>
                <Link to={`/GetEmp`}>
                  <Button>Get EMP details</Button>
                </Link>
                <Text fontWeight="bold">Client: </Text>
                <Link to={`/GetClient`}>
                  <Button>Get Client details</Button>
                </Link>
                <Text fontWeight="bold">Priority </Text>
                <Text>{data.priority}</Text>
                <Text fontWeight="bold">Status: </Text>
                <Text>{data.status}</Text>
                <Text fontWeight="bold">Start Date: </Text>
                <Text>{data.startDate}</Text>
                <Text fontWeight="bold">Deadline: </Text>
                <Text>{data.deadline}</Text>
                <Text fontWeight="bold">Description: </Text>
                <Text>{data.description}</Text>
                <Text fontWeight="bold">Task ID: </Text>
                <Text>{data.task_id}</Text>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  if (modalFor === "slip") {
    return (
      <Modal
        size={"6xl"}
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Slip Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <div>
                <Text fontWeight="bold">Employee:</Text>

                <Link to={`/GetEmp`}>
                  <Button>Get EMP details</Button>
                </Link>
                <Text fontWeight="bold">Slip History of Employee:</Text>

                <Link to={`/GetEmpSlip`}>
                  <Button>Get Slip details</Button>
                </Link>
                <Text fontWeight="bold">Basic Pay: </Text>
                <Text>{data.basicPay}</Text>
                <Text fontWeight="bold">Travel Pay: </Text>
                <Text>{data.travelPay}</Text>
                <Text fontWeight="bold">Bonus: </Text>
                <Text>{data.bonus}</Text>
                <Text fontWeight="bold">Paid Leave: </Text>
                <Text>{data.paidLeave}</Text>
                <Text fontWeight="bold">Total Income: </Text>
                <Text>{data.totalIncome}</Text>
                <Text fontWeight="bold">TDS: </Text>
                <Text>{data.tds}</Text>
                <Text fontWeight="bold">Total Leaves: </Text>
                <Text>{data.totalLeaves}</Text>
                <Text fontWeight="bold">Advance Salary</Text>
                <Text>{data.advanceSalary}</Text>
                <Text fontWeight="bold">Total Deductions: </Text>
                <Text>{data.totalDeductions}</Text>
                <Text fontWeight="bold">Net Salary: </Text>
                <Text>{data.netSalary}</Text>
                <Text fontWeight="bold">Slip ID: </Text>
                <Text>{data.slip_id}</Text>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
};

export default InfoModal;
