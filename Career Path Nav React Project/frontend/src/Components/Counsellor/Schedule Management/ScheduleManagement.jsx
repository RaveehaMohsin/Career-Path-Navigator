import React, { useEffect, useState } from "react";
import "./schedulemanagement.css";
import Upperheader from "../../UpperHeader/upperheader";
import Swal from "sweetalert2";

export default function ScheduleManagement() {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentuser = userData.user;
  const username = `${currentuser.firstName} ${currentuser.lastName}`;

  const [daysAvailable, setDaysAvailable] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState({ start: "", end: "" });
  const [expertise, setExpertise] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        const response = await fetch(`https://marshy-brainy-weight.glitch.me/getschedule/${currentuser.userId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch counselor data.");
        }
        const data = await response.json();
        setExpertise(data?.expertise || "");
        setQualifications(data?.qualifications || "");
        setHourlyRate(data?.hourlyRate || "");
        setDaysAvailable(data?.daysAvailable || 0);
        setSelectedDays(data?.selectedDays || []);
        setTimeSlots(data?.timeSlots || { start: "", end: "" });
      } catch (error) {
        console.error("Error fetching counselor data:", error);
        Swal.fire({
          icon: "error",
          title: "Fetch Error",
          text: "Failed to load counselor data.",
        });
      }
    };

    fetchCounselorData();
  }, [currentuser.userId]);

  const handleDaysAvailableChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1 || value > 7) {
      alert("Number of days must be between 1 and 7.");
    } else {
      setDaysAvailable(value);
      setSelectedDays([]); // Reset selected days
    }
  };

  const handleDaySelection = (day) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((selectedDay) => selectedDay !== day)
      : [...selectedDays, day];

    if (newSelectedDays.length > daysAvailable) {
      alert(`You can select up to ${daysAvailable} days.`);
      return;
    }
    setSelectedDays(newSelectedDays);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeSlots((prev) => ({ ...prev, [name]: value }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!timeSlots.start || !timeSlots.end) {
    Swal.fire({
      icon: "error",
      title: "Missing Time Slots",
      text: "Please provide valid time slots.",
    });
    return;
  }

  if (selectedDays.length !== daysAvailable) {
    Swal.fire({
      icon: "error",
      title: "Day Selection Error",
      text: `Please select exactly ${daysAvailable} days.`,
    });
    return;
  }

  if (!expertise || !qualifications || !hourlyRate) {
    Swal.fire({
      icon: "error",
      title: "Incomplete Information",
      text: "Please fill out all required fields.",
    });
    return;
  }

  try {
    const response = await fetch("https://marshy-brainy-weight.glitch.me/addschedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        counsellorId: currentuser.userId, // Assuming the user object contains an ID
        expertise,
        qualifications,
        hourlyRate,
        daysAvailable,
        selectedDays,
        timeSlots,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.error || "An unexpected error occurred.",
      });
    }
  } catch (error) {
    console.error("Error submitting schedule:", error);
    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: "An error occurred while saving the schedule.",
    });
  }
};

  return (
    <div>
    <Upperheader title="Add your Timings" name={username} />
    <div className="schedule-page">   
      <h1 className="schedule-header">Schedule Management</h1>
      <form onSubmit={handleSubmit} className="schedule-form">
        <div className="form-section">
          <label>Expertise</label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            placeholder="Enter expertise (e.g., Career Counselling)"
            required
          />
        </div>
        <div className="form-section">
          <label>Qualifications</label>
          <textarea
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Enter qualifications"
          ></textarea>
        </div>
        <div className="form-section">
          <label>Hourly Rate</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="Enter hourly rate in $"
            required
          />
        </div>
        <div className="form-section">
          <label>Number of Days Available</label>
          <input
            type="number"
            min="1"
            max="7"
            value={daysAvailable}
            onChange={handleDaysAvailableChange}
            required
          />
        </div>
        <div className="form-section">
          <label>Available Days</label>
          <div className="radio-group">
            {days.map((day) => (
              <label key={day}>
                <input
                  type="radio"
                  value={day}
                  disabled={
                    selectedDays.length >= daysAvailable && !selectedDays.includes(day)
                  }
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDaySelection(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        <div className="form-section">
          <label>Time Slots</label>
          <div className="time-slots">
            <input
              type="time"
              name="start"
              value={timeSlots.start}
              onChange={handleTimeChange}
              required
            />
            <span>to</span>
            <input
              type="time"
              name="end"
              value={timeSlots.end}
              onChange={handleTimeChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Save Schedule
        </button>
      </form>
    </div>
    </div>
  );
}
