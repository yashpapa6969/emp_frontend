import { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button, Tag } from 'antd';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const TagRender = ({ label, closable, onClose }) => {
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
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

const SelectProduct = ({ selectSourceValue, setSelectSourceValue }) => {
    const toast = useToast();
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const onPriceChange = (event) => {
        setPrice(event.target.value);
    };

    async function fetchSourceTags() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE}/api/admin/getAllProducts`
            );
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchSourceTags();
    }, [])

    const handleAddSource = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_BASE}/api/admin/addProducts`, { product: name, unitPrice: price })
            .then(() => {
                fetchSourceTags();
                toast({
                    title: "Success",
                    description: "Added a new source tag",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            })
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return (
        <Select
            mode="single"
            tagRender={TagRender}
            style={{
                width: 300,
            }}
            value={selectSourceValue}
            onChange={setSelectSourceValue}
            placeholder="Choose a value"
            dropdownRender={(menu) => (
                <>
                    <Space
                        style={{
                            padding: '0 8px 4px',
                        }}
                    >
                        <Input
                            placeholder="Product"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Input
                        type='number'
                            placeholder="Price"
                            ref={inputRef}
                            value={price}
                            onChange={onPriceChange}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button type="text" disabled={!name || !price} icon={<PlusOutlined />} onClick={handleAddSource}>
                            Add item
                        </Button>
                    </Space>
                    <Divider
                        style={{
                            margin: '8px 0',
                        }}
                    />
                    {menu}
                </>
            )}
            options={items.map((item) => ({
                key: `item-${item.product_id}`,
                label: item.product,
                value: item.product_id,
            }))}
        />
    );
};
export default SelectProduct;