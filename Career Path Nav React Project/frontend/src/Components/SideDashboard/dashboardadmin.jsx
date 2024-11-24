import React, { useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaSignOutAlt, FaStar, FaUserShield, FaChalkboardTeacher, FaChartArea  } from 'react-icons/fa'; 
import { IoSchool } from "react-icons/io5";
import { GiSchoolBag } from "react-icons/gi";
import { FaFileInvoiceDollar } from "react-icons/fa";


const dashboardadmin = () => {
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
                <Link to="/admin/dashboard"><FaChartArea /> Dashboard</Link> 
                <Link  to="/admin/profile"><FaUser /> Profile</Link>
                <Link to="/admin/counsellorview"><IoSchool /> Counsellor</Link>
                <Link to="/admin/studentview"><GiSchoolBag /> Student</Link>
                <Link to="/admin/meetview"> <FaTachometerAlt /> Meetings </Link>
                <Link to="/admin/invoiceview"> <FaFileInvoiceDollar /> Invoice </Link>
                <Link onClick={() => handleSubmenuClick('review')}> <FaStar /> Reviews</Link>
                {openSubmenu === 'review' && (
                    <div className="submenu">
                        <Link to="/admin/counsellorreview"><IoSchool /> Counsellors</Link>
                        <Link to="/admin/studentreview"><FaUserShield /> Student</Link>
                        <Link to="/admin/systemreview"><FaChalkboardTeacher/> System</Link>
                    </div>
                )}
                <Link to="/auth"><FaSignOutAlt /> Logout</Link>
            </nav>
        </div>
    );
};


export default Dashboardadmin;


