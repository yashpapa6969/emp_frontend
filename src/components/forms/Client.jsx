import {
    FormControl,
    FormLabel,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    // Select,
    Tag,
    TagLabel,
    TagCloseButton,
    Flex,
    Input
} from "@chakra-ui/react";
import { Select } from "antd";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { toast } from "react-toastify";
import moment from "moment";
import SelectSource from "../common/SelectSource";
import MyDatePicker from "../common/MyDatePicker";
import SelectTag from "../common/SelectTag";

const Client = () => {
    const singleFileRef = useRef();
    const [projectData, setProjectData] = useState({
        enquiryDate: new Date(),
        clientBirthday: "",
        clientAnniversary: "",
        companyAnniversary: "",
        WorkStartDate: "",
        source: [],
        companyName: "",
        clientName: "",
        brandName: "",
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
        status: "",
        singleFile: null,
        multipleFiles: [],
    });

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [tags, setTags] = useState([]);
    const [selectSourceValue, setSelectSourceValue] = useState([]);
    const [selectedTagValue, setSelectedTagValue] = useState([])

    const removeTagById = (tagToRemove) => {
        setProjectData({
            ...projectData,
            source: projectData.source.filter((tag) => tag !== tagToRemove),
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };
    const getTagNameById = (id) => {
        const tag = tags.find((tag) => tag.source_tag_id === id);
        return tag ? tag.sourceTagName : "Unknown Tag";
    };
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE}/api/admin/sourceGetAllTags`)
            .then((response) => {
                setTags(response.data);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

    const handleTagChange = (e) => {
        const selectedTags = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );

        // Fetch tag names for selected tag IDs
        const selectedTagNames = selectedTags.map((tagId) => getTagNameById(tagId));
        console.log(selectedTagNames);

        // Update projectData with tag names
        setProjectData({
            ...projectData,
            source: [...projectData.source, ...selectedTagNames],
        });
    };
    const handleSelectChange = (setSelected, name, value) => {
        setSelected(value);
        setProjectData({ ...projectData, [name]: value });
    };
    const handleSingleFileChange = (e) => {
        setProjectData({ ...projectData, singleFile: e.target.files[0] });
    };

    const handleMultipleFilesChange = (e) => {
        const files = Array.from(e.target.files);
        setProjectData({
            ...projectData,
            multipleFiles: [...projectData.multipleFiles, ...files],
        });
    };

    const handleDeleteSingleFile = () => {
        singleFileRef.current.value = "";
        const { singleFile, ...newData } = projectData;
        setProjectData({ ...newData });
    };

    const handleDeleteMultipleFile = (index) => {
        const updatedFiles = [...projectData.multipleFiles];
        updatedFiles.splice(index, 1);
        setProjectData({ ...projectData, multipleFiles: updatedFiles });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Filter out entries with empty string values
        Object.entries(projectData).forEach(([key, value]) => {
            if (value !== "") {
                formData.append(key, value);
            }
        });

        axios
            .post(
                `${import.meta.env.VITE_API_BASE}/api/admin/createClient`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
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


    return (
        <form onSubmit={handleSubmit}>
            { /* <FormControl id="enquiryDate" isRequired>
                <FormLabel>Enquiry Date</FormLabel>
                <MyDatePicker
                    selected={projectData.enquiryDate}
                    onChange={(date) =>
                        setProjectData({ ...projectData, enquiryDate: date })
                    }
                    defaultValue={moment()}
                    format={"DD/MM/YYYY"}
                />
            </FormControl>
                */}
            <div className="hidden md:block">
                <Tabs>
                    <TabList>
                        <Tab>Client Information</Tab>
                        <Tab>Address Information</Tab>
                        <Tab>Personal Information</Tab>
                        <Tab>Additional Information</Tab>
                        <Tab>Files Information</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <div className="flex gap-3 mb-3">
                                <FormControl id="clientName" maxWidth={200} isRequired>
                                    <FormLabel>Client Name</FormLabel>
                                    <Input name="clientName" onChange={handleChange} isRequired />
                                </FormControl>
                                <FormControl id="brandName" maxWidth={200} isRequired>
                                    <FormLabel>Brand Name</FormLabel>
                                    <Input name="brandName" onChange={handleChange} isRequired />
                                </FormControl>
                                <FormControl id="companyName" maxWidth={200} isRequired>
                                    <FormLabel>Company Name</FormLabel>
                                    <Input
                                        name="companyName"
                                        onChange={handleChange}
                                        isRequired
                                    />
                                </FormControl>
                            </div>
                            <FormControl id="tags" isRequired>
                                <FormLabel>Source</FormLabel>
                                <Flex>
                                    <SelectSource
                                        selectSourceValue={selectSourceValue}
                                        setSelectSourceValue={setSelectSourceValue}
                                    />
                                </Flex>
                            </FormControl>
                            <div className="flex gap-3 my-3">
                                <FormControl id="phone1" maxWidth={200} isRequired>
                                    <FormLabel>Phone Number 1</FormLabel>
                                    <Input name="phone1" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="phone2" maxWidth={200}>
                                    <FormLabel>Phone Number 2</FormLabel>
                                    <Input name="phone2" onChange={handleChange} />
                                </FormControl>
                            </div>

                            <div className="flex gap-3 mb-3">
                                <FormControl id="email1" maxWidth={200}>
                                    <FormLabel>Email 1</FormLabel>
                                    <Input name="email1" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="email2" maxWidth={200}>
                                    <FormLabel>Email 2</FormLabel>
                                    <Input name="email2" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="website" maxWidth={200}>
                                    <FormLabel>Website</FormLabel>
                                    <Input name="website" onChange={handleChange} />
                                </FormControl>
                            </div>
                            <div className="flex gap-3">
                                <FormControl id="companyAnniversary" isRequired>
                                    <FormLabel>Work Start Date</FormLabel>
                                    <MyDatePicker
                                        selected={projectData.workStartDate}
                                        onChange={(date) =>
                                            setProjectData({ ...projectData, workStartDate: date })
                                        }
                                        format={"DD/MM/YYYY"}
                                    />
                                </FormControl>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="flex gap-3 mb-3 flex-col md:flex-row">
                                <FormControl id="country">
                                    <FormLabel>Country</FormLabel>
                                    <CountryDropdown
                                        name="country"
                                        value={selectedCountry}
                                        onChange={(e) =>
                                            handleSelectChange(setSelectedCountry, "country", e)
                                        }
                                        className="border-[0.375px] rounded-md max-w-[200px] h-[2rem]"
                                    />
                                </FormControl>
                                <FormControl id="state">
                                    <FormLabel>State</FormLabel>
                                    <RegionDropdown
                                        country={selectedCountry}
                                        name="state"
                                        value={selectedState}
                                        onChange={(e) =>
                                            handleSelectChange(setSelectedState, "state", e)
                                        }
                                        className="border-[0.375px] rounded-md h-[2rem] max-w-24"
                                    />
                                </FormControl>
                                <FormControl id="city">
                                    <FormLabel>City</FormLabel>
                                    <Input name="city" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="pincode" isRequired>
                                    <FormLabel>Pincode</FormLabel>
                                    <Input name="pincode" onChange={handleChange} />
                                </FormControl>
                            </div>
                            <FormControl id="businessAddress" className="w-1/2">
                                <FormLabel>Business Address</FormLabel>
                                <Input
                                    name="businessAddress"
                                    onChange={handleChange}
                                    className="h-32"
                                />
                            </FormControl>
                        </TabPanel>

                        <TabPanel>
                            <div className="flex gap-3">
                                <FormControl id="clientBirthday" maxWidth={150}>
                                    <FormLabel>Client Birthday</FormLabel>
                                    <MyDatePicker
                                        selected={projectData.clientBirthday}
                                        onChange={(date) =>
                                            setProjectData({ ...projectData, clientBirthday: date })
                                        }
                                        format={"DD/MM/YYYY"}
                                    />
                                </FormControl>
                                <FormControl id="clientAnniversary" maxWidth={150}>
                                    <FormLabel>Client Anniversary</FormLabel>
                                    <MyDatePicker
                                        selected={projectData.clientAnniversary}
                                        onChange={(date) =>
                                            setProjectData({
                                                ...projectData,
                                                clientAnniversary: date,
                                            })
                                        }
                                        format={"DD/MM/YYYY"}
                                    />
                                </FormControl>
                                <FormControl id="companyAnniversary">
                                    <FormLabel>Company Anniversary</FormLabel>
                                    <MyDatePicker
                                        selected={projectData.companyAnniversary}
                                        onChange={(date) =>
                                            setProjectData({
                                                ...projectData,
                                                companyAnniversary: date,
                                            })
                                        }
                                        format={"DD/MM/YYYY"}
                                    />
                                </FormControl>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="flex flex-col gap-3">
                                <FormControl id="requirement" className="w-1/2">
                                    <FormLabel>Requirement</FormLabel>
                                    {/* <Input
                                        name="requirement"
                                        onChange={handleChange}
                                        className="h-16"
                                    /> */}
                                    <SelectTag selectTagValue={selectedTagValue} setSelectTagValue={setSelectedTagValue} />
                                </FormControl>
                                <FormControl id="additionalInformation" className="w-1/2">
                                    <FormLabel>Additional Information</FormLabel>
                                    <Input
                                        name="additionalInformation"
                                        onChange={handleChange}
                                        className="h-16"
                                    />
                                </FormControl>
                            </div>
                            <FormControl id="status">
                                <FormLabel>Status</FormLabel>
                                <Input name="status" onChange={handleChange} />
                            </FormControl>
                        </TabPanel>
                        <TabPanel>
                            <div className="flex gap-3">
                                {/* Display single file */}
                                {projectData.singleFile && (
                                    <div>
                                        <p>Single File: {projectData.singleFile.name}</p>
                                        <Button onClick={handleDeleteSingleFile}>Delete</Button>
                                    </div>
                                )}
                                <FormControl mb="4">
                                    <FormLabel>Single File</FormLabel>
                                    <Input type="file" ref={singleFileRef} onChange={handleSingleFileChange} />
                                </FormControl>
                            </div>
                            <div className="flex gap-3">
                                {/* Display multiple files */}
                                {projectData.multipleFiles.map((file, index) => (
                                    <div key={index}>
                                        <p>
                                            File {index + 1}: {file.name}
                                        </p>
                                        <Button onClick={() => handleDeleteMultipleFile(index)}>
                                            Delete
                                        </Button>
                                    </div>
                                ))}
                                <FormControl mb="4">
                                    <FormLabel>Multiple Files</FormLabel>
                                    <Input
                                        type="file"
                                        multiple
                                        onChange={handleMultipleFilesChange}
                                    />
                                </FormControl>
                            </div>
                            <Button type="submit" colorScheme="purple" className="mt-5">
                                Create Client
                            </Button>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>

            <div className="block md:hidden">
                <Tabs>
                    <TabList>
                        <Tab>Personal Information</Tab>
                        <Tab>Other Information</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <div className="flex flex-col gap-3 mb-3">
                                <FormControl id="clientName" isRequired>
                                    <FormLabel>Client Name</FormLabel>
                                    <Input name="clientName" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="phone1" isRequired>
                                    <FormLabel>Phone Number 1</FormLabel>
                                    <Input name="phone1" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="phone2" isRequired>
                                    <FormLabel>Phone Number 2</FormLabel>
                                    <Input name="phone2" onChange={handleChange} />
                                </FormControl>
                            </div>
                            <div className="flex gap-3 mb-3">
                                <FormControl id="tags" isRequired>
                                    <FormLabel>Source</FormLabel>
                                    <Select
                                        onChange={handleTagChange}
                                        size="md"
                                        placeholder="Select Source"
                                        isRequired
                                    >
                                        {tags.map((tag) => (
                                            <option key={tag._id} value={tag.source_tag_id}>
                                                {tag.sourceTagName}
                                            </option>
                                        ))}
                                    </Select>

                                    {projectData.source.map((tag) => (
                                        <Tag
                                            key={tag._id}
                                            size="md"
                                            borderRadius="full"
                                            variant="solid"
                                            colorScheme="blue"
                                        >
                                            <TagLabel>{tag}</TagLabel>
                                            <TagCloseButton onClick={() => removeTagById(tag)} />
                                        </Tag>
                                    ))}
                                </FormControl>
                                <FormControl id="gender">
                                    <FormLabel>Gender</FormLabel>
                                    <Select
                                        name="gender"
                                        onChange={handleChange}
                                        placeholder="Select gender"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="flex flex-col gap-3">
                                <FormControl id="email1">
                                    <FormLabel>Email 1</FormLabel>
                                    <Input name="email1" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="email2">
                                    <FormLabel>Email 2</FormLabel>
                                    <Input name="email2" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="website">
                                    <FormLabel>Website</FormLabel>
                                    <Input name="website" onChange={handleChange} />
                                </FormControl>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="flex gap-3 mb-3 flex-col md:flex-row">
                                <FormControl id="country">
                                    <FormLabel>Country</FormLabel>
                                    <CountryDropdown
                                        name="country"
                                        value={selectedCountry}
                                        onChange={(e) =>
                                            handleSelectChange(setSelectedCountry, "country", e)
                                        }
                                        className="border-[0.375px] rounded-md max-w-[200px] h-[2rem]"
                                    />
                                </FormControl>
                                <FormControl id="state">
                                    <FormLabel>State</FormLabel>
                                    <RegionDropdown
                                        country={selectedCountry}
                                        name="state"
                                        value={selectedState}
                                        onChange={(e) =>
                                            handleSelectChange(setSelectedState, "state", e)
                                        }
                                        className="border-[0.375px] rounded-md h-[2rem] max-w-24"
                                    />
                                </FormControl>
                                <FormControl id="city">
                                    <FormLabel>City</FormLabel>
                                    <Input name="city" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="pincode" isRequired>
                                    <FormLabel>Pincode</FormLabel>
                                    <Input name="pincode" onChange={handleChange} />
                                </FormControl>
                            </div>
                            <FormControl id="businessAddress" className="w-1/2">
                                <FormLabel>Business Address</FormLabel>
                                <Input
                                    name="businessAddress"
                                    onChange={handleChange}
                                    className="h-32"
                                />
                            </FormControl>
                            <div className="flex flex-col mt-3 gap-3">
                                <FormControl id="brandName" mb={3} isRequired>
                                    <FormLabel>Brand Name</FormLabel>
                                    <Input name="brandName" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="companyName" mb={3} isRequired>
                                    <FormLabel>Company Name</FormLabel>
                                    <Input name="companyName" onChange={handleChange} />
                                </FormControl>
                                <FormControl id="gst" mb={3}>
                                    <FormLabel>GST</FormLabel>
                                    <Input name="gst" onChange={handleChange} />
                                </FormControl>
                            </div>
                            <FormControl id="billingAddress" isRequired className="w-1/2">
                                <FormLabel>Billing Address</FormLabel>
                                <Input
                                    name="billingAddress"
                                    onChange={handleChange}
                                    className="h-32"
                                />
                            </FormControl>
                            <div className="flex flex-col mt-3 gap-3">
                                <FormControl id="requirement" className="w-1/2">
                                    <FormLabel>Requirement</FormLabel>
                                    <Input
                                        name="requirement"
                                        onChange={handleChange}
                                        className="h-16"
                                    />
                                </FormControl>
                                <FormControl id="additionalInformation" className="w-1/2">
                                    <FormLabel>Additional Information</FormLabel>
                                    <Input
                                        name="additionalInformation"
                                        onChange={handleChange}
                                        className="h-16"
                                    />
                                </FormControl>
                            </div>
                            <div className="flex mt-3 gap-3">
                                {/* Display single file */}
                                {projectData.singleFile && (
                                    <div>
                                        <p>Single File: {projectData.singleFile.name}</p>
                                        <Button onClick={handleDeleteSingleFile}>Delete</Button>
                                    </div>
                                )}
                                <FormControl mb="4">
                                    <FormLabel>Single File</FormLabel>
                                    <Input type="file" onChange={handleSingleFileChange} />
                                </FormControl>
                            </div>
                            <div className="flex gap-3">
                                {/* Display multiple files */}
                                {projectData.multipleFiles.map((file, index) => (
                                    <div key={index}>
                                        <p>
                                            File {index + 1}: {file.name}
                                        </p>
                                        <Button onClick={() => handleDeleteMultipleFile(index)}>
                                            Delete
                                        </Button>
                                    </div>
                                ))}
                                <FormControl mb="4">
                                    <FormLabel>Multiple Files</FormLabel>
                                    <Input
                                        type="file"
                                        multiple
                                        onChange={handleMultipleFilesChange}
                                    />
                                </FormControl>
                            </div>
                            <Button type="submit" colorScheme="purple" className="mt-5">
                                Create Client
                            </Button>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </form>
    );
};

export default Client;
