import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Upperheader from "../../UpperHeader/upperheader";
import DataTableMeetView from "../Detailed Meeting List/detailMeetList";

const CounsellorDetailMeetList = () => {
  const { mycounsellorId } = useParams();
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const [data, setData] = useState([]);
  const columns = [
    "Student",
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
  
        const filteredData = result.meetings
          .filter((meeting) => meeting.counsellorId === parseInt(mycounsellorId, 10)) // Ensure type conversion
          .map((meeting) => {
            // Convert MeetingDate to Date object
            const meetingDateTime = new Date(meeting.MeetingDate);
  
            // Extract meeting time as HH:mm
            const meetingTime = meeting.MeetingTime.substring(0, 5); // Extract HH:mm from HH:mm:ss
  
            // Split the time into hours and minutes
            const [hours, minutes] = meetingTime.split(":");
  
            // Set the hours and minutes to the meetingDateTime
            meetingDateTime.setHours(hours, minutes, 0); // Set hours and minutes to the meeting date
  
            // Determine the status based on the current time
            const now = new Date();
            const status = meetingDateTime < now ? "Done" : "Pending";
  
            return {
              Student: `${meeting.studentFirstName} ${meeting.studentLastName}`,
              "Meet Date": new Date(meeting.MeetingDate).toLocaleDateString(), // Format meeting date as local date
              "Meet Link": meeting.meetLink,
              "Meet Time": meetingTime, // Use formatted meeting time
              Status: status,
              Amount: `$${meeting.amount || 0}`, // Display amount (default to 0 if undefined)
            };
          });
  
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
  
    fetchData();
  }, [mycounsellorId]); // Depend on mycounsellorId for re-fetching data when it changes
  

  return (
    <div>
      <Upperheader title="View Meetings" name={username} />

      <DataTableMeetView
        columns={columns}
        data={data}
        title={`Meets scheduled for Counsellor ID: ${mycounsellorId}`}
      />
    </div>
  );
};

export default CounsellorDetailMeetList;
