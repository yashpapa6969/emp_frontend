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
} from "@chakra-ui/react";
import { DatePicker, Input, Select } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { toast } from "react-toastify";
import moment from "moment";
import SelectSource from "../common/SelectSource";
import MyDatePicker from "../common/MyDatePicker";

const Emp = () => {
  const [projectData, setProjectData] = useState({
    name: "",
    gender: "",
    contactNo: "",
    title: "",
    dob: "",
    position: "",
    designation: "",
    department: "",
    email: "",
    password: "",
    joiningDate: "",
    manager_id: "",
    probationPeriod: "",
    leavingDate:"",
    aadharNumber: "",
    panNumber: "",
    permanentAddress: "",
    correspondenceAddress: "",
    guardianDetails: {
      guardianName: "",
      guardianContactNo: "",
    },
    bankDetails: {
      bankName: "",
      bankAccountNo: "",
      bankIfscCode: "",
      type: "",
    },
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [tags, setTags] = useState([]);
   const [managers, setManagers] = useState([]); 
  const [selectSourceValue, setSelectSourceValue] = useState([]);

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
      .get(`${import.meta.env.VITE_API_BASE}/api/admin/getManagersAllDetails`)
      .then((response) => {
        setManagers(response.data);
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
    setProjectData({ ...projectData, singleFile: null });
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
        `${import.meta.env.VITE_API_BASE}/api/admin/createEmployee`,
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
   const handleSelectManager = (e) => {
     // Update selected manager ID in projectData
     const selectedManagerId = e.target.value;
     setProjectData({ ...projectData, manager_id: selectedManagerId });
   };

  return (
    <form onSubmit={handleSubmit}>
      <div className="hidden md:block">
        <Tabs>
          <TabList>
            <Tab>Employee Information</Tab>
            <Tab>Address Information</Tab>
            <Tab>Guardian Information</Tab>
            <Tab>Bank Information</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="flex gap-3 mb-3">
                <FormControl id="employeeName" isRequired>
                  <FormLabel>Employee Name</FormLabel>
                  <Input name="name" onChange={handleChange} isRequired />
                </FormControl>
                <FormControl id="title" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Select
                    name="title"
                    onChange={handleChange}
                    placeholder="Select Title"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                  </Select>
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
                <FormControl id="contactNo" isRequired>
                  <FormLabel>Contact Number</FormLabel>
                  <Input name="contactNo" onChange={handleChange} isRequired />
                </FormControl>
              </div>
              <div className="flex gap-3 mb-3">
                <FormControl id="dob" isRequired>
                  <FormLabel>DOB</FormLabel>
                  <MyDatePicker
                    selected={projectData.dob}
                    onChange={(date) =>
                      setProjectData({ ...projectData, dob: date })
                    }
                    format={"DD/MM/YYYY"}
                  />
                </FormControl>
                <FormControl id="position" isRequired>
                  <FormLabel>Position</FormLabel>
                  <Input name="position" onChange={handleChange} isRequired />
                </FormControl>
                <FormControl id="designation" isRequired>
                  <FormLabel>Designation</FormLabel>
                  <Input
                    name="designation"
                    onChange={handleChange}
                    isRequired
                  />
                </FormControl>
              </div>

              <div className="flex gap-3 mb-3">
                <FormControl id="department" isRequired>
                  <FormLabel>Department</FormLabel>
                  <Input name="department" onChange={handleChange} />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input name="email" onChange={handleChange} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>password</FormLabel>
                  <Input name="password" onChange={handleChange} />
                </FormControl>
              </div>

              <div className="flex gap-3">
                <FormControl id="joiningDate" isRequired>
                  <FormLabel>Joining Date</FormLabel>
                  <MyDatePicker
                    selected={projectData.dob}
                    onChange={(date) =>
                      setProjectData({ ...projectData, joiningDate: date })
                    }
                    format={"DD/MM/YYYY"}
                  />
                </FormControl>
                <FormControl id="manager_id">
                  <FormLabel>Select Manager</FormLabel>
                  <select
                    onChange={handleSelectManager}
                    value={projectData.manager_id}
                  >
                    <option value="">Select Manager</option>
                    {managers.map((manager, index) => (
                      <option key={`manager-${index}`} value={manager.id}>
                        {manager.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex gap-3">
                <FormControl id="permanentAddress" className="w-1/2">
                  <FormLabel>Permanent Address</FormLabel>
                  <Input
                    name="permanentAddress"
                    onChange={handleChange}
                    className="h-32"
                  />
                </FormControl>
                <FormControl id="correspondenceAddress" className="w-1/2">
                  <FormLabel>Correspondence Address</FormLabel>
                  <Input
                    name="correspondenceAddress"
                    onChange={handleChange}
                    className="h-32"
                  />
                </FormControl>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex gap-3">
                <FormControl id="guardianDetails.guardianName" isRequired>
                  <FormLabel>Guardian Name</FormLabel>
                  <Input
                    name="guardianDetails.guardianName"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="guardianDetails.guardianContactNo" isRequired>
                  <FormLabel>Guardian Contact Number</FormLabel>
                  <Input
                    name="guardianDetails.guardianContactNo"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex gap-3">
                <FormControl id="bankDetails.bankName" isRequired>
                  <FormLabel>Bank Name </FormLabel>
                  <Input name="bankDetails.bankName" onChange={handleChange} />
                </FormControl>
                <FormControl id="bankDetails.bankAccountNo" isRequired>
                  <FormLabel>Bank Account Number </FormLabel>
                  <Input name="bankDetails.bankAccountNo" onChange={handleChange} />
                </FormControl>
             
              </div>
              <div className="flex gap-3">
                <FormControl id="bankDetails.bankIfscCode" >
                  <FormLabel>Bank IFSC Code </FormLabel>
                  <Input name="bankDetails.bankIfscCode" onChange={handleChange} />
                </FormControl>
                <FormControl id="bankDetails.type" >
                  <FormLabel>Bank Type </FormLabel>
                  <Input name="bankDetails.type" onChange={handleChange} />
                </FormControl>    
              </div>
              <Button type="submit" colorScheme="purple" className="mt-5">
                Create Employee
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
                <FormControl id="brandName" isRequired>
                  <FormLabel>Brand Name</FormLabel>
                  <Input name="brandName" onChange={handleChange} />
                </FormControl>
                <FormControl id="companyName" isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input name="companyName" onChange={handleChange} />
                </FormControl>
                <FormControl id="gst">
                  <FormLabel>GST</FormLabel>
                  <Input name="gst" onChange={handleChange} />
                </FormControl>
              </div>
              <FormControl id="billingAddress" isRequired className="w-1/2 mt-3">
                <FormLabel>Billing Address</FormLabel>
                <Input
                  name="billingAddress"
                  onChange={handleChange}
                  className="h-32"
                />
              </FormControl>
              <div className="flex flex-col gap-3 mt-3">
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

              <Button type="submit" colorScheme="purple" className="mt-5">
                Create Employee
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </form>
  );
};

export default Emp;
