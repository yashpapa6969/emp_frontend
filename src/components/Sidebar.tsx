import React, { Dispatch, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdHome, IoMdPerson } from 'react-icons/io';
import { IoPeopleSharp } from "react-icons/io5";
import { GoPersonFill } from 'react-icons/go';
import { FaTty, FaDiagramProject } from 'react-icons/fa6';
import { GrTask } from 'react-icons/gr';
import { LuNewspaper } from "react-icons/lu";
import { RiDragDropFill } from 'react-icons/ri';
import { HiDocumentDuplicate } from 'react-icons/hi2';

interface Props {
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ showSidebar, setShowSidebar, activeLink, setActiveLink }: Props) => {
    const [expandNavbar, setExpandNavbar] = useState(false);

    const handleNavClose = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 640) setShowSidebar(false);
    }

    return (
        <div
            onMouseEnter={() => setExpandNavbar(true)}
            onMouseLeave={() => setExpandNavbar(false)}
            className={`h-screen transition-all ${expandNavbar ? "w-[300px]" : ""} bg-[#1E293B] text-white sticky top-0`}>
            <Link to="/home" onClick={handleNavClose} className="w-full h-[70px] bg-[#172032] flex items-center gap-3 p-4 text-lg md:text-2xl">
                <img src='/logo.png' alt='logo' className='h-6' /> <span className={`${expandNavbar ? "visible" : "hidden"}`}>ADSVERSIFY</span>
            </Link>

            <Link to="/home" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'Dashboard' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <IoMdHome size={20} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Dashboard</span>
            </Link>
            <Link to="/manageLeads" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'manageLeads' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <RiDragDropFill size={20} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Manage Leads</span>
            </Link>

            <Link to="/getAllManager" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllManager' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <GoPersonFill />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Manager Management</span>
            </Link>
            <Link to="/getAllInvoice" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllInvoice' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <HiDocumentDuplicate />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Invoice Management</span>
            </Link>
            <Link to="/getAllEmp" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllEmp' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <IoMdPerson size={20} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>HR Management</span>
            </Link>
            <Link to="/getAllProject" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllProject' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <FaDiagramProject size={20} /> <span className={`${expandNavbar ? "visible" : "hidden"}`}>Project Management</span>
            </Link>
            <Link to="/getAllClient" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllClient' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <IoPeopleSharp size={20} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Client Management</span>
            </Link>
            {/* <Link to="/getAllLead" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllLead' && 'bg-gray-500'}`}>
                <FaTty size={20} /> Lead Management
            </Link> */}
            <Link to="/getAllTask" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllTask' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <GrTask size={20} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Task Management</span>
            </Link>
            <Link to="/getAllSlip" onClick={handleNavClose} className={`flex items-center h-[45px] gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllSlip' ? 'bg-gray-500' : "hover:bg-gray-700"}`}>
                <LuNewspaper size={18} />  <span className={`${expandNavbar ? "visible" : "hidden"}`}>Slip Management</span>
            </Link>
        </div >
    )
}

export default Sidebar