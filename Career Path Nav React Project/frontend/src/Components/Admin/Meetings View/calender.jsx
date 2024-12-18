import React, { useEffect, useState } from "react";
import "./calender.css";

const Calender = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));

  // State for year, month, and meeting counts
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [meetingCounts, setMeetingCounts] = useState({}); // Store meeting counts by date

  // Assuming `userdata.user.userId` is available in your application
  const counsellorId = userData?.user?.userId; // Replace with actual access to user data

  // Helper to generate days for the month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);

  // Array of custom colors
  const buttonColors = ["#1eba62", "#fb7d5b", "#00273a"];

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Array of day names
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Year options (5 years before and after the current year)
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // Fetch meeting counts from the backend
  useEffect(() => {
    const fetchMeetingCounts = async () => {
      try {
        // Construct the fetch URL based on whether counsellorId is present
        let url = `https://marshy-brainy-weight.glitch.me/get-meetings-count?year=${year}&month=${month + 1}`;

        if (window.location.pathname.includes("/counsellor/meetview") && counsellorId) {
          // Add counsellorId to the request URL
          url += `&counsellorId=${counsellorId}`;
        }

        const response = await fetch(url); // Fetch for the selected year, month, and optional counsellorId
        if (!response.ok) {
          throw new Error("Failed to fetch meeting counts");
        }

        const result = await response.json();
        setMeetingCounts(result.counts); // Expect counts in { "2024-12-02": 2, ... } format
      } catch (error) {
        console.error("Error fetching meeting counts:", error);
      }
    };

    fetchMeetingCounts();
  }, [year, month, counsellorId]);

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
        {Array.from({ length: daysInMonth }, (_, dayIndex) => {
          const date = new Date(year, month, dayIndex + 2)
            .toISOString()
            .substring(0, 10); // Format as YYYY-MM-DD
          const count = meetingCounts[date] || 0; // Default to 0 if no meetings
          return (
            <div key={dayIndex} className="calendar-date">
              <span>{dayIndex + 1}</span>
              <button
                style={{
                  color: buttonColors[dayIndex % buttonColors.length], // Apply cyclic colors
                  backgroundColor: "none",
                  border: "none",
                }}
              >
                {count} {count === 1 ? "Meeting" : "Meetings"} scheduled
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calender;
