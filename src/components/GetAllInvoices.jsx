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

const GetAllInvoices = () => {
    const [projects, setProjects] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
     const [downloading, setDownloading] = useState(null); 

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
       }/api/admin/downloadInvoice/${id}`;
       axiosDownloadFile(url, `${id}.pdf`);
       setDownloading(index);
     };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE}/api/admin/getAllInvoices`
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
          <h1 className="text-3xl font-bold mb-4">Invoice Information</h1>

          <Link to="/createInvoice">
            <Button
              colorScheme="blue"
              onClick={onOpen}
              _hover={{ bg: "blue.600" }}
              mb="2"
              className="flex gap-2 items-center"
            >
              <GoPlus /> Add a Invoice
            </Button>
          </Link>

          {projects.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No Projects Assigned</span>}
            />
          ) : (
            <TableContainer
              formFor="Invoice"
              searchText={searchText}
              setSearchText={setSearchText}
              setFilteredData={setFilteredProjects}
              data={projects}
            >
              <Thead bg={"#F1F5F9"}>
                <Tr>
                  <Th fontWeight="bold">S. No.</Th>
                  <Th fontWeight="bold">Product Name</Th>
                  <Th fontWeight="bold" className="md:table-cell hidden">
                    Duration
                  </Th>
                  <Th fontWeight="bold" className="md:table-cell hidden">
                    Quantity
                  </Th>
                  <Th fontWeight="bold" className="md:table-cell hidden">
                    Unit Price
                  </Th>
                  <Th fontWeight="bold">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {searchText !== ""
                  ? filteredProjects.map((project, index) =>
                      project.services.map((service, serviceIndex) => (
                        <Tr key={service._id}>
                          <Td>{index + 1}</Td>
                          <Td>{service.product}</Td>
                          <Td>{service.duration}</Td>
                          <Td className="md:table-cell hidden">
                            {service.quantity}
                          </Td>
                          <Td className="md:table-cell hidden">
                            {service.unitPrice}
                          </Td>
                          <Td>
                            <Button
                              size={"sm"}
                              mr={2}
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
                              onClick={() =>
                                handleDownload(project.invoive_id, index)
                              }
                            >
                              <DownloadIcon />
                            </Button>
                          </Td>
                        </Tr>
                      ))
                    )
                  : projects.map((project, index) =>
                      project.services.map((service, serviceIndex) => (
                        <Tr key={service._id}>
                          <Td>{index + 1}</Td>
                          <Td>{service.product}</Td>
                          <Td>{service.duration}</Td>
                          <Td className="md:table-cell hidden">
                            {service.quantity}
                          </Td>
                          <Td className="md:table-cell hidden">
                            {service.unitPrice}
                          </Td>
                          <Td>
                            <Button
                              size={"sm"}
                              mr={2}
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
                              onClick={() =>
                                handleDownload(project.invoive_id, index)
                              }
                            >
                              <DownloadIcon />
                            </Button>
                          </Td>
                        </Tr>
                      ))
                    )}
              </Tbody>
            </TableContainer>
          )}
        </div>

        <InfoModal
          modalFor="invoice"
          data={selectedProject}
          onClose={onClose}
          isOpen={isOpen}
        />
      </>
    );
};

export default GetAllInvoices;