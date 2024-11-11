import React, { useState } from 'react';
import './dashboard.css';
import { Link , NavLink } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaFileAlt, FaHandshake, FaComments, FaSignOutAlt, FaCalendarCheck, FaEye , FaFileArchive , FaGraduationCap , FaBook , FaBriefcase , FaCertificate, FaStar, FaUserShield, FaChalkboardTeacher, FaCalendarAlt, FaBell, FaChartArea  } from 'react-icons/fa'; 

const Dashboard = () => {
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
                <Link to='/dashboard'><FaChartArea /> Dashboard</Link> 
                <Link onClick={() => handleSubmenuClick('profile')}>
                    <FaUser /> Profile
                </Link>
                {openSubmenu === 'profile' && (
                    <div className="submenu">
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
                        <Link to="/studentprofile/studentadd" ><FaFileAlt /> Add Personal Details</Link>
                        <Link to="/studentprofile/studentinterestadd" ><FaFileArchive /> Add Interests</Link>
                        <Link to="/studentprofile/studentview"  ><FaEye /> View Profile</Link>
=======
>>>>>>> Stashed changes
                        <NavLink to="/studentprofile/studentadd" activeClassName="active-link" ><FaFileAlt /> Add Personal Details</NavLink>
                        <NavLink to="/studentprofile/interestsadd" activeClassName="active-link"><FaFileArchive /> Add Interests</NavLink>
                        <Link ><FaEye /> View Profile</Link>
>>>>>>> 50a7a6ef08c19ab69c42c85317bbb2502fe9b97c
                    </div>
                )}
                <NavLink to="/student/careerrecommendation" activeClassName="active-link" >
                    <FaHandshake /> Career Recommendations
                </NavLink>
                <Link onClick={() => handleSubmenuClick('progresstracker')}>
                    <FaTachometerAlt /> Progress Tracker
                </Link>
                {openSubmenu === 'progresstracker' && (
                    <div className="submenu">
                        <Link><FaGraduationCap /> Degrees</Link>
                        <Link><FaBriefcase /> Courses</Link>
                        <Link><FaBook /> Job Listings & Internships</Link>
                        <Link><FaCertificate /> Certificates</Link>
                    </div>
                )}
                <Link><FaFileAlt /> Resume Builder</Link>
                <Link><FaComments /> Chatbot</Link>
                <Link onClick={() => handleSubmenuClick('review')}>
                    <FaStar /> Reviews
                </Link>
                {openSubmenu === 'review' && (
                    <div className="submenu">
                        <Link><FaUserShield /> To System</Link>
                        <Link><FaChalkboardTeacher />To Counsellors</Link>
                    </div>
                )}
                <Link onClick={() => handleSubmenuClick('meeting')}>
                    <FaCalendarCheck /> Meet with Counsellor
                </Link>
                {openSubmenu === 'meeting' && (
                    <div className="submenu">
                        <Link><FaCalendarAlt /> Appointment</Link>
                        <Link><FaBell /> Notifications</Link>
                    </div>
                )}
                <Link><FaSignOutAlt /> Logout</Link>
            </nav>
        </div>
    );
};

export default Dashboard;
