import React, { Dispatch, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdHome, IoMdPerson } from 'react-icons/io';
import { IoLockOpen, IoPeopleSharp, IoPricetag } from "react-icons/io5";
import { GoPersonFill } from 'react-icons/go';
import { FaBuilding, FaDiagramProject, FaEnvelopeOpen, FaTty } from 'react-icons/fa6';
import { GrTask } from 'react-icons/gr';
import { LuNewspaper } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { HiDocumentDuplicate } from 'react-icons/hi2';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react';
import { MdOutlineCalendarMonth } from "react-icons/md";

interface Props {
    isPhoneView: boolean;
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ isPhoneView, showSidebar, setShowSidebar, activeLink, setActiveLink }: Props) => {
    const [accordionIndex, setAccordionIndex] = useState([10]);

    const handleNavClose = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 640) setShowSidebar(false);
    }

    const accordionClick = (index: number) => {
        if (accordionIndex[0] != index) setAccordionIndex([index]);
        else setAccordionIndex([10]);
    }

    return (
        <div
            className={`h-screen transition-all ${(isPhoneView && !showSidebar) && "hidden"} ${showSidebar ? "md:w-[300px]" : ""} bg-[#1E293B] text-white sticky top-0`}>
            <Link to="/home" onClick={handleNavClose} className="w-full h-[70px] bg-[#172032] flex items-center justify-center md:justify-start gap-3 p-4 text-lg md:text-2xl">
                <img src='/logo.png' alt='logo' className='h-6' /> <span className={`${(showSidebar && !isPhoneView) ? "visible" : "hidden"}`}>ADSVERSIFY</span>
            </Link>

            <Link to="/home" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'Dashboard' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <IoMdHome size={20} /> <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "md:visible" : "hidden"}`}>Dashboard</span>
            </Link>
            <Link to="/manageLeads" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'manageLeads' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <FaTty size={20} />  <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Leads {!isPhoneView && "Management"}</span>
            </Link>
            <Link to="/getAllClient" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllClient' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <IoPeopleSharp size={20} />  <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Client {!isPhoneView && "Management"}</span>
            </Link>
            <Link to="/getAllProject" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllProject' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <FaDiagramProject size={20} /> <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Project {!isPhoneView && "Management"}</span>
            </Link>
            {/* <Link to="/getAllLead" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllLead' && 'bg-gray-500'}`}>
                <FaTty size={20} /> Lead Management
            </Link> */}
            <Link to="/getAllTask" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllTask' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <GrTask size={20} />  <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Task {!isPhoneView && "Management"}</span>
            </Link>

            <Accordion className='m-0 p-0 md:px-2 md:pr-3 flex gap-2 flex-col items-center justify-center md:justify-start w-full' allowToggle index={accordionIndex}>
                <AccordionItem width={"full"} border={"none"} onClick={() => accordionClick(0)}>
                    <AccordionButton className='flex w-full justify-center md:justify-between'>
                        <div className='flex flex-col items-center justify-center md:flex-row text-center md:text-left gap-2'>
                            <IoMdPerson size={20} /> <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>HR {!isPhoneView && "Management"}</span>
                        </div>
                        {(!isPhoneView && showSidebar) && <AccordionIcon />}
                    </AccordionButton>
                    <AccordionPanel bg={"#090f29"} rounded={"md"} p={0}>
                        <Link to="/getAllEmp" onClick={handleNavClose} className={`flex pt-4 md:pt-0 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllEmp' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <IoMdPerson size={20} />  <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Employee {!isPhoneView && "Information"}</span>
                        </Link>
                        <Link to="/getAllSlip" onClick={handleNavClose} className={`flex md:pt-0 pt-4 mb-4 md:mb-0 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllSlip' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <LuNewspaper size={18} />  <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Slip</span>
                        </Link>
                        <Link to="/getAllLeaves" onClick={handleNavClose} className={`flex mb-4 md:mb-0 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllLeaves' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <MdOutlineCalendarMonth size={20} />  <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Leave {!isPhoneView && "Management"}</span>
                        </Link>
                        <Link to="/getAllLetters" onClick={handleNavClose} className={`flex pb-4 mb-2 md:mb-0 md:pb-0 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllLetters' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <FaEnvelopeOpen />  <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Letter</span>
                        </Link>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem width={"full"} border={"none"} onClick={() => accordionClick(1)}>
                    <AccordionButton className='flex w-full justify-center md:justify-between'>
                        <div className='flex flex-col items-center justify-center md:flex-row text-center md:text-left gap-2'>
                            <GiReceiveMoney size={20} /> <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Finance</span>
                        </div>
                        {(!isPhoneView && showSidebar) && <AccordionIcon />}
                    </AccordionButton>
                    <AccordionPanel bg={"#090f29"} rounded={"md"} p={0}>
                        <Link to="/getAllInvoice" onClick={handleNavClose} className={`flex md:pt-0 pb-3 md:pb-0 pt-4 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllInvoice' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <HiDocumentDuplicate />  <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Finance {!isPhoneView && "Management"}</span>
                        </Link>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem width={"full"} border={"none"} onClick={() => accordionClick(2)}>
                    <AccordionButton className='flex w-full justify-center md:justify-between'>
                        <div className='flex flex-col items-center justify-center md:flex-row text-center md:text-left gap-2'>
                            <IoLockOpen /> <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Permissions</span>
                        </div>
                        {(!isPhoneView && showSidebar) && <AccordionIcon />}
                    </AccordionButton>
                    <AccordionPanel bg={"#090f29"} rounded={"md"} p={0}>
                        <Link to="/getAllManager" onClick={handleNavClose} className={`flex md:pt-0 pb-3 md:pb-0 pt-4 flex-col md:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getAllManager' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <GoPersonFill />  <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Manager {!isPhoneView && "Management"}</span>
                        </Link>
                        <Link to="/getDepartment" onClick={handleNavClose} className={`flex md:pt-0 pb-3 md:pb-0 pt-4 flex-colmd:flex-row text-center md:text-left items-center md:h-[45px] gap-2 px-4 rounded-md transition-all cursor-pointer ${activeLink === 'getDepartment' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                            <FaBuilding /> <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Department {!isPhoneView && "Manager"}</span>
                        </Link>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            {/* <Link to="/getAllSlip" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllSlip' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <LuNewspaper size={18} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Slip Management</span>
            </Link> */}
            <Link to="/createTag" onClick={handleNavClose} className={`flex flex-col md:flex-row pt-2 text-center md:text-left items-center md:h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'CreateTag' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <IoPricetag /> <span className={`md:text-[16px] text-[10px] md:${showSidebar ? "visible" : "hidden"}`}>Tag {!isPhoneView && "Management"}</span>
            </Link>
        </div >
    )
}

export default Sidebar