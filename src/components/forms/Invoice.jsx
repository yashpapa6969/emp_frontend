import { Button, Flex, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import MyDatePicker from '../common/MyDatePicker'
import { useEffect, useState } from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import SelectProduct from '../common/SelectProduct';
import axios from 'axios';
import { toast } from 'react-toastify';
import SelectClient from '../common/SelectClient';

const Invoice = () => {
    const [selectProductValue, setSelectProductValue] = useState({});
    const [selectedSource, setSelectedSource] = useState({});
    const [serviceDescription, setServiceDescription] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [clients, setClients] = useState({});
    const [invoiceData, setInvoiceData] = useState({
        services: {
            product: "",
            serviceDescription: "",
            duration: "",
            quantity: 0,
            unitPrice: unitPrice,
            startDate: "",
            endDate: ""
        },
        client_id: "",
        gst: 0,
        date1: moment().format("DD-MM-YYYY"),
        time1: moment().format("hh:mm:ss"),
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/admin/getProductDetails/${selectProductValue}`);
            setSelectedSource(res.data);
            setUnitPrice(selectedSource.unitPrice)
        }
        fetchProduct();
        console.log(selectedSource)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = await axios.get(`${import.meta.env.VITE_API_BASE}/api/admin/getProductDetails/${selectProductValue}`);
        setInvoiceData({
            ...invoiceData,
            client_id: `${clients}`,
            services: {
                product: productData.data.product,
                serviceDescription: serviceDescription,
                duration: "",
                quantity: quantity,
                unitPrice: productData.data.unitPrice,
                startDate: "",
                endDate: ""
            }
        })

        const formData = new FormData();
        console.log(invoiceData)
        console.log(formData)

        Object.entries(invoiceData).forEach(([key, value]) => {
            if (value !== "") {
                formData.append(key, value);
            }
        });


        axios
            .post(`${import.meta.env.VITE_API_BASE}/api/admin/createInvoice`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    toast.success(response.data.message);
                } else {
                    console.error("Failed to create project");
                    toast.success(response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error(error.response.data.message);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData({ ...invoiceData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
                <FormControl id="date1" width={150} isRequired>
                    <FormLabel>Invoice Date</FormLabel>
                    <MyDatePicker
                        selected={invoiceData.date1}
                        onChange={(date) =>
                            setInvoiceData({ ...invoiceData, date1: `${date.toDate()}` })
                        }
                        defaultValue={moment()}
                        format={"DD/MM/YYYY"}
                    />
                </FormControl>
                <FormControl id="time1" width={150} isRequired>
                    <FormLabel>Enquiry Date</FormLabel>
                    <TimePicker
                        selected={invoiceData.time1}
                        onChange={(time) => setInvoiceData({ ...invoiceData, time1: `${time}` })}
                        defaultValue={moment()}
                        format={"hh:mm:ss"}
                        disabled />
                </FormControl>
            </div>
            <div className="flex gap-3 mt-3">
                <FormControl id="client_id" isRequired>
                    <FormLabel>Client Name</FormLabel>
                    <SelectClient selectSourceValue={clients} setSelectSourceValue={setClients} />
                </FormControl>
            </div>
            <div className="flex gap-3 mt-3">
                <FormControl id="gst" isRequired>
                    <FormLabel>Gst</FormLabel>
                    <Input name="gst" onChange={handleChange} isRequired />
                </FormControl>
                <FormControl id="unitPrice" isRequired>
                    <FormLabel>Unit Price</FormLabel>
                    <Input value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} isRequired />
                </FormControl>
                <FormControl id="quantity" isRequired>
                    <FormLabel>Quantity</FormLabel>
                    <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} isRequired />
                </FormControl>
            </div>
            <div className='mt-3'>
                <FormLabel>Service Description</FormLabel>
                <Textarea value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} />
            </div>
            <div className="flex gap-3 mt-3">
                <FormControl id="tags" isRequired>
                    <FormLabel>Product</FormLabel>
                    <Flex>
                        <SelectProduct
                            selectSourceValue={selectProductValue}
                            setSelectSourceValue={setSelectProductValue}
                        />
                    </Flex>
                </FormControl>
                <FormControl id="startDate">
                    <FormLabel>Start Date</FormLabel>
                    <MyDatePicker
                        format={"DD/MM/YYYY"}
                        onChange={(date) => { setInvoiceData({ ...invoiceData, services: { ...invoiceData.services, startDate: date } }) }}
                    />
                </FormControl>
                <FormControl id="endDate">
                    <FormLabel>End Date</FormLabel>
                    <MyDatePicker
                        format={"DD/MM/YYYY"}
                        onChange={(date) => { setInvoiceData({ ...invoiceData, services: { ...invoiceData.services, endDate: date } }) }}
                    />
                </FormControl>
            </div>

            <Button type="submit" colorScheme="purple" className="mt-5">
                Create Invoice
            </Button>
        </form>
    )
}

export default Invoice