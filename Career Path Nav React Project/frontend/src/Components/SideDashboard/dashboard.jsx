import React, { useState, useEffect } from 'react';
import './dashboard.css'; // Ensure this file is created and styled as before

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleResize = () => {
        // Automatically close the sidebar if the screen width is less than 768px
        if (window.innerWidth < 768) {
            setIsOpen(false);
        } else {
            setIsOpen(true); // Optionally keep it open on larger screens
        }
    };

    useEffect(() => {
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Call the handler right away so the sidebar state is correct on mount
        handleResize();

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="hamburger" onClick={toggleSidebar}>
                &#9776; {/* Hamburger icon */}
            </button>
            <nav className="nav">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
        </div>
    );
};

export default Dashboard;
