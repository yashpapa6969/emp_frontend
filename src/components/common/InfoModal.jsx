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
import { useDispatch, useSelector } from "react-redux";
import { addEmployeeId } from "../../store/slice/EmployeeSlice";
import { selectEmployeeIds,clearEmployeeIds } from "../../store/slice/EmployeeSlice";
import { useEffect,useState } from "react";

const InfoModal = ({ modalFor, data, onClose, isOpen }) => {
  const dispatch = useDispatch();
    
    useEffect(() => {
      if (modalFor === "project" && data?.employees) {
        const employeeIds = data.employees;
        employeeIds.forEach((id) => {
          dispatch(addEmployeeId(id));
        });
       
      }
    }, [modalFor, data, dispatch]);

  const addEmployeeIdToRedux = (id) => {
    dispatch(addEmployeeId(id));
  };

  if (modalFor === "manager")
    return (
      <Modal
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
                <Text fontWeight="bold">Joining Date: </Text>
                <Text>{data.joiningDate}</Text>
                <Text fontWeight="bold">Employee ID: </Text>
                <Text>{data.employee_id}</Text>
                <Text fontWeight="bold">Manager ID: </Text>
                <Text>{data.manager_id}</Text>
                <Text fontWeight="bold">Permissions:</Text>
                {data?.permissions?.map((permission, index) => (
                  <Text key={index}>{permission}</Text>
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

  if (modalFor === "employee")
    return (
      <Modal
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
                <Text fontWeight="bold">Name: </Text>
                <Text>{data.name}</Text>
                <Text fontWeight="bold">Email: </Text>
                <Text>{data.email}</Text>
                <Text fontWeight="bold">Position: </Text>
                <Text>{data.position}</Text>
                <Text fontWeight="bold">Department: </Text>
                <Text>{data.department}</Text>
                <Text fontWeight="bold">Joining Date: </Text>
                <Text>{data.joiningDate}</Text>
                <Text fontWeight="bold">Employee ID: </Text>
                <Text>{data.employee_id}</Text>
                <Text fontWeight="bold">Manager ID: </Text>
                <Text>{data.manager_id}</Text>
                <Text fontWeight="bold">Permissions:</Text>
                {data.permissions?.map((permission, index) => (
                  <Text key={index}>{permission}</Text>
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

  if (modalFor === "client")
    return (
      <Modal
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
                <Text fontWeight="bold">Client Name: </Text>
                <Text>{data.clientName}</Text>
                <Text fontWeight="bold">Brand Name: </Text>
                <Text>{data.brandName}</Text>
                <Text fontWeight="bold">Email: </Text>
                <Text>{data.email1}</Text>
                <Text fontWeight="bold">Phone: </Text>
                <Text>{data.phone1}</Text>
                <Text fontWeight="bold">Enquiry Date: </Text>
                <Text>{data.enquiryDate}</Text>
                <Text fontWeight="bold">Source: </Text>
                <Text>{data.source}</Text>
                <Text fontWeight="bold">Client ID: </Text>
                <Text>{data.client_id}</Text>
                <Text fontWeight="bold">Single File: </Text>
                <Image
                  src={data.singleFile}
                  alt={`Single File, url:- ${data.singleFile}`}
                />
                <Text fontWeight="bold">Multiple Files: </Text>
                {data.multipleFiles.map((file, index) => (
                  <div key={index}>
                    <Image
                      src={file}
                      alt={`File ${index + 1}, url:- ${file}`}
                    />
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
  if (modalFor === "project") {
   

    return (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <div>
                <Text fontWeight="bold">Project Name: </Text>
                <Text>{data.projectName}</Text>
                <Text fontWeight="bold">Client ID: </Text>
                <Link to={`/GetClient/${data.client_id}`}>
                  <Button>Get Client details</Button>
                </Link>
                <Text fontWeight="bold">progress: </Text>
                <Text>{data.progress}</Text>
                <Text fontWeight="bold">Billing Type: </Text>
                <Text>{data.billingType}</Text>
                <Text fontWeight="bold">Status </Text>
                <Text>{data.status}</Text>
                <Text fontWeight="bold">Total Rate: </Text>
                <Text>{data.totalRate}</Text>
                <Text fontWeight="bold">Estimated Hours: </Text>
                <Text>{data.estimatedHours}</Text>
                <Text fontWeight="bold">Start Date </Text>
                <Text>{data.startDate}</Text>
                <Text fontWeight="bold">End date </Text>
                <Text>{data.endDate}</Text>
                <Text fontWeight="bold">Tags </Text>
                {data.tags.map((tag, index) => (
                  <Text key={index}>{tag}</Text>
                ))}
                <Text fontWeight="bold">Employee </Text>

                <Link to={`/GetEmp`}>
                  <Button>Get EMP details</Button>
                </Link>

                <Text fontWeight="bold">Project ID: </Text>
                <Text>{data.project_id}</Text>
                <Text fontWeight="bold">Description: </Text>
                <Text>{data.description}</Text>
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
                <Text fontWeight="bold">Source: </Text>
                <Text>{data.source}</Text>
                <Text fontWeight="bold">Brand Name </Text>
                <Text>{data.brandName}</Text>
                <Text fontWeight="bold">Client Name </Text>
                <Text>{data.clientName}</Text>
                <Text fontWeight="bold">Phone Number: </Text>
                <Text>{data.phone1}</Text>
                <Text fontWeight="bold">Email: </Text>
                <Text>{data.email1}</Text>
                <Text fontWeight="bold">Status: </Text>
                <Text>{data.status}</Text>
                <Text fontWeight="bold">Single File: </Text>
                <Image
                  src={data.singleFile}
                  alt={`Single File, url:- ${data.singleFile}`}
                />
                <Text fontWeight="bold">Multiple Files: </Text>
                {data.multipleFiles.map((file, index) => (
                  <div key={index}>
                    <Image
                      src={file}
                      alt={`File ${index + 1}, url:- ${file}`}
                    />
                  </div>
                ))}
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
};

export default InfoModal;
