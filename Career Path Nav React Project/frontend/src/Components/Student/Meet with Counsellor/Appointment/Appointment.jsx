import React, { useState } from "react";
import Upperheader from "../../../UpperHeader/upperheader";
import Card from "../../../Admin/Counsellor View/card"; // Import the Card component
import "./appointment.css";
import Swal from 'sweetalert2';

export default function Appointment() {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14); // Set the max date to 2 weeks from today

  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [showCounsellors, setShowCounsellors] = useState(false);
  const [counsellors, setCounsellors] = useState([]);

  const handleShowCounselors = async () => {
    if (!selectedDate || !startTime) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Please select both a date and a start time.',
        });
        return;
      }

    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${startTime}`);
    if (selectedDateTime < now) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Date/Time',
          text: 'You cannot select a past date or time.',
        });
        return;
      }

    try {
      const response = await fetch(
        `https://marshy-brainy-weight.glitch.me/users-counsellors?selectedDate=${selectedDate}&selectedTime=${startTime}`
      );
      const counsellors = await response.json();

      // Map counsellors to include their image URLs
      const updatedCounsellors = counsellors.map((counsellor) => ({
        ...counsellor,
        Img: counsellor.Img
          ? `https://marshy-brainy-weight.glitch.me${counsellor.Img}`
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-GsgDIkePXBSguri_zUGTWG0YEY1hMaKNw&s", // Fallback image
      }));

      setCounsellors(updatedCounsellors); // Save counsellors with image URLs
      setShowCounsellors(true);
    } catch (err) {
      console.error("Error fetching counsellors:", err);
      alert("Failed to fetch counsellors.");
    }
  };

  return (
    <div>
      <Upperheader title="Select your Counsellor" name={username} />
      <div className="appointment-container">
        <h3 className="appointment-heading">Book an Appointment</h3>

        <div className="appointment-form-row">
          <div className="appointment-form-group">
            <label htmlFor="date" className="appointment-label">
              Select Date (Within 2 Weeks):
            </label>
            <input
              type="date"
              id="date"
              min={today.toISOString().split("T")[0]} // Today's date
              max={maxDate.toISOString().split("T")[0]} // Max date (2 weeks)
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="appointment-input"
            />
          </div>

          <div className="appointment-form-group">
            <label htmlFor="time" className="appointment-label">
              Select Start Time:
            </label>
            <input
              type="time"
              id="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="appointment-input"
            />
          </div>
        </div>

        <button onClick={handleShowCounselors} className="appointment-button">
          Show Counselors
        </button>
      </div>

      {showCounsellors && counsellors.length > 0 && (
        <div className="counsellor-card-grid" style={{ marginTop: "20px" }}>
          {counsellors.map((counsellor, index) => (
            <Card
              key={index} // Add key to avoid key warning
              pic={counsellor.Img} // Pass the image URL directly to the Card component
              heading={`${counsellor.firstName} ${counsellor.lastName}`}
              email={counsellor.email}
              expertise={counsellor.expertise}
              availableDays={counsellor.availableDays}
              timeSlots={counsellor.timeSlots}
              hourlyRate={counsellor.hourlyRate}
              status={counsellor.status}
              meetingdate = {selectedDate}
              meetingtime = {startTime}
              studentId = {userData.user.userId}
              counsellorId = {counsellor.counsellorId}
              appointmentMode={true} // Enable appointment mode
            />
          ))}
        </div>
      )}
    </div>
  );
}
