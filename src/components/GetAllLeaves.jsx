import { useState, useEffect } from "react";
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Spinner, // Import Spinner component from Chakra UI
} from "@chakra-ui/react";
import axios from "axios";
import InfoModal from "./common/InfoModal";
import { GoPlus } from "react-icons/go";
import TableContainer from "./common/TableContainer";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { DownloadIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { DeleteIcon } from "@chakra-ui/icons";

const GetAllLeaves = () => {
  const [projects, setProjects] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/getAllSlips`
        );
        setProjects(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  async function axiosDownloadFile(url, fileName) {
    setDownloading(true);
    return axios({
      url,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const href = window.URL.createObjectURL(response.data);

        const anchorElement = document.createElement("a");

        anchorElement.href = href;
        anchorElement.download = fileName;

        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
        setDownloading(false);
      })
      .catch((error) => {
        console.log("error: ", error);
        setDownloading(false);
      });
  }

  const handleDownload = (id, index) => {
    const url = `${
      import.meta.env.VITE_API_BASE
    }/api/admin/downloadSalarySlip/${id}`;
    axiosDownloadFile(url, `${id}.pdf`);
    setDownloading(index);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }
  const handleDeleteSlip = async (projectId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE}/api/admin/deleteSlipById/${projectId}`
      );
      toast.success("Successfully deleted Slip");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllSlips`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Leave Information</h1>

        <Link to="/createSlip">
          <Button
            colorScheme="blue"
            onClick={onOpen}
            _hover={{ bg: "blue.600" }}
            mb="2"
            className="flex gap-2 items-center"
          >
            <GoPlus /> Create Slip
          </Button>
        </Link>

        {projects.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No Slip Assigned</span>}
          />
        ) : (
          <TableContainer
            formFor="slip"
            searchText={searchText}
            setSearchText={setSearchText}
            setFilteredData={setFilteredProjects}
            data={projects}
          >
            <Thead position="sticky" top={0} bg={"#F1F5F9"}>
              <Tr>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  S. No.
                </Th>
                <Th fontWeight="bold">Employee name</Th>
                <Th fontWeight="bold">Basic Pay</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">
                  Travel Pay
                </Th>

                <Th fontWeight="bold" className="md:table-cell hidden">
                  Bonus
                </Th>

                <Th fontWeight="bold">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchText !== ""
                ? filteredProjects.map((project, index) => (
                    <Tr key={project._id}>
                      <Td className="md:table-cell hidden">{index + 1}</Td>
                      <Td>{index + 1}</Td>
                      <Td>{project.basicPay}</Td>
                      <Td className="md:table-cell hidden">
                        {project.travelPay}
                      </Td>
                      <Td className="md:table-cell hidden">{project.bonus}</Td>
                      <Td className="flex gap-2 flex-col md:flex-row">
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(project)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          isLoading={index === downloading}
                          colorScheme="purple"
                          onClick={() => handleDownload(project.slip_id, index)}
                        >
                          <DownloadIcon />
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          onClick={() => handleDeleteSlip(project.slip_id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))
                : projects.map((project, index) => (
                    <Tr key={project._id}>
                      <Td className="md:table-cell hidden">{index + 1}</Td>
                      <Td>{index + 1}</Td>
                      <Td>{project.basicPay}</Td>
                      <Td className="md:table-cell hidden">
                        {project.travelPay}
                      </Td>
                      <Td className="md:table-cell hidden">{project.bonus}</Td>
                      <Td className="flex gap-2 flex-col md:flex-row">
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(project)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          isLoading={index === downloading}
                          colorScheme="purple"
                          onClick={() => handleDownload(project.slip_id, index)}
                        >
                          <DownloadIcon />
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          onClick={() => handleDeleteSlip(project.slip_id)}
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
        modalFor="slip"
        data={selectedProject}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default GetAllLeaves;
