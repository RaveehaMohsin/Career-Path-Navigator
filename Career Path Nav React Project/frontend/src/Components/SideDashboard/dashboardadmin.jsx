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
                <Link><FaChartArea /> Dashboard</Link> 
                <Link><FaUser /> Profile</Link>
                <Link><IoSchool /> Counsellor</Link>
                <Link><GiSchoolBag /> Student</Link>
                <Link> <FaTachometerAlt /> Meetings </Link>
                <Link> <FaFileInvoiceDollar /> Invoice </Link>
                <Link onClick={() => handleSubmenuClick('review')}> <FaStar /> Reviews</Link>
                {openSubmenu === 'review' && (
                    <div className="submenu">
                        <Link><IoSchool /> Counsellors</Link>
                        <Link><FaUserShield /> Student</Link>
                        <Link><FaChalkboardTeacher/> System</Link>
                    </div>
                )}
                <Link to="/auth"><FaSignOutAlt /> Logout</Link>
            </nav>
        </div>
    );
};

export default dashboardadmin;

