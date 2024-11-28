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
                <Link to="/counsellor/dashboard"><FaChartArea /> Dashboard</Link> 
                
                <Link onClick={() => handleSubmenuClick('profile')}>
                    <FaUser /> Profile
                </Link>
                {openSubmenu === 'profile' && (
                    <div className="submenu">
                        <NavLink to="/counsellor/profileadd" activeClassName="active-link" ><FaFileAlt /> Add Personal Details</NavLink>
                        <NavLink to="/counsellor/profileview" activeClassName="active-link" ><FaEye /> View Profile</NavLink>
                    </div>
                )}
                <Link to="/counsellor/studentview"><GiSchoolBag /> Student</Link>
                <Link to="/counsellor/meetview"> <FaTachometerAlt /> Meetings </Link>
                <Link to="/counsellor/invoiceview"> <FaFileInvoiceDollar /> Invoice </Link>
                <Link to="/counsellor/notifications"> <FaFileInvoiceDollar /> Notifications </Link>
                <Link to="/counsellor/studentreviews"> <FaStar />Student Reviews</Link>
                <Link onClick={() => handleSubmenuClick('review')}> <FaStar />Give Reviews</Link>
                {openSubmenu === 'review' && (
                    <div className="submenu">
                        <Link to="/counsellor/studentreview"><FaUserShield /> Student</Link>
                        <Link to="/counsellor/systemreview"><FaChalkboardTeacher/> System</Link>
                    </div>
                )}
                <Link to="/auth"><FaSignOutAlt /> Logout</Link>
            </nav>
        </div>
    );
};


export default DashboardConsellor;


