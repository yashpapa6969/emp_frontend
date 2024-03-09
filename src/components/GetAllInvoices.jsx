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
import TableContainer from "./common/TableContainer";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import { DownloadIcon, DeleteIcon } from "@chakra-ui/icons"; // Import DeleteIcon
import { toast } from "react-toastify";

const GetAllInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const url = `${import.meta.env.VITE_API_BASE
      }/api/admin/downloadInvoice/${id}`;
    axiosDownloadFile(url, `${id}.pdf`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/admin/getAllInvoices`
        );
        setInvoices(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleMoreInfo = (invoice) => {
    setSelectedInvoice(invoice);
    onOpen();
  };

  const handleDeleteInvoice = async (invoiceId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE
        }/api/admin/deleteInvoiceById/${invoiceId}`
      );
      toast.success("Successfully deleted Invoice");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllInvoices`
      );
      setInvoices(response.data);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
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
            Add an Invoice
          </Button>
        </Link>

        {invoices.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No Invoices Available</span>}
          />
        ) : (
          <TableContainer
            formFor="invoice"
            searchText={searchText}
            setSearchText={setSearchText}
            setFilteredData={setFilteredInvoices}
            data={invoices}
          >
            <Thead bg={"#F1F5F9"}>
              <Tr>
                <Th fontWeight="bold">Product Name</Th>
                <Th fontWeight="bold">
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
                ? filteredInvoices.map((invoice, index) =>
                  invoice.services.map((service) => (
                    <Tr key={service._id}>
                      <Td>{service.product}</Td>
                      <Td>{service.duration}</Td>
                      <Td className="md:table-cell hidden">
                        {service.quantity}
                      </Td>
                      <Td className="md:table-cell hidden">
                        {service.unitPrice}
                      </Td>
                      <Td className="flex flex-col md:flex-row gap-2">
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(invoice)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          // isLoading={index === downloading}
                          colorScheme="purple"
                          onClick={() =>
                            handleDownload(invoice.invoive_id, index)
                          }
                        >
                          <DownloadIcon />
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          onClick={() => handleDeleteInvoice(invoice.invoive_id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))
                )
                : invoices.map((invoice) =>
                  invoice.services.map((service, index) => (
                    <Tr key={service._id}>
                      <Td>{service.product}</Td>
                      <Td>{service.duration}</Td>
                      <Td className="md:table-cell hidden">
                        {service.quantity}
                      </Td>
                      <Td className="md:table-cell hidden">
                        {service.unitPrice}
                      </Td>
                      <Td className="flex flex-col md:flex-row gap-2">
                        <Button
                          size={"sm"}
                          colorScheme="purple"
                          onClick={() => handleMoreInfo(invoice)}
                        >
                          More Info
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          // isLoading={index === downloading}
                          colorScheme="purple"
                          onClick={() =>
                            handleDownload(invoice.invoive_id, index)
                          }
                        >
                          <DownloadIcon />
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorScheme="red"
                          onClick={() => handleDeleteInvoice(invoice.invoive_id)}
                        >
                          <DeleteIcon />
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
        data={selectedInvoice}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default GetAllInvoices;
