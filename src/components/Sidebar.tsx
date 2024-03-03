import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { GoPersonFill } from 'react-icons/go';
import { LiaProjectDiagramSolid, LiaTtySolid } from 'react-icons/lia';
import { FaTty, FaDiagramProject } from 'react-icons/fa6';
import { MdOutlineAddTask } from "react-icons/md";
import { GrTask } from 'react-icons/gr';
import { LuNewspaper } from "react-icons/lu";
import { RiDragDropFill } from 'react-icons/ri';
import { HiDocumentDuplicate, HiOutlineDocumentDuplicate } from 'react-icons/hi2';

interface Props {
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ showSidebar, setShowSidebar, activeLink, setActiveLink }: Props) => {
    const [accordianIndex, setAccordianIndex] = useState([0]);

    const handleNavClose = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 640) setShowSidebar(false);
    }

    useEffect(() => {
        if (["CreateEmp", "CreateProject", "CreateClient","CreateInvoice",
            "createLead", "CreateTask", "CreateTag", "CreateSlip"].includes(activeLink)) setAccordianIndex([1])
        else setAccordianIndex([0]);
    }, [activeLink])

    return (
        <div className='md:h-screen h-full w-[300px] bg-[#1E293B] text-white md:sticky top-0'>
            <Link to="/home" onClick={handleNavClose} className="w-full h-[70px] bg-[#172032] flex items-center gap-3 p-4 text-lg md:text-2xl">
                <img src='/logo.png' alt='logo' className='h-6' /> ADSVERSIFY
            </Link>

            <Link to="/home" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'Dashboard' && 'bg-gray-500'}`}>
                <IoMdHome size={20} /> Dashboard
            </Link>
            <Link to="/manageLeads" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'manageLeads' && 'bg-gray-500'}`}>
                <RiDragDropFill size={20} /> Manage Leads
            </Link>

            <Accordion index={accordianIndex} mt={4}>
                <AccordionItem border="none" shadow="none" bg={"#172032"}>
                    <AccordionButton _expanded={{ bg: '#172032' }} onClick={() => setAccordianIndex([0])}>
                        <Box className='p-2 flex gap-1 items-center text-gray-300 text-sm' as="span" flex='1' textAlign='left'>
                            Information
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <Link to="/getAllManager" onClick={handleNavClose} className={`flex mb-[8px] items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllManager' && 'bg-gray-500'}`}>
                            <GoPersonFill /> Manager
                        </Link>
                        <Link to="/getAllInvoice" onClick={handleNavClose} className={`flex mb-[8px] items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllInvoice' && 'bg-gray-500'}`}>
                            <HiDocumentDuplicate /> Invoice
                        </Link>
                        <Link to="/getAllEmp" onClick={handleNavClose} className={`flex mb-[8px] items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllEmp' && 'bg-gray-500'}`}>
                            <IoMdPerson size={20} /> Employee
                        </Link>
                        <Link to="/getAllProject" onClick={handleNavClose} className={`flex mb-[8px] items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllProject' && 'bg-gray-500'}`}>
                            <FaDiagramProject size={20} />Project
                        </Link>
                        <Link to="/getAllClient" onClick={handleNavClose} className={`flex mb-[8px] items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllClient' && 'bg-gray-500'}`}>
                            <IoPeopleSharp size={20} /> Client
                        </Link>
                        <Link to="/getAllLead" onClick={handleNavClose} className={`flex mb-[8px] items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllLead' && 'bg-gray-500'}`}>
                            <FaTty size={20} /> Lead
                        </Link>
                        <Link to="/getAllTask" onClick={handleNavClose} className={`flex mb-[8px] items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllTask' && 'bg-gray-500'}`}>
                            <GrTask size={20} /> Task
                        </Link>
                        <Link to="/getAllSlip" onClick={handleNavClose} className={`flex mb-[8px] items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllSlip' && 'bg-gray-500'}`}>
                            <LuNewspaper size={18} /> Slip
                        </Link>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem border="none" shadow="none" bg={"#172032"}>
                    <AccordionButton _expanded={{ bg: '#172032' }} onClick={() => setAccordianIndex([1])}>
                        <Box className='p-2 flex gap-1 items-center text-gray-300 text-sm' as="span" flex='1' textAlign='left'>
                            Create
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <Link to="/createEmp" onClick={handleNavClose} className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateEmp' && 'bg-gray-500'}`}>
                            <IoPersonAddOutline size={16} /> Employee
                        </Link>
                        <Link to="/createProject" onClick={handleNavClose} className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateProject' && 'bg-gray-500'}`}>
                            <LiaProjectDiagramSolid size={18} /> Project
                        </Link>
                        <Link to="/CreateInvoice" onClick={handleNavClose} className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateInvoice' && 'bg-gray-500'}`}>
                            <HiOutlineDocumentDuplicate size={18} /> Invoice
                        </Link>
                        <Link to="/createClient" onClick={handleNavClose} className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateClient' && 'bg-gray-500'}`}>
                            <IoPeopleOutline size={18} />Client
                        </Link>
                        <Link to="/createLead" onClick={handleNavClose} className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'createLead' && 'bg-gray-500'}`}>
                            <LiaTtySolid /> Lead
                        </Link>
                        <Link to="/createTask" onClick={handleNavClose} className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateTask' && 'bg-gray-500'}`}>
                            <MdOutlineAddTask size={18} /> Task
                        </Link>
                        <Link to="/createTag" onClick={handleNavClose} className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateTag' && 'bg-gray-500'}`}>
                            <IoPricetagOutline /> Tag
                        </Link>
                        <Link to="/createSlip" onClick={handleNavClose} className={`flex items-center gap-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateSlip' && 'bg-gray-500'}`}>
                            <LuNewspaper /> Slip
                        </Link>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Sidebar