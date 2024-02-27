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
import { IoMdHome, IoMdPerson } from 'react-icons/io';
import { IoPeopleOutline, IoPeopleSharp, IoPersonAddOutline, IoPricetagOutline } from "react-icons/io5";
import { GoPersonFill, GoPlus } from 'react-icons/go';
import { LiaProjectDiagramSolid, LiaTtySolid } from 'react-icons/lia';
import { FaTty, FaDiagramProject } from 'react-icons/fa6';

interface Props {
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ showSidebar, setShowSidebar, activeLink, setActiveLink }: Props) => {
    return (
        <div className='h-screen w-[300px] bg-[#1E293B] text-white sticky top-0'>
            <Link to="/home" className="w-full h-[70px] bg-[#172032] flex items-center gap-3 p-4 text-2xl">
                <img src='/logo.png' alt='logo' className='h-6' /> ADSVERSIFY
            </Link>

            <Link to="/home" className={`flex items-center gap-2 m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'Dashboard' && 'bg-gray-500'}`}>
                <IoMdHome size={20} /> Dashboard
            </Link>
            <Link to="/getAllManager" className={`flex items-center gap-2 m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllManager' && 'bg-gray-500'}`}>
                <GoPersonFill /> Manager Information
            </Link>
            <Link to="/getAllEmp" className={`flex items-center gap-2 m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllEmp' && 'bg-gray-500'}`}>
                <IoMdPerson size={20} /> Employee Information
            </Link>
            <Link to="/getAllClient" className={`flex items-center gap-2 m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllClient' && 'bg-gray-500'}`}>
                <IoPeopleSharp size={20} /> Client Information
            </Link>
            <Link to="/getAllProject" className={`flex items-center gap-2 m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllProject' && 'bg-gray-500'}`}>
                <FaDiagramProject size={20} />Project Information
            </Link>
            <Link to="/getAllLead" className={`flex items-center gap-2 m-4 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllLead' && 'bg-gray-500'}`}>
                <FaTty size={20} />Lead Information
            </Link>
            <Accordion defaultIndex={[0]} allowToggle>
                <AccordionItem border="none" shadow="none" bg={"#172032"}>
                    <AccordionButton _expanded={{ bg: '#172032' }}>
                        <Box className='p-2 flex gap-1 items-center' as="span" flex='1' textAlign='left'>
                            <GoPlus /> Create
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <Link to="/createEmp" className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateEmp' && 'bg-gray-500'}`}>
                            <IoPersonAddOutline size={16} /> Employee
                        </Link>
                        <Link to="/createClient" className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateClient' && 'bg-gray-500'}`}>
                            <IoPeopleOutline size={18} />Client
                        </Link>
                        <Link to="/createProject" className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateProject' && 'bg-gray-500'}`}>
                            <LiaProjectDiagramSolid size={18} /> Project
                        </Link>
                        <Link to="/createLead" className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'createLead' && 'bg-gray-500'}`}>
                            <LiaTtySolid /> Lead
                        </Link>
                        <Link to="/createTag" className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateTag' && 'bg-gray-500'}`}>
                            <IoPricetagOutline /> Tag
                        </Link>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Sidebar