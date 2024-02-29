import { useEffect, useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker, Tag } from "antd"
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import SelectSource from "../common/SelectSource";

const TagRender = ({ label, closable, onClose }) => {
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            // color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3,
            }}
        >
            {label}
        </Tag>
    );
};

const Client = () => {
    const [selectSourceValue, setSelectSourceValue] = useState([]);

    const [formData, setFormData] = useState({
        enquiryDate: new Date(),
        source: "",
        brandName: "",
        clientName: "",
        phone1: "",
        email1: "",
        singleFile: null,
        multipleFiles: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSingleFileChange = (e) => {
        setFormData({ ...formData, singleFile: e.target.files[0] });
    };

    const handleMultipleFilesChange = (e) => {
        setFormData({ ...formData, multipleFiles: [...e.target.files] });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleImageDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setImageFile(file);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        setFormData({
            ...formData,
            multipleFiles: [...formData.multipleFiles, ...files],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, source: selectSourceValue });

        const formDataToSend = new FormData();
        formDataToSend.append("enquiryDate", formData.enquiryDate);
        formDataToSend.append("source", formData.source);
        formDataToSend.append("brandName", formData.brandName);
        formDataToSend.append("clientName", formData.clientName);
        formDataToSend.append("phone1", formData.phone1);
        formDataToSend.append("email1", formData.email1);
        formDataToSend.append("singleFile", formData.singleFile);
        formData.multipleFiles.forEach((file) =>
            formDataToSend.append("multipleFiles", file)
        );

        axios
            .post(
                `${import.meta.env.VITE_API_BASE}/api/admin/createEnquiry`,
                formDataToSend
            )
            .then((response) => {
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.error("Error creating enquiry:", error);
                toast.error(error.response.data.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl mb="4">
                <FormLabel>Enquiry Date</FormLabel>
                <DatePicker
                    selected={formData.enquiryDate}
                    onChange={(date) =>
                        setFormData({ ...formData, enquiryDate: date })
                    }
                    dateFormat="MM/dd/yyyy"
                    defaultValue={moment()}
                />
            </FormControl>
            <FormControl id="sources" mb={4}>
                <FormLabel>Source</FormLabel>
                <Flex>
                    <SelectSource selectSourceValue={selectSourceValue} setSelectSourceValue={setSelectSourceValue} />
                </Flex>
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Brand Name</FormLabel>
                <Input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Client Name</FormLabel>
                <Input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Phone</FormLabel>
                <Input
                    type="number"
                    name="phone1"
                    value={formData.phone1}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl mb="4">
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    name="email1"
                    value={formData.email1}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl mb="4" onDragOver={handleDragOver} onDrop={handleDrop}>
                <FormLabel>Single File</FormLabel>
                <Input type="file" onChange={handleSingleFileChange} />
            </FormControl>
            <FormControl mb="4" onDragOver={handleDragOver} onDrop={handleDrop}>
                <FormLabel>Multiple Files</FormLabel>
                <Input type="file" multiple onChange={handleMultipleFilesChange} />
            </FormControl>
            <Flex justify="center">
                <Button type="submit" colorScheme="purple">
                    Submit
                </Button>
            </Flex>
        </form>
    )
}

export default Client