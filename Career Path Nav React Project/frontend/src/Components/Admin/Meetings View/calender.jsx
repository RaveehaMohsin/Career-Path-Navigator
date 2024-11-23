import React, { useState } from "react";
import "./meetingview.css";

const Calender = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // State for year and month
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  // Helper to generate days for the month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);

  // Array of custom colors
  const buttonColors = ["#1eba62", "#fb7d5b", "#00273a"];

  // Array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Array of day names
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Year options (5 years before and after the current year)
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // Handle year and month change
  const handleYearChange = (event) => setYear(parseInt(event.target.value));
  const handleMonthChange = (event) => setMonth(parseInt(event.target.value));

  return (
    <div className="calendar-container">
      {/* Filters and Month-Year Heading */}
      <div className="calendar-header">
        <h2>
          {monthNames[month]} {year}
        </h2>
        <div className="filters">
          <select value={year} onChange={handleYearChange}>
            {yearOptions.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>

          <select value={month} onChange={handleMonthChange}>
            {monthNames.map((monthName, index) => (
              <option key={monthName} value={index}>
                {monthName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Days Heading */}
      <div className="calendar-days">
        {dayNames.map((day) => (
          <div key={day} className="calendar-day">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {Array.from({ length: daysInMonth }, (_, dayIndex) => (
          <div key={dayIndex} className="calendar-date">
            <span>{dayIndex + 1}</span>
            <button
              style={{
                color: buttonColors[dayIndex % buttonColors.length], // Assign colors cyclically
                backgroundColor: "none",
                border: "none",
              }}
              onClick={() =>
                alert(`Selected Date: ${dayIndex + 1}-${month + 1}-${year}`)
              }
            >
              4 Meet Scheduled
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;
