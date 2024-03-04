import React, { Dispatch, SetStateAction } from 'react'
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
    const handleNavClose = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 640) setShowSidebar(false);
    }

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

            <Link to="/getAllManager" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllManager' && 'bg-gray-500'}`}>
                <GoPersonFill /> Manager Management
            </Link>
            <Link to="/getAllInvoice" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllInvoice' && 'bg-gray-500'}`}>
                <HiDocumentDuplicate /> Invoice Management
            </Link>
            <Link to="/getAllEmp" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllEmp' && 'bg-gray-500'}`}>
                <IoMdPerson size={20} /> Employee Management
            </Link>
            <Link to="/getAllProject" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllProject' && 'bg-gray-500'}`}>
                <FaDiagramProject size={20} />Project Management
            </Link>
            <Link to="/getAllClient" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllClient' && 'bg-gray-500'}`}>
                <IoPeopleSharp size={20} /> Client Management
            </Link>
            <Link to="/getAllLead" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllLead' && 'bg-gray-500'}`}>
                <FaTty size={20} /> Lead Management
            </Link>
            <Link to="/getAllTask" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllTask' && 'bg-gray-500'}`}>
                <GrTask size={20} /> Task Management
            </Link>
            <Link to="/getAllSlip" onClick={handleNavClose} className={`flex items-center gap-2 mx-4 my-2 p-2 rounded-md transition-all cursor-pointer ${activeLink === 'getAllSlip' && 'bg-gray-500'}`}>
                <LuNewspaper size={18} /> Slip Management
            </Link>
        </div >
    )
}

export default Sidebar