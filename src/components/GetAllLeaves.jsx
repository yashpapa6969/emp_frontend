import { useState, useEffect } from "react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { format } from 'date-fns';
import axios from "axios";
import InfoModal from "./common/InfoModal";
import { GoPlus } from "react-icons/go";
import TableContainer from "./common/TableContainer";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { DeleteIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

const GetAllLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    const [deleteProjectId, setDeleteProjectId] = useState(null);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/getAllLeaves`
        );
        setLeaves(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (leave) => {
    setSelectedLeave(leave);
    onOpen();
  };

  const handleDeleteLeave = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE}/api/admin/deleteLeaveById/${deleteProjectId}`
      );
      toast.success("Successfully deleted leave");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllLeaves`
      );
      setLeaves(response.data.data);
            setIsDeleteAlertOpen(false);
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  };
  
    const handleDeleteConfirmation = (projectId) => {
      setDeleteProjectId(projectId);
      setIsDeleteAlertOpen(true);
    };

    const handleDeleteCancel = () => {
      setIsDeleteAlertOpen(false);
    };
  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Leave Information</h1>

        <Link to="/createLeave">
          <Button
            colorScheme="blue"
            onClick={onOpen}
            _hover={{ bg: "blue.600" }}
            mb="2"
            className="flex gap-2 items-center"
          >
            <GoPlus /> Create Leave
          </Button>
        </Link>

        {leaves.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No Leaves Assigned</span>}
          />
        ) : (
          <TableContainer
            formFor="leave"
            searchText={searchText}
            setSearchText={setSearchText}
            setFilteredData={setFilteredLeaves}
            data={leaves}
          >
            <Thead position="sticky" top={0} bg={"#F1F5F9"}>
              <Tr>
                <Th fontWeight="bold">Employee Name</Th>
                <Th fontWeight="bold">Type</Th>
                <Th fontWeight="bold">Start Date</Th>
                <Th fontWeight="bold">End Date</Th>
                <Th fontWeight="bold">Status</Th>
                <Th fontWeight="bold">Reason</Th>
                <Th fontWeight="bold">Action</Th>
                <Th fontWeight="bold"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchText !== ""
                ? filteredLeaves.map((leave, index) => (
                    <Tr key={leave._id}>
                      <Td>{leave.employee_name}</Td>
                      <Td>{leave.type}</Td>
                      <Td>{leave.startDate}</Td>
                      <Td>{leave.endDate}</Td>
                      <Td>{leave.status}</Td>
                      <Td>{leave.reason}</Td>
                      <Td>
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(leave)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          onClick={() => handleDeleteLeave(leave.leave_id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : leaves.map((leave, index) => (
                    <Tr key={leave._id}>
                      <Td>{leave.employee_name}</Td>
                      <Td>{leave.type}</Td>
                      <Td>{format(new Date(leave.startDate), "MM/dd/yyyy")}</Td>
                      <Td>{format(new Date(leave.endDate), "MM/dd/yyyy")}</Td>
                      <Td>{leave.status}</Td>
                      <Td>{leave.reason}</Td>
                      <Td>
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(leave)}
                        >
                          More Info
                        </Button>
                      </Td>
                      <Td>
                        {" "}
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          onClick={() =>
                            handleDeleteConfirmation(leave.leave_id)
                          }
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </TableContainer>
        )}
      </div>

      <InfoModal
        modalFor="leave"
        data={selectedLeave}
        onClose={onClose}
        isOpen={isOpen}
      />
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={undefined}
        onClose={handleDeleteCancel}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Leave
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete this Leave?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleDeleteCancel}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDeleteLeave} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default GetAllLeaves;
