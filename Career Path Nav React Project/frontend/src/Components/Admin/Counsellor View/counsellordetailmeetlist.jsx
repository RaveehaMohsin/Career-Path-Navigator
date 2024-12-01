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
        const response = await fetch(`http://localhost:4000/get-meetings`);
        if (!response.ok) {
          throw new Error("Failed to fetch meetings");
        }

        const result = await response.json();


        const filteredData = result.meetings
  .filter((meeting) => meeting.counsellorId === parseInt(mycounsellorId, 10)) // Ensure type conversion
  .map((meeting) => {
    const meetingDateTime = new Date(meeting.MeetingDate);
    const meetingTime = new Date(meeting.MeetingTime).toISOString().substring(11, 16); // Extract HH:mm

    const now = new Date();

    meetingDateTime.setHours(meetingTime.split(":")[0], meetingTime.split(":")[1], 0);

    const status = meetingDateTime < now ? "Done" : "Pending";

    return {
      Student: `${meeting.studentFirstName} ${meeting.studentLastName}`,
      "Meet Date": new Date(meeting.MeetingDate).toLocaleDateString(),
      "Meet Link": meeting.meetLink,
      "Meet Time": meetingTime, // Use formatted time
      Status: status,
      Amount: `$${meeting.amount || 0}`,
    };
  });





        setData(filteredData);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchData();
  }, [mycounsellorId]);

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
