import React, { useEffect, useState } from 'react';
import Upperheader from "../../../UpperHeader/upperheader";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import './notifications.css';  // Make sure to import the styles
import image from '../../../../Assets/nomail.png';

export default function Notifications() {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const history = useHistory();

  const [alreadymeetings, setAlreadymeetings] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  const [remainingTimes, setRemainingTimes] = useState({}); // To track remaining times for each meeting
  const [formattedCurrentTime, setFormattedCurrentTime] = useState(''); // To store formatted current time

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      const currentTime = new Date();
      setFormattedCurrentTime(formatTimeforcurrent(currentTime)); // Set formatted current time
    }, 1000);

    return () => clearInterval(timer); // Clean up timer on unmount
  }, []);

  const calculateStatus = (meetingTime, meetingDate) => {
    const meetingStart = formatTime(meetingTime);  // Format meeting start time to 'HH:mm'
    meetingDate = formatDate(meetingDate)

    // Combine the meeting date and time into a single Date object
    const formattedMeetingDateTime = new Date(meetingDate + 'T' + meetingStart); // ISO format: YYYY-MM-DDTHH:mm

    // Get the current date and time
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
    return date.toISOString().split('T')[0]; // Extract the date part
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getUTCHours().toString().padStart(2, '0'); // Get hours in UTC
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Get minutes in UTC
    return `${hours}:${minutes}`;
  };

  const formatTimeforcurrent = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');  // Get local hours and pad with 0 if necessary
    const minutes = date.getMinutes().toString().padStart(2, '0');  // Get local minutes and pad with 0 if necessary
    return `${hours}:${minutes}`;
  };

  // Fetch meetings based on user
  const getmeetingdetails = async () => {
    const response = await fetch(`http://localhost:4000/get-meetings`);
    const result = await response.json();

    // Filter the meetings to find one that matches the current user's ID
    const userMeeting = result.meetings.filter(meeting => meeting.studentId === userData.user.userId);
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
  

  // Check for session ID and verify payment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    const verifyPayment = async () => {
      try {
        const response = await fetch(`http://localhost:4000/addinvoice/verify-payment/${sessionId}`);
        const result = await response.json();
        console.log(result);

        if (result.success && !result.invoiceProcessed) {
          setMeetingDetails(result.meetingDetails);
          setInvoiceDetails(result.invoiceData);
        } else if (result.success && result.invoiceProcessed) {
          console.log('Invoice already processed for this session.');
        } else {
          history.push('/page-not-found');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        history.push('/page-not-found');
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      // If no session ID, fetch meeting details for the user
      getmeetingdetails();
    }
  }, [history]);

  const createMeetingIfDetailsAvailable = async () => {
    if (!meetingDetails) {
      return; // Exit if meetingDetails is not set
    }

    try {
      const response = await fetch('http://localhost:4000/create-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceId: invoiceDetails.invoiceID,
          studentId: meetingDetails.studentId,
          counsellorId: meetingDetails.counsellorId,
          meetingDate: meetingDetails.meetingDate,
          meetingTime: meetingDetails.meetingTime,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Meeting Link Generated',
          text: `Meeting link: ${result.meetingLink}`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to generate meeting link.',
        });
      }
    } catch (error) {
      console.error('Error generating meeting link:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
      });
    }
  };

  // Automatically create the meeting if meetingDetails is available
  useEffect(() => {
    createMeetingIfDetailsAvailable();
  }, [meetingDetails, invoiceDetails]); // Runs whenever meetingDetails or invoiceDetails change

  const handleViewMeetingLink = () => {
    window.location.href = '/meetwithcounsellor/notifications';
  };

  return (
    <div>
      <Upperheader title="Notifications" name={username} />

  {meetingDetails ? (
  <div className="notification-container">
    <h3>Meeting Details</h3>
    <div className="meeting-details-container" style={{borderLeft:"5px solid #6f42c1" , background:"linear-gradient(135deg, #f3e8ff, #d1b3e6)" }}>
      <p><strong>Student ID:</strong> {meetingDetails.studentId}</p>
      <p><strong>Counsellor ID:</strong> {meetingDetails.counsellorId}</p>
      <p><strong>Meeting Date:</strong> {formatDate(meetingDetails.meetingDate)}</p>
      <p><strong>Meeting Time:</strong> {meetingDetails.meetingTime}</p>
      
      {/* Button only appears for the current meeting */}
      <div className="meeting-button">
        <button onClick={handleViewMeetingLink}>Go to Meetings</button>
      </div>
    </div>
  </div>
) : alreadymeetings && alreadymeetings.length > 0 ? (
<div className="notification-container">
  <h3>Meeting Details</h3>
  {alreadymeetings.map((meeting, index) => {
    const { status, timeLeft, buttonEnabled } = remainingTimes[index] || {};
    const meetingClass = status === 'Completed' ? 'completed' : status === 'Pending' ? 'pending' : 'ongoing';

    return (
      <div key={index} className={`meeting-details-container ${meetingClass}`}>
        <div className="meeting-details">
          <p><strong>Counsellor:</strong> {meeting.counsellorFirstName + ' ' + meeting.counsellorLastName}</p>
          <p><strong>Meeting Date:</strong> {formatDate(meeting.MeetingDate)}</p>
          <p><strong>Meeting Time:</strong> {formatTime(meeting.MeetingTime)}</p>
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
}