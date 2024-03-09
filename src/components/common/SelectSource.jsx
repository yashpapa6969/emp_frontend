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

const SelectSource = ({ selectSourceValue, setSelectSourceValue, width }) => {
    const toast = useToast();
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };

    async function fetchSourceTags() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE}/api/admin/sourceGetAllTags`
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
        axios.post(`${import.meta.env.VITE_API_BASE}/api/admin/sourceAddTag`, { sourceTagName: name })
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
            mode="multiple"
            tagRender={TagRender}
            style={{
                width: width ? width : 300,
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
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button type="text" disabled={!name} icon={<PlusOutlined />} onClick={handleAddSource}>
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
                key: `item-${item.source_tag_id}`,
                label: item.sourceTagName,
                value: item.sourceTagName,
            }))}
        />
    );
};
export default SelectSource;