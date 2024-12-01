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
        const response = await fetch(`http://localhost:4000/get-meetings`);
        if (!response.ok) {
          throw new Error("Failed to fetch meetings");
        }

        const result = await response.json();

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
            const meetingDateTime = new Date(meeting.MeetingDate);
            const meetingTime = new Date(meeting.MeetingTime)
              .toISOString()
              .substring(11, 16); // Extract HH:mm format

            const now = new Date();

            // Combine meeting date and time for comparison
            meetingDateTime.setHours(
              meetingTime.split(":")[0],
              meetingTime.split(":")[1],
              0
            );

            const status = meetingDateTime < now ? "Done" : "Pending";

            return {
              Counsellor: `${meeting.counsellorFirstName} ${meeting.counsellorLastName}`, // Counsellor name
              "Meet Date": new Date(meeting.MeetingDate).toLocaleDateString(), // Format meet date
              "Meet Link": meeting.meetLink,
              "Meet Time": meetingTime, // Use formatted time
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
