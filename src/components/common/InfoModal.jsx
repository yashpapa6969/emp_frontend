import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'

const InfoModal = ({ modalFor, data, onClose, isOpen }) => {

  if (modalFor === "manager")
    return (
      <Modal onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' isCentered>
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
    )

  if (modalFor === "employee")
    return (
      <Modal onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' isCentered>
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
    )

  if (modalFor === "client")
    return (
      <Modal onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <div>
                <Text fontWeight="bold">Name: </Text>
                <Text>{data.clientName}</Text>
                <Text fontWeight="bold">Contact Name: </Text>
                <Text>{data.contactName}</Text>
                <Text fontWeight="bold">Email: </Text>
                <Text>{data.email}</Text>
                <Text fontWeight="bold">Phone: </Text>
                <Text>{data.phone}</Text>
                <Text fontWeight="bold">Industry: </Text>
                <Text>{data.industry}</Text>
                <Text fontWeight="bold">Notes: </Text>
                <Text>{data.notes}</Text>
                <Text fontWeight="bold">Website: </Text>
                <Text>{data.website}</Text>
                <Text fontWeight="bold">Currency: </Text>
                <Text>{data.currency}</Text>
                <Text fontWeight="bold">Default Language: </Text>
                <Text>{data.defaultLanguage}</Text>
                <Text fontWeight="bold">Address: </Text>
                <Text>{data.address}</Text>
                <Text fontWeight="bold">City: </Text>
                <Text>{data.city}</Text>
                <Text fontWeight="bold">State: </Text>
                <Text>{data.state}</Text>
                <Text fontWeight="bold">ZipCode: </Text>
                <Text>{data.zipCode}</Text>
                <Text fontWeight="bold">Country: </Text>
                <Text>{data.country}</Text>
                <Text fontWeight="bold">Status: </Text>
                <Text>{data.status}</Text>
                <Text fontWeight="bold">Client ID: </Text>
                <Text>{data.client_id}</Text>
                <Text fontWeight="bold">Groups:</Text>
                {data.groups.map((permission, index) => (
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
    )
}

export default InfoModal