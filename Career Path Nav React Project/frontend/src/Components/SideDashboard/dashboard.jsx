import React, { useState } from 'react';
import './dashboard.css';
import { Link , NavLink } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaFileAlt, FaHandshake, FaComments, FaSignOutAlt, FaCalendarCheck, FaEye , FaFileArchive , FaGraduationCap , FaBook , FaBriefcase , FaStar, FaUserShield, FaChalkboardTeacher, FaCalendarAlt, FaBell, FaChartArea  } from 'react-icons/fa'; 

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
                        <NavLink to="/studentprofile/studentadd" activeClassName="active-link" ><FaFileAlt /> Add Personal Details</NavLink>
                        <NavLink to="/studentprofile/interestsadd" activeClassName="active-link"><FaFileArchive /> Add Interests</NavLink>
                        <NavLink to="/studentprofile/studentview" activeClassName="active-link" ><FaEye /> View Profile</NavLink>

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
                        <NavLink to="/progresstracker/degrees" activeClassName="active-link" ><FaGraduationCap /> Degrees</NavLink>
                        <NavLink to="/progresstracker/courses" activeClassName="active-link" ><FaBriefcase /> Courses</NavLink>
                        <NavLink to="/progresstracker/jobs" activeClassName="active-link"  ><FaBook /> Job Listings & Internships</NavLink>
                    </div>
                )}
                <Link><FaFileAlt /> Resume Builder</Link>
                <NavLink to="/student/chatbot" activeClassName="active-link"><FaComments /> Chatbot</NavLink>
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
