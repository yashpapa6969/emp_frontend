import { FormControl, FormLabel, VStack, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Textarea } from "@chakra-ui/react"
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
                <Tabs>
                    <TabList>
                        <Tab>Personal Information</Tab>
                        <Tab>Address Information</Tab>
                        <Tab>Business Information</Tab>
                        <Tab>Additional Information</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <div className="flex gap-3 mb-3">
                                <FormControl id="source" isRequired>
                                    <FormLabel>Source</FormLabel>
                                    <Input name="source" onChange={handleChange} className="max-w-[400px]" />
                                </FormControl>
                            </div>
                            <div className="flex gap-3 flex-col md:flex-row">
                                <FormControl id="clientName" isRequired>
                                    <FormLabel>Client Name</FormLabel>
                                    <Input name="clientName" onChange={handleChange} />
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
                        </TabPanel>
                        <TabPanel>
                            <div className="flex gap-3 flex-col md:flex-row">
                                <FormControl id="country" isRequired>
                                    <FormLabel>Country</FormLabel>
                                    <CountryDropdown
                                        name="country"
                                        value={selectedCountry}
                                        onChange={(e) => handleSelectChange(setSelectedCountry, "country", e)}
                                        className="border-[0.375px] rounded-md h-[2rem]" />
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
                                <FormControl id="city" isRequired>
                                    <FormLabel>City</FormLabel>
                                    <Input name="city" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="pincode" isRequired>
                                    <FormLabel>Pincode</FormLabel>
                                    <Input name="pincode" onChange={handleChange} />
                                </FormControl>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <FormControl id="brandName" mb={3} isRequired >
                                <FormLabel>Brand Name</FormLabel>
                                <Input name="brandName" onChange={handleChange} />
                            </FormControl>
                            <FormControl id="businessAddress" isRequired>
                                <FormLabel>Business Address</FormLabel>
                                <Input name="businessAddress" onChange={handleChange} />
                            </FormControl>
                        </TabPanel>
                        <TabPanel>
                            <FormControl id="requirement" mb={4}>
                                <FormLabel>Requirement</FormLabel>
                                <Input name="requirement" onChange={handleChange} />
                            </FormControl>
                            <FormControl id="additionalInformation">
                                <FormLabel>Additional Information</FormLabel>
                                <Textarea name="additionalInformation" onChange={handleChange} />
                            </FormControl>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Button type="submit" colorScheme="purple">
                    Create Lead
                </Button>
            </VStack>
        </form>
    )
}

export default Lead