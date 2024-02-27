import { FormControl, FormLabel, VStack, Button } from "@chakra-ui/react"
import { DatePicker, Input } from "antd"
import axios from "axios";
import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { toast } from "react-toastify";
import moment from 'moment';

const Lead = () => {
    const [projectData, setProjectData] = useState({
        enquiryDate: new Date(),
        source: "",
        brandName: "",
        firstName: "",
        lastName: "",
        phone1: "",
        phone2: "",
        email1: "",
        email2: "",
        website: "",
        businessAddress: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        requirement: "",
        additionalInformation: "",
    });

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSelectChange = (setSelected, name, value) => {
        setSelected(value);
        setProjectData({ ...projectData, [name]: value });
    }

    console.log(projectData)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/createLead",
                projectData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    toast.success(response.data.message);
                } else {
                    console.error("Failed to create project");
                    console.log(response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                console.log(error.response.data.message);
                console.log(error);
                toast.error(error.response.data.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl id="enquiryDate" isRequired>
                <FormLabel>Enquiry Date</FormLabel>
                <DatePicker
                    selected={projectData.enquiryDate}
                    onChange={(date) =>
                        setProjectData({ ...projectData, enquiryDate: date })
                    }
                    dateFormat="MM/dd/yyyy"
                    defaultValue={moment()}
                />
            </FormControl>
            <VStack spacing={4} align="stretch" mt={4}>
                <div className="flex gap-3">
                    <FormControl id="source" isRequired>
                        <FormLabel>Source</FormLabel>
                        <Input name="source" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="brandName" isRequired >
                        <FormLabel>Brand Name</FormLabel>
                        <Input name="brandName" onChange={handleChange} />
                    </FormControl>
                </div>
                <div className="flex gap-3">
                    <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input name="firstName" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="lastName" isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input name="lastName" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="phone1" isRequired>
                        <FormLabel>Phone Number 1</FormLabel>
                        <Input name="phone1" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="phone2">
                        <FormLabel>Phone Number 2</FormLabel>
                        <Input name="phone2" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="email1" isRequired>
                        <FormLabel>Email 1</FormLabel>
                        <Input name="email1" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="email2">
                        <FormLabel>Email 2</FormLabel>
                        <Input name="email2" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="website" isRequired>
                        <FormLabel>Website</FormLabel>
                        <Input name="website" onChange={handleChange} />
                    </FormControl>
                </div>
                <div className="flex gap-3">
                    <FormControl id="businessAddress" isRequired>
                        <FormLabel>Business Address</FormLabel>
                        <Input name="businessAddress" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="city" isRequired>
                        <FormLabel>City</FormLabel>
                        <Input name="city" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="state" isRequired>
                        <FormLabel>State</FormLabel>
                        <RegionDropdown
                            country={selectedCountry}
                            name="state"
                            value={selectedState}
                            onChange={(e) => handleSelectChange(setSelectedState, "state", e)}
                            className="border-[0.375px] rounded-md h-[2rem] max-w-24" />
                    </FormControl>
                    <FormControl id="pincode" isRequired>
                        <FormLabel>Pincode</FormLabel>
                        <Input name="pincode" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="country" isRequired>
                        <FormLabel>Country</FormLabel>
                        <CountryDropdown
                            name="country"
                            value={selectedCountry}
                            onChange={(e) => handleSelectChange(setSelectedCountry, "country", e)}
                            className="border-[0.375px] rounded-md h-[2rem]" />
                    </FormControl>
                </div>
                <div className="flex gap-3">
                    <FormControl id="requirement">
                        <FormLabel>Requirement</FormLabel>
                        <Input name="requirement" onChange={handleChange} />
                    </FormControl>
                    <FormControl id="additionalInformation">
                        <FormLabel>Additional Information</FormLabel>
                        <Input name="additionalInformation" onChange={handleChange} />
                    </FormControl>
                </div>

                <Button type="submit" colorScheme="purple">
                    Create Lead
                </Button>
            </VStack>
        </form>
    )
}

export default Lead