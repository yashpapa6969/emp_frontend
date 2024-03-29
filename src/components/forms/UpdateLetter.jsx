import { useState, useEffect, useRef } from "react";
import {
    Input,
    Button,
    FormControl,
    FormLabel,
    Text,
    Box,
    VStack
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectLetterId } from "../../store/slice/LetterSlice";
import { setLetterId } from "../../store/slice/LetterSlice"; // Import the necessary action

const RequiredIndicator = () => {
    return (
        <Text as="span" color="red.500" ml={1}>
            *
        </Text>
    );
};

const UpdateLetter = () => {
    const singleFileRef = useRef();
    const dispatch = useDispatch();
    const letterId = useSelector(selectLetterId);
    const [letterData, setLetterData] = useState({
        name: "",
        createdAt: "",
        singleFile: null,
        singleFileView: "",
        singleFileToRemove: ""
    });

    useEffect(() => {
        // Fetch letter data using letterId
        axios
            .get(
                `${import.meta.env.VITE_API_BASE}/api/admin/getLetterById/${letterId}`
            )
            .then((response) => {
                const { name, createdAt, singleFile } = response.data;
                setLetterData({
                    name: name || "",
                    createdAt: createdAt || "",
                    singleFileView: singleFile || null,
                });
            })
            .catch((error) => {
                console.error("Error fetching letter details:", error);
                toast.error("Failed to fetch letter details");
            });
    }, [letterId]); // Add letterId to the dependency array

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLetterData({ ...letterData, [name]: value });
    };

    const handleSingleFileChange = (e) => {
        setLetterData({ ...letterData, singleFile: e.target.files[0] });
    };

    const handleDeleteSingleFile = () => {
        singleFileRef.current.value = "";
        const { singleFile, ...newData } = letterData;
        setLetterData({ ...newData });
    };

    const handleAddSingleFileToRemove = (filename) => {
        letterData.singleFileToRemove = filename;
        letterData.singleFileView = null;
        setLetterData({ ...letterData });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", letterData.name);
        formDataToSend.append("createdAt", letterData.createdAt); // Append createdAt to the FormData
        if (letterData.singleFile) {
            formDataToSend.append("singleFile", letterData.singleFile); // Change file to singleFile
        }

        // Append singleFileToRemove if it's not null
        if (letterData.singleFileToRemove) {
            formDataToSend.append("singleFileToRemove", letterData.singleFileToRemove);
        }

        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_BASE}/api/admin/updateLetter/${letterId}`,
                formDataToSend
            );
            if (response.status === 200) {
                toast.success(response.data.message);
                // Redirect to success page or update the state accordingly
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    const formatDate = (date) => {
        if (!date) return ""; // Handle the case where date is null or undefined
        return moment(date).format("YYYY-MM-DD");
    };

    return (
        <Box
            mx="auto"
            borderWidth="1px"
            borderRadius="lg"
            p="4"
            boxShadow="lg"
            m="4"
        >
            <h1 className="text-2xl font-semibold">Update Letter</h1>
            <p className="font-light mb-4">
                Fill the form below to update the letter details
            </p>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl id="name">
                        <FormLabel>
                            Name <RequiredIndicator />
                        </FormLabel>
                        <Input
                            width={300}
                            name="name"
                            onChange={handleChange}
                            value={letterData.name}
                        />
                    </FormControl>
                    <FormControl id="createdAt">
                        <FormLabel>
                            Created At <RequiredIndicator />
                        </FormLabel>
                        <Input
                            width={300}
                            type="date"
                            name="createdAt"
                            onChange={handleChange}
                            value={formatDate(letterData.createdAt)} // Format the date
                        />
                    </FormControl>
                    <div>
                        <h2 className="font-semibold text-lg">Existing Letter</h2>
                        <div className="flex gap-3">
                            {letterData.singleFileView && (
                                <div>
                                    <div className="flex gap-1">
                                        <p>File : {letterData.singleFileView}</p>
                                        <Button
                                            as="a"
                                            href={`${import.meta.env.VITE_API_BASE
                                                }/uploads/${letterData.singleFileView}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            textDecoration="none"
                                            _hover={{ textDecoration: "none" }}
                                            display="inline-block"
                                            variant="solid"
                                        >
                                            View
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                handleAddSingleFileToRemove(
                                                    letterData.singleFileView
                                                );
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <FormControl mb="4">
                            <FormLabel>Add New Letter</FormLabel>
                            <Input
                                type="file"
                                ref={singleFileRef}
                                onChange={handleSingleFileChange}
                            />
                        </FormControl>
                        {/* Display single file */}
                        {letterData.singleFile && (
                            <div className="mb-4 bg-gray-200 rounded-md p-2 flex gap-2">
                                <p>{letterData.singleFile.name}</p>
                                <Button onClick={handleDeleteSingleFile} size={"sm"}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <Button mt={6} type="submit" colorScheme="purple">
                        Update Letter
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default UpdateLetter;
