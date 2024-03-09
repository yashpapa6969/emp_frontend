import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployeeId } from "../../store/slice/EmployeeSlice";
import { setClientId } from "../../store/slice/ClientSlice";
import { setProjectId } from "../../store/slice/ProjectSlice";
import { useEffect } from "react";
import { Divider } from "antd";
import { CheckCircleIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";

const InfoModal = ({ modalFor, data, onClose, isOpen }) => {
  const dispatch = useDispatch();
  const priorityArray = ["low", "medium", "high", "urgent"];

  const handleTaskDelete = () => {
    // LOGIC TO BE WRITTEN
  }
  const handleChangeTaskStatus = () => {
    // LOGIC TO BE WRITTEN
  }

  useEffect(() => {
    if (modalFor === "project" && data?.employees) {
      const employeeIds = data.employees;
      employeeIds.forEach((id) => {
        dispatch(addEmployeeId(id));
      });
      const clientId = data.client_id;
      dispatch(setClientId(clientId));
    }
    if (modalFor === "slip" && data?.employee_id) {
      const employeeId = data.employee_id;
      dispatch(addEmployeeId(employeeId));
    }
    if (modalFor === "invoice" && data?.client_id) {
      const clientId = data.client_id;
      dispatch(setClientId(clientId));
    }
    if (modalFor === "task" && data?.employee_id) {
      const employeeId = data.employee_id;
      const p = data.project_id;
      const c = data.client_id;
      dispatch(addEmployeeId(employeeId));
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
              <>
                <div className="flex flex-col md:flex-row gap-3 w-full">
                  <div className="md:w-1/3 w-full mb-4">
                    <Text fontWeight="bold">Name: </Text>
                    <Text fontSize={"24px"} textTransform={"capitalize"}>{data.name}</Text>
                  </div>
                  <div className="md:w-1/3 w-full">
                    <Text fontWeight="bold">Position: </Text>
                    <Text fontSize={"24px"} textTransform={"capitalize"}>{data.position}</Text>
                  </div>
                  <div className="md:w-1/3 w-full">
                    <Text fontWeight="bold">Department: </Text>
                    <Text fontSize={"24px"} textTransform={"capitalize"}>{data.department}</Text>
                  </div>
                </div>
                <Text fontWeight="bold">Manager ID: </Text>
                <Text mb={4}>{data.manager_id}</Text>
                <Text fontWeight="bold">Email: </Text>
                <Text fontSize={"18px"} mb={4}>{data.email}</Text>
                <div className="flex flex-col md:flex-row md:gap-[150px] gap-4 w-full">
                  <div>
                    <Text fontWeight="bold">Date Of Birth: </Text>
                    <Text fontSize={"18px"}>{data.dob}</Text>
                  </div>
                  <div>
                    <Text fontWeight="bold">Joining Date: </Text>
                    <Text fontSize={"18px"}>{data.joiningDate}</Text>
                  </div>
                </div>
                {/* <Text fontWeight="bold">Permissions:</Text> */}
                {/* {data?.permissions && data.permissions.length > 0 ? (
                  data.permissions.map((permission, index) => (
                    <Text key={index}>{permission}</Text>
                  ))
                ) : (
                  <Text color="red">No permissions</Text>
                )} */}
              </>
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
                  {data.type && (
                    <Text>
                      <b>Type: </b> {data.type}
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
                      <b>Pan no.: </b> {data.panNumber}{console.log(data)}
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
                {/* <h1 className="mt-4 text-xl font-semibold mb-2 text-gray-500">
                  Permissions
                </h1>
                {data?.permissions && data.permissions.length > 0 ? (
                  data.permissions.map((permission, index) => (
                    <Text key={index}>{permission}</Text>
                  ))
                ) : (
                  <Text color="red">No permissions</Text>
                )} */}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.clientName && (
                  <Text>
                    <b>Name: </b> {data.clientName}
                  </Text>
                )}
                {data.clientBirthday && (
                  <Text>
                    <b>Birthday: </b> {data.clientBirthday}
                  </Text>
                )}
                {data.workStartDate && (
                  <Text>
                    <b>Work start date: </b> {data.workStartDate}
                  </Text>
                )}
                {data.brandName && (
                  <div>
                    <Text fontWeight="bold">Brand Name: </Text>
                    <Text>{data.brandName}</Text>
                  </div>
                )}
                {data.companyName && (
                  <div>
                    <Text fontWeight="bold">Company Name: </Text>
                    <Text>{data.companyName}</Text>
                  </div>
                )}
                {data.email1 && (
                  <div>
                    <Text fontWeight="bold">Email1: </Text>
                    <Text>{data.email1}</Text>
                  </div>
                )}
                {data.email2 && (
                  <div>
                    <Text fontWeight="bold">Email2: </Text>
                    <Text>{data.email2}</Text>
                  </div>
                )}
                {data.phone1 && (
                  <div>
                    <Text fontWeight="bold">Phone1: </Text>
                    <Text>{data.phone1}</Text>
                  </div>
                )}
                {data.phone2 && (
                  <div>
                    <Text fontWeight="bold">Phone2: </Text>
                    <Text>{data.phone2}</Text>
                  </div>
                )}
                {data.enquiryDate && (
                  <div>
                    <Text fontWeight="bold">Enquiry Date: </Text>
                    <Text>{data.enquiryDate}</Text>
                  </div>
                )}
                {data.website && (
                  <div>
                    <Text fontWeight="bold">Website: </Text>
                    <Text>{data.website}</Text>
                  </div>
                )}
                {data.buisnessAddress && (
                  <div>
                    <Text fontWeight="bold">Business Address: </Text>
                    <Text>{data.businessAddress}</Text>
                  </div>
                )}
                {data.city && (
                  <div>
                    <Text fontWeight="bold">Cinty: </Text>
                    <Text>{data.city}</Text>
                  </div>
                )}
                {data.state && (
                  <div>
                    <Text fontWeight="bold">State: </Text>
                    <Text>{data.state}</Text>
                  </div>
                )}
                {data.pincode && (
                  <div>
                    <Text fontWeight="bold">Pincode: </Text>
                    <Text>{data.pincode}</Text>
                  </div>
                )}
                {data.country && (
                  <div>
                    <Text fontWeight="bold">Country: </Text>
                    <Text>{data.country}</Text>
                  </div>
                )}
                {data.requirement && (
                  <div>
                    <Text fontWeight="bold">Requirement: </Text>
                    <Text>{data.requirement}</Text>
                  </div>
                )}
                {data.additionalInformation && (
                  <div>
                    <Text fontWeight="bold">Additional Information: </Text>
                    <Text>{data.additionalInformation}</Text>
                  </div>
                )}
                {data.source && data.source.length > 0 && (
                  <div>
                    <Text fontWeight="bold">Source:</Text>
                    <ul>
                      {data.source.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
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
                          href={`${import.meta.env.VITE_API_BASE}/uploads/${file.split("/")[4]
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Text fontWeight="bold" mb={2}>Client Details: </Text>
                  <Link to={`/GetClient`}>
                    <Button>Get Client details</Button>
                  </Link>
                </div>

                {data.projectName && ( // Check if projectName exists
                  <div>
                    <Text fontWeight="bold">Project Name: </Text>
                    <Text>{data.projectName}</Text>
                  </div>
                )}
                {data.brandName && ( // Check if brandName exists
                  <div>
                    <Text fontWeight="bold">Brand Name: </Text>
                    <Text>{data.brandName}</Text>
                  </div>
                )}
                {data.priority && ( // Check if priority exists
                  <div>
                    <Text fontWeight="bold">Priority: </Text>
                    <Text>{data.priority}</Text>
                  </div>
                )}
                {data.startDate && ( // Check if startDate exists
                  <div>
                    <Text fontWeight="bold">Start Date: </Text>
                    <Text>{data.startDate}</Text>
                  </div>
                )}
                {data.deadline && ( // Check if deadline exists
                  <div>
                    <Text fontWeight="bold">End Date: </Text>
                    <Text>{data.deadline}</Text>
                  </div>
                )}
                {data.tags &&
                  data.tags.length > 0 && ( // Check if tags exist and have length greater than 0
                    <div>
                      <Text fontWeight="bold">Tags: </Text>
                      {data.tags.map((tag, index) => (
                        <Text key={index}>{tag.tagName}</Text>
                      ))}
                    </div>
                  )}
                {data.description && ( // Check if description exists
                  <div>
                    <Text fontWeight="bold">Description: </Text>
                    <Text>{data.description}</Text>
                  </div>
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
                <Text fontWeight="bold">Client ID: </Text>
                <Link to={`/GetClient`}>
                  <Button>Get Client details</Button>
                </Link>

                <Text fontWeight="bold">Date </Text>
                <Text>{data.date1}</Text>
                <Text fontWeight="bold">Time </Text>
                <Text>{data.time1}</Text>

                {data.services && (<>
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
                </>)}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.enquiryDate && (
                  <div>
                    <Text fontWeight="bold">Enquiry Date: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.enquiryDate}</Text>
                  </div>
                )}
                {data.companyName && (
                  <div>
                    <Text fontWeight="bold">Company Name: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.companyName}</Text>
                  </div>
                )}
                {data.gender && (
                  <div>
                    <Text fontWeight="bold">Gender: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.gender}</Text>
                  </div>
                )}
                {data.title && (
                  <div>
                    <Text fontWeight="bold">Title: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.title}</Text>
                  </div>
                )}
                {data.brandName && (
                  <div>
                    <Text fontWeight="bold">Brand Name: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.brandName}</Text>
                  </div>
                )}
                {data.clientName && (
                  <div>
                    <Text fontWeight="bold">Client Name: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.clientName}</Text>
                  </div>
                )}
                {data.phone1 && (
                  <div>
                    <Text fontWeight="bold">Phone Number 1: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.phone1}</Text>
                  </div>
                )}
                {data.phone2 && (
                  <div>
                    <Text fontWeight="bold">Phone Number 2: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.phone2}</Text>
                  </div>
                )}
                {data.email1 && (
                  <div>
                    <Text fontWeight="bold">Email 1: </Text>
                    <Text fontSize="18px">{data.email1}</Text>
                  </div>
                )}
                {data.email2 && (
                  <div>
                    <Text fontWeight="bold">Email 2: </Text>
                    <Text fontSize="18px">{data.email2}</Text>
                  </div>
                )}
                {data.status && (
                  <div>
                    <Text fontWeight="bold">Status: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.status}</Text>
                  </div>
                )}
                {data.businessAddress && (
                  <div>
                    <Text fontWeight="bold">Business Address: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.businessAddress}</Text>
                  </div>
                )}
                {data.billingAddress && (
                  <div>
                    <Text fontWeight="bold">Billing Address: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.billingAddress}</Text>
                  </div>
                )}
                {data.city && (
                  <div>
                    <Text fontWeight="bold">City: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.city}</Text>
                  </div>
                )}
                {data.state && (
                  <div>
                    <Text fontWeight="bold">State: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.state}</Text>
                  </div>
                )}
                {data.pincode && (
                  <div>
                    <Text fontWeight="bold">Pincode: </Text>
                    <Text fontSize="18px">{data.pincode}</Text>
                  </div>
                )}
                {data.country && (
                  <div>
                    <Text fontWeight="bold">Country: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.country}</Text>
                  </div>
                )}
                {data.website && (
                  <div>
                    <Text fontWeight="bold">Website: </Text>
                    <Text fontSize="18px">{data.website}</Text>
                  </div>
                )}
                {data.status && (
                  <div>
                    <Text fontWeight="bold">Status: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.status}</Text>
                  </div>
                )}
                {data.additionalInformation && (
                  <div>
                    <Text fontWeight="bold">Additional Information: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.additionalInformation}</Text>
                  </div>
                )}
                {data.sourceInformation && (
                  <div>
                    <Text fontWeight="bold">Source Information: </Text>
                    <Text fontSize="18px" textTransform={"capitalize"}>{data.sourceInformation}</Text>
                  </div>
                )}
                {data.source && data.source.length > 0 && (
                  <div>
                    <Text fontWeight="bold">Source:</Text>
                    <ul>
                      {data.source.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.requirement && data.requirement.length > 0 && (
                  <div>
                    <Text fontWeight="bold">Requirements: </Text>
                    <ul>
                      {data.requirement.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.singleFile && (
                  <div>
                    <Text fontWeight="bold">Single File: </Text>
                    <Button
                      as="a"
                      href={`${import.meta.env.VITE_API_BASE}/uploads/${data.singleFile.split("/")[4]
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
                          href={`${import.meta.env.VITE_API_BASE}/uploads/${file.split("/")[4]
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
          <ModalHeader textTransform={"capitalize"}>{data?.brandName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <>
                <div className="flex flex-col md:flex-row gap-2 items-end md:items-center justify-end">
                  <h2 className="text-lg mr-2">Get:</h2>
                  <Link to={`/GetProject`}>
                    <Button colorScheme="green">Project details</Button>
                  </Link>
                  <Link to={`/GetEmp`}>
                    <Button colorScheme="green">EMP details</Button>
                  </Link>
                  <Link to={`/GetClient`}>
                    <Button colorScheme="green">Client details</Button>
                  </Link>
                  <Divider type="vertical" />
                  <Menu>
                    <MenuButton as={Button} variant={"outline"} rightIcon={<ChevronDownIcon />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        <div className="w-full flex items-center" onClick={() => handleTaskDelete()}>
                          <DeleteIcon mr={2} /> Delete
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div className="w-full flex items-center" onClick={() => handleChangeTaskStatus()}>
                          <CheckCircleIcon mr={2} /> Change Status
                        </div>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <Divider />
                <div className="flex gap-10">
                  <div className="max-w-[200px] md:max-w-[300px]">
                    <h1 className="text-lg font-semibold bg-gray-100 text-gray-500 rounded-md w-full px-3 py-1 mb-4">Task Information</h1>
                    <Text className="text-sm font-bold text-gray-500 mt-3">Brand Name </Text>
                    <Text className="text-lg capitalize">{data.brandName}</Text>
                    <Text className="text-sm font-bold text-gray-500 mt-2">Task ID: </Text>
                    <Text className="text-lg">{data.task_id}</Text>
                    <Text className="text-sm font-bold text-gray-500 mt-2">Priority </Text>
                    <Text className="text-lg capitalize">
                      {priorityArray[data.priority] || data.priority}
                      {/* <div className={`h-2 w-2 rounded-full ${data.priority === 0 && "bg-red-400"
                        } ${data.priority === 1 && "bg-orange-300"
                        } ${data.priority === 2 && "bg-blue-300"
                        } ${data.priority === 3 && "bg-gray-300"
                        }`} /> */}
                    </Text>
                    <Text className="text-sm font-bold text-gray-500 mt-2">Status: </Text>
                    <Text className="text-lg capitalize">{data.status}</Text>
                  </div>
                  <div className="max-w-[200px] md:max-w-[300px]">
                    <h1 className="text-lg font-semibold bg-gray-100 text-gray-500 rounded-md w-full px-3 py-1 mb-4">General Information</h1>
                    <Text className="text-sm font-bold text-gray-500 mt-3">Start Date: </Text>
                    <Text className="text-lg">{data.startDate}</Text>
                    <Text className="text-sm font-bold text-gray-500 mt-2">Deadline: </Text>
                    <Text className="text-lg">{data.deadline}</Text>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <Text className="text-md font-bold text-gray-500 mt-2">Description: </Text>
                  <Text className="text-lg">{data.description}</Text>
                </div>
              </>
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
