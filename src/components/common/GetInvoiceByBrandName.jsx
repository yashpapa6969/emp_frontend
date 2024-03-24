import { Button, Checkbox, Drawer, Select, Space } from "antd";
import axios from "axios";
import download from "downloadjs";
import { useEffect, useState } from "react";

const GetInvoiceByBrandName = ({ open, setOpen }) => {
    const onBrandSearch = () => { }
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [fetchedItems, setFetchedItems] = useState([]);
    const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);

    useEffect(() => {
        try {
            axios.post(`${import.meta.env.VITE_API_BASE}/api/admin/getAllInvoiceByBrand`, { brandName: selectedBrand })
                .then((res) => {
                    setFetchedItems(res.data);
                });

        } catch (error) {
            console.log(`Error fetching by brand: ${error}`)
        }
    }, [selectedBrand])

    console.log(selectedInvoiceIds);

    const handleCumulativeInvoices = () => {
        const url = `${import.meta.env.VITE_API_BASE}/api/admin/getAllInvoiceByBrand`;
        axios({
            url,
            method: "POST",
            responseType: "blob",
            data: { invoiceIds: selectedInvoiceIds },
        })
            .then((response) => {
                const content = response.headers['content-type'];
                const currDate = new Date();
                const file_name = `invoice-${currDate}.pdf`;
                download(response, file_name, content);
            });
    }

    const handleSelect = (invoice_id) => {
        if (selectedInvoiceIds && selectedInvoiceIds.includes(invoice_id)) {
            const { newArr, invoice_id } = selectedInvoiceIds;
            setSelectedInvoiceIds(newArr);
        }
        else setSelectedInvoiceIds([...selectedInvoiceIds, invoice_id]);
    }

    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            placement="bottom"
            width="100VW"
            height="100vh"
            extra={
                <Space>
                    <Button onClick={() => setOpen(!open)}>Cancel</Button>
                    <Button onClick={handleCumulativeInvoices} type="primary" className="bg-blue-500">
                        Get Invoices
                    </Button>
                </Space>
            }
        >
            <div className="flex items-center justify-center">
                <div className="max-w-[800px] w-full">
                    <div className="flex gap-2">
                        <Select
                            showSearch
                            optionFilterProp="children"
                            onSearch={onBrandSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={selectedBrand}
                            onChange={setSelectedBrand}
                            placeholder="Choose a brand"
                            className="w-full"
                        >
                            {/* {allMonths.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))} */}
                            <option value="test brac">test brac</option>
                        </Select>
                    </div>
                    {selectedBrand &&
                        fetchedItems?.invoices?.map((item, index) => (
                            <div key={`item-${index}`} className="flex flex-col gap-2 mt-5">
                                <div className="w-full p-3 flex gap-6 bg-gray-100 rounded-md">
                                    <Checkbox
                                        onClick={() => handleSelect(item.invoice_id)}
                                    />
                                    <div>
                                        {item?.brandName}
                                        <p>{item?.billtype}</p>
                                        <p>{item?.createdAt}</p>
                                        <p>{item?.date1}</p>
                                        <p>{item?.discount}</p>
                                        <p>{item?.gst}</p>
                                        <p>{item?.subtotal}</p>
                                        <p>{item?.time1}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Drawer>
    );
}

export default GetInvoiceByBrandName