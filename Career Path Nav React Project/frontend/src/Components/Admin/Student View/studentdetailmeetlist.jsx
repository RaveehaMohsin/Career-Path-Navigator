import React, { useEffect, useState } from "react";
import Upperheader from "../../UpperHeader/upperheader";
import DataTableMeetView from "../Detailed Meeting List/detailMeetList";
import { useParams, useLocation } from "react-router-dom";

const StudentDetailMeetList = () => {
  const { userId } = useParams();
  const location = useLocation(); // Get the current URL
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const [data, setData] = useState([]);
  const columns = [
    "Counsellor",
    "Meet Date",
    "Meet Link",
    "Meet Time",
    "Status",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://marshy-brainy-weight.glitch.me/get-meetings`);
        if (!response.ok) {
          throw new Error("Failed to fetch meetings");
        }
  
        const result = await response.json();
        console.log(result)
  
        // Check if the URL contains 'counsellor'
        const isCounsellor = location.pathname.includes('counsellor');
  
        // Filter and map data for the given student ID
        const filteredData = result.meetings
          .filter((meeting) => meeting.studentId === parseInt(userId, 10))
          .filter((meeting) => {
            if (isCounsellor) {
              // If URL contains 'counsellor', check if the counsellorId matches
              return meeting.counsellorId === userData.user.userId;
            }
            return true; // No filtering by counsellorId for other cases
          })
          .map((meeting) => {
            // Format meeting date
            const meetingDate = new Date(meeting.MeetingDate);
            const formattedDate = new Date(meetingDate.getTime() - meetingDate.getTimezoneOffset() * 60000)
              .toISOString()
              .split('T')[0]; // Format as 'YYYY-MM-DD'
  
            // Use the time provided in the backend directly (no need to create a Date object)
            const meetingTime = meeting.MeetingTime; // Time is already in the format HH:mm:ss
  
            const now = new Date();
            const meetingDateTime = new Date(meeting.MeetingDate);
            const [hours, minutes] = meetingTime.split(":"); // Split time into hours and minutes
            meetingDateTime.setHours(hours, minutes, 0); // Set meeting time
  
            const status = meetingDateTime < now ? "Done" : "Pending";
  
            return {
              Counsellor: `${meeting.counsellorFirstName} ${meeting.counsellorLastName}`, // Counsellor name
              "Meet Date": formattedDate, // Use the formatted date
              "Meet Link": meeting.meetLink,
              "Meet Time": meetingTime.substring(0, 5), // Format as HH:mm
              Status: status,
            };
          });
  
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
  
    fetchData();
  }, [userId, location]); // Depend on userId from URL and location
  

  return (
    <div>
      <Upperheader title="View Meetings" name={username} />

      <DataTableMeetView
        columns={columns}
        data={data}
        title={`Meets scheduled for Student ID: ${userId}`}
      />
    </div>
  );
};

export default StudentDetailMeetList;
