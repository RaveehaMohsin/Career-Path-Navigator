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

  const [alreadymeetings, setAlreadymeetings] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [sessionNotification, setSessionNotification] = useState(null);

  // Fetch meetings based on user
  const getmeetingdetails = async () => {
    const response = await fetch(`http://localhost:4000/get-meetings`);
    const result = await response.json();
    
    // Filter the meetings to find one that matches the current user's ID
    const userMeeting = result.meetings.find(meeting => meeting.studentId === userData.user.userId);

    if (userMeeting) {
      setAlreadymeetings(userMeeting); // If a match is found, set meeting details
    } else {
      setAlreadymeetings(null); // If no match, clear the meeting details
    }
  };

  // Check for session ID and verify payment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
  
    const verifyPayment = async () => {
      try {
        const response = await fetch(`http://localhost:4000/addinvoice/verify-payment/${sessionId}`);
        const result = await response.json();
  
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

  // Handle meeting link generation
  const handleGenerateMeetingLink = async () => {
    if (!meetingDetails) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No meeting details found!',
      });
      return;
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

  return (
    <div>
      <Upperheader title="Notifications" name={username} />
      
      {/* If there are session details (from the URL) or already meetings, show them */}
      {meetingDetails || alreadymeetings ? (
        <div className="notification-container">
          <h3>Meeting Details</h3>
          {meetingDetails && (
            <>
              <p><strong>Student ID:</strong> {meetingDetails.studentId}</p>
              <p><strong>Counsellor ID:</strong> {meetingDetails.counsellorId}</p>
              <p><strong>Meeting Date:</strong> {meetingDetails.meetingDate}</p>
              <p><strong>Meeting Time:</strong> {meetingDetails.meetingTime}</p>
              <button onClick={handleGenerateMeetingLink} className="generate-meeting-button">
            Generate Meeting Link
          </button>
            </>
          )}

          {alreadymeetings && !meetingDetails && (
            <>
              <p><strong>Student ID:</strong> {alreadymeetings.studentId}</p>
              <p><strong>Counsellor ID:</strong> {alreadymeetings.counsellorId}</p>
              <p><strong>Meeting Date:</strong> {alreadymeetings.MeetingDate}</p>
              <p><strong>Meeting Time:</strong> {alreadymeetings.MeetingTime}</p>
            </>
          )}

          
        </div>
      ) : (
        <div className="notification no-notifications">
          <img src={image} alt="No notifications" />
          <h3>No Notifications Yet</h3>
          <p>No new meeting details available.</p>
        </div>
      )}
    </div>
  );
}
