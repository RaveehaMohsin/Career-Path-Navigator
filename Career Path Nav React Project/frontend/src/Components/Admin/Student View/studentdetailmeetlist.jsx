import React from "react";
import Upperheader from "../../UpperHeader/upperheader";
import DataTableMeetView from "../Detailed Meeting List/detailMeetList";

const StudentDetailMeetList = () => {
  const columns = [
    "Counsellor",
    "Meet Date",
    "Meet Link",
    "Meet Time",
    "Status",
    "Amount",
  ];
  const data = [
    {
      Counsellor: "Alice Smith",
      "Meet Date": "2024-01-10",
      "Meet Link": "https://meet.example.com/123",
      "Meet Time": "10:00 AM - 11:00 AM",
      Status: "Paid",
      Amount: "$50",
    },
    {
      Counsellor: "Bob Johnson",
      "Meet Date": "2024-01-11",
      "Meet Link": "https://meet.example.com/456",
      "Meet Time": "02:00 PM - 03:00 PM",
      Status: "Pending",
      Amount: "$40",
    },
    {
      Counsellor: "Charlie Brown",
      "Meet Date": "2024-01-12",
      "Meet Link": "https://meet.example.com/789",
      "Meet Time": "04:00 PM - 05:00 PM",
      Status: "Paid",
      Amount: "$60",
    },
    {
      Counsellor: "Diana Davis",
      "Meet Date": "2024-01-13",
      "Meet Link": "https://meet.example.com/101",
      "Meet Time": "01:00 PM - 02:00 PM",
      Status: "Pending",
      Amount: "$45",
    },
    {
      Counsellor: "Edward Taylor",
      "Meet Date": "2024-01-14",
      "Meet Link": "https://meet.example.com/202",
      "Meet Time": "03:00 PM - 04:00 PM",
      Status: "Paid",
      Amount: "$55",
    },
  ];

  return (
    <div>
      <Upperheader title="View Detail Meetings List" />

      <DataTableMeetView
        columns={columns}
        data={data}
        title="Meets scheduled at 10-January-2024"
      />
    </div>
  );
};

export default StudentDetailMeetList;
