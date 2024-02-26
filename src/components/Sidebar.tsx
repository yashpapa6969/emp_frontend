import React, { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom';

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box
} from '@chakra-ui/react';

interface Props {
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ showSidebar, setShowSidebar, activeLink, setActiveLink }: Props) => {
    return (
        <div className='h-screen w-[250px] bg-[#1E293B] text-white sticky top-0'>
            <Link to="/home" className="w-full h-[70px] bg-[#172032] flex items-center p-4">EMP DB SYSTEM</Link>

            <Link to="/home" className={`flex m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'Dashboard' && 'bg-gray-500'}`}>
                Dashboard
            </Link>
            {/* <Link to="/UserInfo" className={`flex m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'UserInfo' && 'bg-gray-500'}`}>
                User Information
            </Link> */}
            <Link to="/getAllManager" className={`flex m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllManager' && 'bg-gray-500'}`}>
                Manager Information
            </Link>
            <Link to="/getAllEmp" className={`flex m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllEmp' && 'bg-gray-500'}`}>
                Employee Information
            </Link>
            <Link to="/getAllClient" className={`flex m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllClient' && 'bg-gray-500'}`}>
                Client Information
            </Link>
            <Link to="/getAllProject" className={`flex m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllClient' && 'bg-gray-500'}`}>
                Project Information
            </Link>
            <Link to="/getAllLead" className={`flex m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllClient' && 'bg-gray-500'}`}>
                Lead Information
            </Link>
            <Accordion allowToggle>
                <AccordionItem border="none" shadow="none" bg={ "#172032" }>
                    <AccordionButton _expanded={{ bg: '#172032' }}>
                        <Box className='p-2' as="span" flex='1' textAlign='left'>
                            Create
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <Link to="/createEmp" className={`flex p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateEmp' && 'bg-gray-500'}`}>
                            Employee
                        </Link>
                        <Link to="/createClient" className={`flex p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateClient' && 'bg-gray-500'}`}>
                            Client
                        </Link>
                        <Link to="/createProject" className={`flex p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateProject' && 'bg-gray-500'}`}>
                            Project
                        </Link>
                        <Link to="/createLead" className={`flex p-2 rounded-md transition-all cursor-pointer ${activeLink === 'createLead' && 'bg-gray-500'}`}>
                            Lead
                        </Link>
                        <Link to="/createTag" className={`flex p-2 rounded-md transition-all cursor-pointer ${activeLink === 'createLead' && 'bg-gray-500'}`}>
                            Tag
                        </Link>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Sidebar