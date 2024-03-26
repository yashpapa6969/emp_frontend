import { Button, Text } from "@chakra-ui/react"
import { Empty, Modal } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";

const ViewLeadByBrand = ({ open, setOpen, brandName }) => {
    const [fetchedItems, setFetchedItems] = useState(null);

    useEffect(() => {
        if (brandName) {
            try {
                axios.post(`${import.meta.env.VITE_API_BASE}/api/admin/getLeadByBrandName`, { brandName: brandName })
                    .then((res) => {
                        setFetchedItems(res.data);
                    });
            } catch (error) {
                console.log(`Error fetching by brand: ${error}`)
            }
        }
    }, [])

    return (
        <Modal
            title="Lead Information"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={
                <>
                    <Button
                        onClick={() => setOpen(false)}
                        colorScheme="purple"
                    >
                        Done
                    </Button>
                </>
            }
        >
            {!fetchedItems ? (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<>No lead available</>} />)
                : (<>
                    {fetchedItems?.brandName && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Brand Name
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.brandName}
                            </Text>
                        </>
                    )}
                    {(fetchedItems?.clientName || fetchedItems?.title) && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Client Name
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.title} {fetchedItems?.clientName}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.gender && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Gender
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.gender}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.companyName && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Company Name
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.companyName}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.email && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Email
                            </Text>
                            <Text className="text-lg">
                                {fetchedItems?.email}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.state && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                State
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.state}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.country && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Country
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.country}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.createdAt && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Created At
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.createdAt}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.email1 && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Email
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.email1}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.enquiryDate && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Enquiry Date
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.enquiryDate}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.phone1 && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Phone
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.phone1}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.sourceInformation && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Source Information
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.sourceInformation}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.source && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Source
                            </Text>
                            {fetchedItems?.source.map((source, index) => (
                                <Text key={`source-${index}`} className="text-lg">{source}</Text>
                            ))}
                        </>
                    )}
                    {fetchedItems?.status && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Status
                            </Text>
                            <Text className="text-lg capitalize">
                                {fetchedItems?.status}
                            </Text>
                        </>
                    )}
                    {fetchedItems?.singleFile && (
                        <>
                            <Text className="text-sm font-bold text-gray-500 mt-3">
                                Single Files
                            </Text>
                            <Button
                                as="a"
                                href={`${import.meta.env.VITE_API_BASE}/uploads/${fetchedItems?.singleFile}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                textDecoration="none"
                                _hover={{ textDecoration: "none" }}
                                mb={2}
                                variant="solid"
                            >
                                View Single File
                            </Button>
                        </>
                    )}
                    <Text className="text-sm font-bold text-gray-500 mt-3">
                        Multiple Files
                    </Text>
                    <div className="flex gap-3 mt-4">
                        {fetchedItems?.multipleFiles ?
                            fetchedItems?.multipleFiles.map((data, index) => (
                                <Button
                                    key={`data-${index}`}
                                    as="a"
                                    href={`${import.meta.env.VITE_API_BASE}/uploads/${data?.split("/")[4]
                                        }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    textDecoration="none"
                                    _hover={{ textDecoration: "none" }}
                                    mb={2}
                                    variant="solid"
                                >
                                    View Single File
                                </Button>
                            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<>No file uploaded</>} />}
                    </div>
                </>)}
        </Modal>
    )
}

export default ViewLeadByBrand