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

const CreateProjectButton = ({ onOpen }) => {
  return (
    <Link to="/CreateProject">
      <Button
        colorScheme="blue"
        onClick={onOpen}
        _hover={{ bg: "blue.600" }}
        mb="2"
        className="flex gap-2 items-center"
      >
        <GoPlus /> Add a Project
      </Button>
    </Link>
  );
};

const GetAllProject = () => {
  const [projects, setProjects] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/getAllProjects`
        );
        setProjects(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of error too
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Project Information</h1>
        <CreateProjectButton onOpen={onOpen} />
        {projects.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
            <span>
              No Projects Assigned
            </span>
          } />
        ) : (
          <TableContainer
            formFor="project"
            searchText={searchText}
            setSearchText={setSearchText}
            setFilteredData={setFilteredProjects}
            data={projects}
          >
            <Thead bg={"#F1F5F9"}>
              <Tr>
                <Th fontWeight="bold">S. No.</Th>
                <Th fontWeight="bold">Project Name</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">Priority</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">Brand Name</Th>
                <Th fontWeight="bold" className="md:table-cell hidden">Status</Th>
                <Th fontWeight="bold">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchText !== ""
                ? filteredProjects.map((project, index) => (
                  <Tr key={project._id}>
                    <Td>{index + 1}</Td>
                    <Td>{project.projectName}</Td>
                    <Td className="md:table-cell hidden">{project.priority}</Td>
                    <Td className="md:table-cell hidden">{project.brandName}</Td>
                    <Td className="md:table-cell hidden">{project.status}</Td>
                    <Td>
                      <Button
                        size={"sm"}
                        colorScheme="purple"
                        onClick={() => handleMoreInfo(project)}
                      >
                        More Info
                      </Button>
                    </Td>
                  </Tr>
                ))
                : projects.map((project, index) => (
                  <Tr key={project._id}>
                    <Td>{index + 1}</Td>
                    <Td>{project.projectName}</Td>
                    <Td className="md:table-cell hidden">{project.priority}</Td>
                    <Td className="md:table-cell hidden">{project.brandName}</Td>
                    <Td className="md:table-cell hidden">{project.status}</Td>
                    <Td>
                      <Button
                        size={"sm"}
                        colorScheme="purple"
                        onClick={() => handleMoreInfo(project)}
                      >
                        More Info
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </TableContainer>
        )}
      </div>

      <InfoModal
        modalFor="project"
        data={selectedProject}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default GetAllProject;