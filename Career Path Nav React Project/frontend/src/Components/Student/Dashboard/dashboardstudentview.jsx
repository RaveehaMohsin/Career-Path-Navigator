import React, { useState } from "react";
import "../../Admin/Dashboard/dashboardadminview.css";
import Upperheader from "../../UpperHeader/upperheader";
import { RxPerson } from "react-icons/rx";
import AreaLineChart from "../../Admin/Dashboard/lineareachart";
import DoubleAreaLineChart from "../../Admin/Dashboard/doublearealine";
import BarChart from "../../Admin/Dashboard/barchart";
import { GiReceiveMoney } from "react-icons/gi";
import { SiGooglemeet } from "react-icons/si";
import { IoSchoolOutline } from "react-icons/io5";

const DashboradStudentView = () => {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const linechartData = [40, 70, 50, 60, 75, 50];
  const doublelinechartLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];
  const doublelinechartData = [
    {
      label: "Revenue",
      data: [20, 50, 80, 45, 60, 40, 70, 30, 100, 10],
      borderColor: "#fb7d5b",
      borderWidth: 4,
      tension: 0.4,
      fill: false,
    },
    {
      label: "Meetings",
      data: [30, 60, 50, 70, 40, 85, 60, 70, 70, 100],
      borderColor: "#00273a",
      backgroundColor: "rgba(0, 39, 58, 0.1)",
      borderWidth: 4,
      fill: true,
      tension: 0.4,
    },
  ];
  const doublelinechartLegends = [
    { label: "Invoices", color: "#fb7d5b" },
    { label: "Meetings", color: "#00273a" },
  ];

  const barchartData = [
    3, -1, -2, 2, -1, 3, 1, -1, 3, 0, 1, -1, -2, -1, 3, -2, 3, 3, -1, 3,
  ]; // The Y-axis values
  const barChartlabels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]; // The X-axis labels
  const barChartstatus = {
    p1: "3. Current Job",
    p2: "2. Offered",
    p3: "1. Interviewed",
    p4: "-1. Whishlist",
    p5: "-2. Rejected",
  };
  const barCharttitleData = "Jobs Evaluation";

  const meetings = [
    {
      id: 1,
      name: "Ali Ahmed",
      gender: "Male",
      meetingTime: "10:00 AM",
      meetingDate: "2024-12-05",
      amount: "$50",
    },
    {
      id: 2,
      name: "Sara Khan",
      gender: "Female",
      meetingTime: "2:00 PM",
      meetingDate: "2024-12-06",
      amount: "$60",
    },
    {
      id: 3,
      name: "Usman Malik",
      gender: "Male",
      meetingTime: "11:00 AM",
      meetingDate: "2024-12-07",
      amount: "$55",
    },
    {
      id: 4,
      name: "Ayesha Tariq",
      gender: "Female",
      meetingTime: "4:00 PM",
      meetingDate: "2024-12-08",
      amount: "$45",
    },
    {
      id: 5,
      name: "Hamza Sheikh",
      gender: "Male",
      meetingTime: "9:00 AM",
      meetingDate: "2024-12-09",
      amount: "$70",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const handleNext = () => {
    if (currentPage < Math.ceil(meetings.length / entriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Upperheader title="Dashboard" name={username}/>

      <div className="unique-main-wrapper">
        <div className="unique-row-wrapper">
          {/* First Div in Row */}
          <div className="unique-column-container">
            <div className="unique-vertical-container unique-box-a">
              <div className="info-box-card">
                <div>
                  <div className="info-box-card-image-container">
                    <IoSchoolOutline className="info-box-card-image" />
                  </div>

                  <p>Completed Degrees</p>
                  <h3>2</h3>
                  {/* Compare last two months completed degrees if count is greater or less */}
                  <p>+10% than month </p>
                </div>
              </div>

              <div className="info-box-card">
                <div>
                  <div className="info-box-card-image-container02">
                    <IoSchoolOutline className="info-box-card-image" />
                  </div>

                  <p>Pending Degrees</p>
                  <h3>1</h3>
                  {/* Compare last two months pending degrees if count is greater or less */}
                  <p>-5% than month </p>
                </div>
              </div>
            </div>
            <div className="unique-vertical-container unique-box-b">
              <div className="info-box-card">
                <div>
                  <div className="info-box-card-image-container03">
                    <GiReceiveMoney className="info-box-card-image" />
                  </div>

                  <p>Total Meetings</p>
                  <h3>6</h3>
                  {/* Compare last two months invoice amount if count is greater or less */}
                  <p> +15% than month </p>
                </div>

                <div className="line-chart-container">
                  {/* Line chart on all invoice prices of meets that taken by him/her*/}
                  <AreaLineChart data={linechartData} />
                </div>
              </div>
            </div>
          </div>
          {/* Second Div in Row */}
          <div className="unique-column-container">
            <div className="unique-vertical-container unique-box-c">
              <div className="chart-content-container">
              
                <DoubleAreaLineChart
                  title="Payment & Meetings Held"
                  chartLabels={doublelinechartLabels}
                  chartData={doublelinechartData}
                  chartLegends={doublelinechartLegends}
                />
              </div>
            </div>
            <div className="unique-vertical-container unique-box-d">
              <div className="chart-content-container">
                {/* This will create the bar chart on the latest degree of students....
                    SELECT 
                    j.jobTitle AS JobTitle,
                    CASE 
                        WHEN j.status = 'current job' THEN 3
                        WHEN j.status = 'offered' THEN 2
                        WHEN j.status = 'interviewed' THEN 1
                        WHEN j.status = 'whishlist' THEN -1
                        WHEN j.status = 'rejected' THEN -2
                        ELSE 0 -- Handles unexpected or null statuses
                    END AS JobStatusValue
                    FROM Jobs j
                    WHERE j.studentId = @StudentId -- Replace @StudentId with the specific student's ID
                    ORDER BY j.jobTitle; */}
                <BarChart
                  titleData={barCharttitleData}
                  labels={barChartlabels}
                  status={barChartstatus}
                  chartData={barchartData}
                />
              </div>
            </div>
          </div>
          {/* Third Div in Row */}
          <div className="unique-column-container">
            <div className="table-cobntet-last-container">
              <div className="dashboard-info-container">
                {/* 
                        SELECT 
                        c.firstName + ' ' + c.lastName AS CounsellorName,
                        p.Gender AS CounsellorGender,
                        m.MeetingTime AS MeetingTime,
                        m.MeetingDate AS MeetingDate,
                        i.amount AS InvoiceAmount
                          FROM Meeting m
                          JOIN Counsellor cl ON m.counsellorId = cl.counsellorId
                          JOIN Users c ON cl.counsellorId = c.userId
                          JOIN Person p ON c.userId = p.userId
                          JOIN Invoice i ON m.invoiceId = i.invoiceId
                          WHERE m.studentId = @StudentId -- Replace @StudentId with the student's ID
                          ORDER BY m.MeetingDate DESC, m.MeetingTime DESC; */}

                <h3 className="dashboard-heading">Meetings Overview</h3>
                <table className="dashboard-info-table">
                  <thead>
                    <tr>
                      <th className="dashboard-table-heading">Counsellor Name</th>
                      <th className="dashboard-table-heading">Gender</th>
                      <th className="dashboard-table-heading">Meeting Time</th>
                      <th className="dashboard-table-heading">Meeting Date</th>
                      <th className="dashboard-table-heading">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {meetings.map((meeting) => (
                      <tr key={meeting.id}>
                        <td>{meeting.name}</td>
                        <td>{meeting.gender}</td>

                        <td>{meeting.meetingTime}</td>
                        <td>{meeting.meetingDate}</td>
                        <td>{meeting.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination buttons */}
                <div className="dashboard-pagination-buttons">
                  <button
                    className="dashboard-pagination-button"
                    onClick={handlePrevious}
                  >
                    &#8592; {/* Left arrow */}
                  </button>
                  <button
                    className="dashboard-pagination-button"
                    onClick={handleNext}
                  >
                    &#8594; {/* Right arrow */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboradStudentView;
