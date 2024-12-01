import React, { useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaSignOutAlt, FaStar, FaUserShield, FaChalkboardTeacher, FaChartArea, FaFileAlt, FaEye  } from 'react-icons/fa'; 

import { GiSchoolBag } from "react-icons/gi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


const DashboardConsellor = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmenuClick = (menu) => {
        setOpenSubmenu(openSubmenu === menu ? null : menu); 
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </button>
            <nav className="nav">
                <NavLink to="/counsellor/dashboard" activeClassName="active-link"><FaChartArea /> Dashboard</NavLink> 
                
                <Link onClick={() => handleSubmenuClick('profile')}>
                    <FaUser /> Profile
                </Link>
                {openSubmenu === 'profile' && (
                    <div className="submenu">
                        <NavLink to="/counsellor/profileadd" activeClassName="active-link" ><FaFileAlt /> Add Personal Details</NavLink>  
                        <NavLink to="/counsellor/expertise" activeClassName="active-link" ><FaChalkboardTeacher /> Schedule Management</NavLink>
                        <NavLink to="/counsellor/profileview" activeClassName="active-link" ><FaEye /> View Profile</NavLink>
                    </div>
                )}
                <NavLink to="/counsellor/studentview" activeClassName="active-link"><GiSchoolBag /> Student</NavLink>
                <NavLink to="/counsellor/meetview" activeClassName="active-link"> <FaTachometerAlt /> Meetings </NavLink>
                <NavLink to="/counsellor/invoiceview" activeClassName="active-link"> <FaFileInvoiceDollar /> Invoice </NavLink>
                <NavLink to="/counsellor/notifications" activeClassName="active-link"> <FaFileInvoiceDollar /> Notifications </NavLink>
                <NavLink to="/counsellor/viewstudentreviews" activeClassName="active-link"> <FaStar />Student Reviews</NavLink>
                <Link onClick={() => handleSubmenuClick('review')}> <FaStar />Give Reviews</Link>
                {openSubmenu === 'review' && (
                    <div className="submenu">
                        <NavLink to="/counsellor/givestudentreview" activeClassName="active-link"><FaUserShield /> Student</NavLink>
                        <NavLink to="/counsellor/givesystemreview" activeClassName="active-link"><FaChalkboardTeacher/> System</NavLink>
                    </div>
                )}
                <NavLink to="/auth" activeClassName="active-link"><FaSignOutAlt /> Logout</NavLink>
            </nav>
        </div>
    );
};


export default DashboardConsellor;


