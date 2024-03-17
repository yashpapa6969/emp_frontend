import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdHome, IoMdPerson } from 'react-icons/io';
import { IoPeopleSharp } from "react-icons/io5";
import { GoPersonFill } from 'react-icons/go';
import { FaDiagramProject, FaEnvelopeOpen } from 'react-icons/fa6';
import { GrTask } from 'react-icons/gr';
import { LuNewspaper } from "react-icons/lu";
import { RiDragDropFill } from 'react-icons/ri';
import { HiDocumentDuplicate } from 'react-icons/hi2';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { MdOutlineCalendarMonth } from "react-icons/md";

interface Props {
    isPhoneView: boolean;
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ isPhoneView, showSidebar, setShowSidebar, activeLink, setActiveLink }: Props) => {
    const [expandNavbar, setExpandNavbar] = useState(false);
    const [showAccordion, setShowAccordion] = useState(false);
    const [accordionIndex, setAccordionIndex] = useState([10]);

    const handleNavClose = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 640) setShowSidebar(false);
    }

    const handleExpandNavbar = (type: string) => {
        if (type === "enter") {
            setExpandNavbar(true);
        }
        if (type === "leave") {
            setExpandNavbar(false);
            setAccordionIndex([10]);
        }
        setShowAccordion(false);
    }

    const accordionClick = () => {
        if (accordionIndex[0] != 0) setAccordionIndex([0]);
        else setAccordionIndex([10]);
    }

    return (
        <div
            onMouseEnter={() => handleExpandNavbar("enter")}
            onMouseLeave={() => handleExpandNavbar("leave")}
            className={`h-screen transition-all ${expandNavbar ? "md:w-[300px] w-[80px]" : ""} bg-[#1E293B] text-white sticky top-0`}>
            <Link to="/home" onClick={handleNavClose} className="w-full h-[70px] bg-[#172032] flex items-center justify-center md:justify-start gap-3 p-4 text-lg md:text-2xl">
                <img src='/logo.png' alt='logo' className='h-6' /> <span className={`${expandNavbar ? "visible" : "hidden"}`}>ADSVERSIFY</span>
            </Link>

            <Link to="/home" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'Dashboard' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <IoMdHome size={20} /> <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "md:visible" : "hidden"}`}>Dashboard</span>
            </Link>

            <Link to="/getAllClient" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllClient' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <IoPeopleSharp size={20} />  <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Client {!isPhoneView && "Management"}</span>
            </Link>
            <Link to="/manageLeads" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'manageLeads' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <RiDragDropFill size={20} />  <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Leads {!isPhoneView && "Management"}</span>
            </Link>
            {/* <div onClick={accordionClick} className={`flex items-center justify-between h-[45px] mx-4 mt-2 mb-0 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'HRManagement' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <div className='flex items-center gap-2'>
                    <IoMdPerson size={20} /> <span className={`${expandNavbar ? "visible" : "hidden"}`}>HR Management</span>
                </div>
                <div className={`${expandNavbar ? "visible" : "hidden"}`}>
                    <ChevronDownIcon fontSize={24} />
                </div>
            </div>
            {(showAccordion && expandNavbar) && (
                <div className='bg-[#192338] my-0 m-4 pt-4 rounded-b-md'>
                    <Link to="/getAllSlip" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllSlip' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                        <LuNewspaper size={18} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Slip</span>
                    </Link>
                    <Link to="/getAllEmp" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllEmp' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                        <LuNewspaper size={18} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Employee Information</span>
                    </Link>
                    <Link to="/getLetter" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getLetter' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                        <LuNewspaper size={18} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Letter</span>
                    </Link>
                </div>
            )} */}
            <Accordion className='m-0 p-0 md:p-2 md:pr-3 flex items-center justify-center md:justify-start w-full' allowToggle onClick={accordionClick} index={accordionIndex}>
                <AccordionItem width={"full"} border={"none"}>
                    <h2>
                        <AccordionButton className='flex w-full justify-center md:justify-between'>
                            <div className='flex flex-col items-center justify-center md:flex-row text-center md:text-left gap-2'>
                                <IoMdPerson size={20} /> <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>HR {!isPhoneView && "Management"}</span>
                            </div>
                            {(!isPhoneView && expandNavbar) && <AccordionIcon />}
                        </AccordionButton>
                    </h2>
                    <AccordionPanel bg={"#090f29"} rounded={"md"} p={0}>
                        <Link to="/getAllSlip" onClick={handleNavClose} className={`flex md:pt-0 pt-4 pb-2 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllSlip' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <LuNewspaper size={18} />  <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Slip</span>
                        </Link>
                        <Link to="/getAllEmp" onClick={handleNavClose} className={`flex pb-2 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllEmp' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <IoMdPerson size={20} />  <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Employee {!isPhoneView && "Information"}</span>
                        </Link>
                        <Link to="/getLetter" onClick={handleNavClose} className={`flex pb-2 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getLetter' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <FaEnvelopeOpen />  <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Letter</span>
                        </Link>
                        <Link to="/getAllLeaves" onClick={handleNavClose} className={`flex md:pb-0 pb-4 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getLetter' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <MdOutlineCalendarMonth />  <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Leave {!isPhoneView && "Management"}</span>
                        </Link>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Link to="/getAllInvoice" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 mt-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllInvoice' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <HiDocumentDuplicate />  <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Invoice {!isPhoneView && "Management"}</span>
            </Link>
            <Link to="/getAllProject" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllProject' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <FaDiagramProject size={20} /> <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Project {!isPhoneView && "Management"}</span>
            </Link>
            {/* <Link to="/getAllLead" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllLead' && 'bg-gray-500'}`}>
                <FaTty size={20} /> Lead Management
            </Link> */}
            <Link to="/getAllTask" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllTask' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <GrTask size={20} />  <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Task {!isPhoneView && "Management"}</span>
            </Link>
            {/* <Link to="/getAllSlip" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllSlip' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <LuNewspaper size={18} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Slip Management</span>
            </Link> */}
            <Link to="/getAllManager" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllManager' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <GoPersonFill />  <span className={`md:text-[16px] text-[10px] md:${expandNavbar ? "visible" : "hidden"}`}>Manager {!isPhoneView && "Management"}</span>
            </Link>
        </div >
    )
}

export default Sidebar