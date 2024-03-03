import {
    Box,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import Invoice from "./forms/Invoice";

const CreateInvoice = () => {
    return (
        <>
            <ToastContainer></ToastContainer>
            <Box
                mx="auto"
                borderWidth="1px"
                borderRadius="lg"
                p="4"
                boxShadow="lg"
                m="4"
            >
                <h1 className="text-2xl font-semibold">Add Employee</h1>
                <p className="font-light mb-4">Fill the below form to add a new employee</p>

                <Invoice />
            </Box>
        </>
    );
};

export default CreateInvoice;
