import React, { useState, useEffect } from "react";
import {
  Select,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";

const Invoice = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedGst, setSelectedGst] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllClients`
      );
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllProducts`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleClientChange = (event) => {
    const _id = event.target.value;
    const selectedClient = clients.find((client) => client._id === _id);
    setSelectedClient(selectedClient);
  };

  const handleProductSelect = (event) => {
    const productId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    setSelectedProducts([...selectedProducts, selectedProduct]);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    if (field === "productId") {
      const selectedProduct = products.find((product) => product._id === value);

      updatedServices[index]["product"] = selectedProduct;
    } else {
      updatedServices[index][field] = value;
    }
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      {
        product: "",
        serviceDescription: "",
        duration: "",
        quantity: 1,
        unitPrice: 0,
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleSubmit = async () => {
    const requestData = {
      client_id: selectedClient.client_id,
      gst: parseInt(selectedGst),
      services: services.map((service) => ({
        product: service.product.product,
        serviceDescription: service.serviceDescription,
        duration: service.duration,
        quantity: service.quantity,
        unitPrice: service.product.unitPrice,
        startDate: service.startDate.toISOString(),
        endDate: service.endDate.toISOString(),
      })),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/admin/createInvoice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', 'invoice_slip.pdf'); 
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        if (response.status === 200) {
          toast.success('Invoice Slip is downloaded successfully.');
        } else {
          console.error("Failed to download Invoice slip");
          toast.error('Failed to download Invoice slip.');
        }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Select Client</FormLabel>
        <Select placeholder="Select client" onChange={handleClientChange}>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.brandName}
            </option>
          ))}
        </Select>
      </FormControl>
      {selectedClient && (
        <>
          <FormLabel>Client Name:-{selectedClient.clientName}</FormLabel>
          <FormLabel>Client Company:-{selectedClient.companyName}</FormLabel>
        </>
      )}
      <FormControl>
        <FormLabel>GST</FormLabel>
        <Input
          type="number"
          placeholder="Enter GST"
          value={selectedGst}
          onChange={(e) => setSelectedGst(e.target.value)}
        />
      </FormControl>

      <Stack spacing={4}>
        {services.map((service, index) => (
          <Stack key={index} spacing={4}>
            <FormControl>
              <FormLabel>Select Product</FormLabel>
              <Select
                placeholder="Select product"
                onChange={(e) =>
                  handleServiceChange(index, "productId", e.target.value)
                }
                value={service.productId}
              >
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.product} - Unit Price - {product.unitPrice}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Service Description</FormLabel>
              <Input
                value={service.serviceDescription}
                onChange={(e) =>
                  handleServiceChange(
                    index,
                    "serviceDescription",
                    e.target.value
                  )
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <DatePicker
                selected={service.startDate}
                onChange={(date) =>
                  handleServiceChange(index, "startDate", date)
                } // Corrected to use 'date' instead of 'startDate'
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <DatePicker
                selected={service.endDate}
                onChange={(date) => handleServiceChange(index, "endDate", date)} // Corrected to use 'date' instead of 'endDate'
              />
            </FormControl>

            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                value={service.quantity}
                onChange={(e) =>
                  handleServiceChange(index, "quantity", e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Duration</FormLabel>
              <Input
                type="text"
                value={service.duration}
                onChange={(e) =>
                  handleServiceChange(index, "duration", e.target.value)
                }
              />
            </FormControl>

            <Button
              colorScheme="red"
              onClick={() => handleRemoveService(index)}
            >
              Remove Service
            </Button>
          </Stack>
        ))}

        <Button onClick={handleAddService}>Add Service</Button>
      </Stack>

      <Button onClick={handleSubmit}>Create Invoice</Button>
    </Stack>
  );
};

export default Invoice;
