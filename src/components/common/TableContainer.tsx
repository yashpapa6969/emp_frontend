import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Table } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

interface Props {
    children: ReactNode;
    searchText: string;
    setSearchText: Dispatch<SetStateAction<string>>;
    setFilteredData: Dispatch<SetStateAction<Array<any>>>;
    data: Array<any>;
}

const TableContainer = ({ children, searchText, setSearchText, setFilteredData, data }: Props) => {
    const handleSearch = (e) => {
        setSearchText(e.target.value);
        if (searchText != '') {
            setFilteredData(data.filter((elem) => {
                return elem.name.toLowerCase().includes(searchText.toLowerCase());
            }));
        }
    }

    return (
        <>
            <Flex justifyContent={"end"} alignItems={"center"} gap={3} mb={6}>
                <SearchIcon fontSize={20} color={"#cecece"} />
                <Input value={searchText} onChange={(e) => handleSearch(e)} className="max-w-[250px]" placeholder='Type to search' />
            </Flex>

            <Table width="100%">
                {children}
            </Table>
        </>
    )
}

export default TableContainer