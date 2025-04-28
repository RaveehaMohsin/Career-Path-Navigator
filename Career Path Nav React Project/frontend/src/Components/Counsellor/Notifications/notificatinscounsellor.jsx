import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Upperheader from "../../UpperHeader/upperheader";
import "../../Student/Meet with Counsellor/Notifications/notifications.css"; // Import styles
import image from "../../../Assets/nomail.png";

const CounsellorNotifications = () => {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = `${userData?.user?.firstName || ''} ${userData?.user?.lastName || ''}`;


  const [alreadymeetings, setAlreadymeetings] = useState([]);
  const [remainingTimes, setRemainingTimes] = useState({});
  const [formattedCurrentTime, setFormattedCurrentTime] = useState(''); // To store formatted current time

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      const currentTime = new Date();
      setFormattedCurrentTime(formatTimeforcurrent(currentTime)); // Set formatted current time
    }, 1000);

    return () => clearInterval(timer); // Clean up timer on unmount
  }, []);

  // Function to calculate the status of the meeting
const calculateStatus = (meetingTime, meetingDate) => {
  const meetingStart = meetingTime;  // Format meeting start time to 'HH:mm'
  meetingDate = formatDate(meetingDate);  // Format meeting date to 'YYYY-MM-DD'

  // Combine the meeting date and time into a single Date object in local time
  const formattedMeetingDateTime = new Date(meetingDate + 'T' + meetingStart); // ISO format: YYYY-MM-DDTHH:mm

  // Get the current date and time in local timezone
  const currentDateTime = new Date();

  // Ensure both are valid Date objects
  if (isNaN(formattedMeetingDateTime) || isNaN(currentDateTime)) {
      console.error("Invalid time or date format for meeting or current time.");
      return {
          status: "Error",
          timeLeft: "Invalid time or date format",
          buttonEnabled: false,
      };
  }

  // Calculate the time difference and status
  if (currentDateTime < formattedMeetingDateTime) {
      // Meeting is in the future (Pending)
      const timeLeft = formattedMeetingDateTime - currentDateTime;
      
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); // 1 day = 86400000 ms
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Remaining hours
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // Remaining seconds

      console.log(`Time Left: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);

      return {
          status: "Pending",
          timeLeft: `${days}d ${hours}h ${minutes}m ${seconds}s`,
          buttonEnabled: false,
      };
  } else {
      // Check if the meeting is ongoing or completed
      const meetingEndDateTime = new Date(formattedMeetingDateTime);
      meetingEndDateTime.setHours(meetingEndDateTime.getHours() + 1); // Assume meeting duration is 1 hour

      if (currentDateTime >= formattedMeetingDateTime && currentDateTime <= meetingEndDateTime) {
          // Meeting is ongoing
          return {
              status: "Ongoing",
              timeLeft: "Meeting is in progress",
              buttonEnabled: true,
          };
      } else {
          // Meeting is completed
          return {
              status: "Completed",
              timeLeft: "Meeting already ended",
              buttonEnabled: false,
          };
      }
  }
};


  useEffect(() => {
    // Update remaining times for each meeting dynamically
    const timer = setInterval(() => {
      if (alreadymeetings && alreadymeetings.length > 0) {
        const updatedRemainingTimes = {};
        alreadymeetings.forEach((meeting, index) => {
          updatedRemainingTimes[index] = calculateStatus(meeting.MeetingTime , meeting.MeetingDate);
        });
        setRemainingTimes(updatedRemainingTimes);
      }
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clean up timer on unmount
  }, [alreadymeetings, formattedCurrentTime]); // Depend on formattedCurrentTime to update when it changes


  const formatDate = (isoString) => {
    const date = new Date(isoString);
    // Convert to local date using toLocaleDateString
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Adjust to local timezone
    return localDate.toISOString().split('T')[0]; // Extract the date part in 'YYYY-MM-DD'
};


// Function to get current time formatted as 'HH:mm' in local timezone
const formatTimeforcurrent = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};


 
    // Fetch meetings based on user
    const getmeetingdetails = async () => {
        const response = await fetch(`http://localhost:4000/get-meetings`);
        const result = await response.json();
    
        // Filter the meetings to find one that matches the current user's ID
        const userMeeting = result.meetings.filter(meeting => meeting.counsellorId === userData.user.userId);
        console.log(userMeeting);
    
        if (userMeeting) {
          setAlreadymeetings(userMeeting); // If a match is found, set meeting details
        } else {
          setAlreadymeetings(null); // If no match, clear the meeting details
        }
      };

      const handleGoToMeeting = (link) => {
        // Open the meeting link in a new tab
        window.open(link, '_blank');
      };
      
      useEffect(() => {
        getmeetingdetails();
      }, []); 
    

  return (
    <div>
      <Upperheader title="Notifications" name={username} />
      {alreadymeetings && alreadymeetings.length > 0 ? (
        <div className="notification-container">
          <h3>Meeting Details</h3>
          {alreadymeetings.map((meeting, index) => {
    const { status, timeLeft, buttonEnabled } = remainingTimes[index] || {};
    const meetingClass = status === 'Completed' ? 'completed' : status === 'Pending' ? 'pending' : 'ongoing';

    return (
      <div key={index} className={`meeting-details-container ${meetingClass}`}>
        <div className="meeting-details">
          <p><strong>Student:</strong> {meeting.studentFirstName + ' ' + meeting.studentLastName}</p>
          <p><strong>Meeting Date:</strong> {formatDate(meeting.MeetingDate)}</p>
          <p><strong>Meeting Time:</strong> {meeting.MeetingTime}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Time Left:</strong> {timeLeft}</p>
        </div>
        <div className="meeting-button">
          {buttonEnabled ? (
            <button onClick={() => handleGoToMeeting(meeting.meetLink)} className="go-to-meeting-btn">
              Go to Meeting
            </button>
          ) : (
            <button disabled className="link-unavailable-btn">Link Unavailable</button>
          )}
        </div>
      </div>
    );
  })}
        </div>
      ) : (
        <div className="no-notifications">
          <img src={image} alt="No notifications" />
          <h3>No Meetings Scheduled</h3>
          <p>You're all caught up! There are no upcoming meetings at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default CounsellorNotifications;
