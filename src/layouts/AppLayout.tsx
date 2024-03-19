import React, { useState, Dispatch, SetStateAction, ReactNode, useLayoutEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar';

interface Props {
    children: ReactNode;
    activeSideabarLink: string;
    setActiveSideabarLink: Dispatch<SetStateAction<string>>;
}

const AppLayout = ({ children,
    activeSideabarLink,
    setActiveSideabarLink }: Props) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [isPhoneView, setIsPhoneView] = useState(false);

    useLayoutEffect(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 640) {
            setShowSidebar(false);
            setIsPhoneView(true);
        }
    }, [])


    return (
        <div className='flex'>
            <Sidebar isPhoneView={isPhoneView} showSidebar={showSidebar} setShowSidebar={setShowSidebar} activeLink={activeSideabarLink} setActiveLink={setActiveSideabarLink} />

            <div className='w-full'>
                <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                {children}
            </div>
        </div>
    )
}

export default AppLayout