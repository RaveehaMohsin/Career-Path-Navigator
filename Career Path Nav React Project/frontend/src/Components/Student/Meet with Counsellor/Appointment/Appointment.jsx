import React, { useState } from 'react';
import Upperheader from "../../../UpperHeader/upperheader";
import Card from "../../../Admin/Counsellor View/card"; // Import the Card component
import C1 from "../../../../Assets/C1.jpg"; // Example image path

export default function Appointment() {
    const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
    const username = userData.user.firstName + " " + userData.user.lastName;

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 14); // Set the max date to 2 weeks from today

    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [showCounsellors, setShowCounsellors] = useState(false); // State to show cards

    const handleShowCounselors = () => {
        const now = new Date();
    
        if (!selectedDate || !startTime) {
            alert("Please select both a date and a start time.");
            return;
        }
    
        const selectedDateTime = new Date(`${selectedDate}T${startTime}`);
        if (selectedDateTime < now) {
            alert("You cannot select a past date or time.");
            return;
        }
    
        setShowCounsellors(true); // Show the cards
        console.log("Selected Date:", selectedDate);
        console.log("Selected Start Time:", startTime);
    };

    return (
        <div>
            <Upperheader title="Select your Counsellor" name={username} />
            <div style={{ padding: '20px' }}>
                <h3>Book an Appointment</h3>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="date">Select Date (Within 2 Weeks):</label>
                    <input
                        type="date"
                        id="date"
                        min={today.toISOString().split('T')[0]} // Today's date
                        max={maxDate.toISOString().split('T')[0]} // Max date (2 weeks)
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="time">Select Start Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </div>
                <button
                    onClick={handleShowCounselors}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Show Counselors
                </button>
            </div>

            {showCounsellors && ( // Conditionally render the Card component
                <div className="counsellor-card-grid" style={{ marginTop: '20px' }}>
                    <Card
                        pic={C1}
                        heading="John Doe"
                        paragraph="Career Counsellor"
                        label1="Male"
                        label2="Business"
                        label3="10 years of Experience"
                    />
                </div>
            )}
        </div>
    );
}
