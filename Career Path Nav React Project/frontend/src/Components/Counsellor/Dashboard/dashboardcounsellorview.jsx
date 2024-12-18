import React, { useState } from "react";
import "../../Admin/Dashboard/dashboardadminview.css";
import Upperheader from "../../UpperHeader/upperheader";
import { RxPerson } from "react-icons/rx";
import AreaLineChart from "../../Admin/Dashboard/lineareachart";
import DoubleAreaLineChart from "../../Admin/Dashboard/doublearealine";
import BarChart from "../../Admin/Dashboard/barchart";
import { GiReceiveMoney } from "react-icons/gi";
import { SiGooglemeet } from "react-icons/si";

const DashboradCounsellorView = () => {
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
    { label: "Revenue", color: "#fb7d5b" },
    { label: "Meetings", color: "#00273a" },
  ];

  const barchartData = [
    3, -1, -2, 4, -1, 5, 4, -1, 5, 0, 4, -1, -2, -1, 3, -2, 3, 5, -1, 3,
  ]; // The Y-axis values
  const barChartlabels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]; // The X-axis labels 
  const barChartstatus = {
    p1: "5. Positive",
    p2: "4. Positive",
    p3: "3. Positive",
    p4: "2. Negative",
    p5: "1. Negative",
  }; 
  const barCharttitleData = "Feedback Evaluation"; 

  const meetings = [
    {
      id: 1,
      studentName: "Ali Ahmed",
      gender: "Male",
      meetingTime: "10:00 AM",
      meetingDate: "2024-12-05",
      amount: "$50",
    },
    {
      id: 2,
      studentName: "Sara Khan",
      gender: "Female",
      meetingTime: "2:00 PM",
      meetingDate: "2024-12-06",
      amount: "$60",
    },
    {
      id: 3,
      studentName: "Usman Malik",
      gender: "Male",
      meetingTime: "11:00 AM",
      meetingDate: "2024-12-07",
      amount: "$55",
    },
    {
      id: 4,
      studentName: "Ayesha Tariq",
      gender: "Female",
      meetingTime: "4:00 PM",
      meetingDate: "2024-12-08",
      amount: "$45",
    },
    {
      id: 5,
      studentName: "Hamza Sheikh",
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
      <Upperheader title="Dashboard" name={username} />

      <div className="unique-main-wrapper">
        <div className="unique-row-wrapper">
          {/* First Div in Row */}
          <div className="unique-column-container">
            <div className="unique-vertical-container unique-box-a">
              <div className="info-box-card">
                <div>
                  <div className="info-box-card-image-container">
                    <RxPerson className="info-box-card-image" />
                  </div>

                  <p>Total Students</p>
                  <h3>943</h3>
                  {/* Compare last two months student if count is greater or less */}
                  <p>+10% than month </p>
                </div>
              </div>

              <div className="info-box-card">
                <div>
                  <div className="info-box-card-image-container02">
                    <SiGooglemeet className="info-box-card-image" />
                  </div>

                  <p>Total Meetings</p>
                  <h3>86</h3>
                  {/* Compare last two months Counsellors if count is greater or less */}
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

                  <p>Total Balance</p>
                  <h3>$123,456</h3>
                  {/* Compare last two months invoice amount if count is greater or less */}
                  <p> +15% than month </p>
                </div>

                <div className="line-chart-container">
                  {/* Line chart on all invoice prices of meets that scheduled by him/her*/}
                  <AreaLineChart data={linechartData} />
                </div>
              </div>
            </div>
          </div>
          {/* Second Div in Row */}
          <div className="unique-column-container">
            <div className="unique-vertical-container unique-box-c">
              <div className="chart-content-container">
                {/* The query for generation of data will look like
                SELECT 
                FORMAT(Meeting.MeetingDate, 'yyyy-MM') AS Month,
                SUM(Invoice.amount) AS TotalRevenue,
                COUNT(Meeting.meetingId) AS TotalMeetings
                FROM Invoice
                JOIN Meeting ON Invoice.invoiceId = Meeting.invoiceId
                WHERE Meeting.counsellorId = @CounsellorId 
                GROUP BY FORMAT(Meeting.MeetingDate, 'yyyy-MM')
                ORDER BY FORMAT(Meeting.MeetingDate, 'yyyy-MM');
                  */}
                <DoubleAreaLineChart
                  title="Monthly Revenue & Meetings Held"
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
                    m.studentId,
                    f.rating AS FeedbackRating,
                    CASE 
                        WHEN f.rating = 3 THEN 3
                        WHEN f.rating = 4 THEN 4
                        WHEN f.rating = 5 THEN 5
                        WHEN f.rating = 1 THEN -1
                        WHEN f.rating = 2 THEN -2
                        ELSE 0 -- Neutral or unexpected ratings
                    END AS FeedbackValue
                    FROM Feedback f
                    JOIN Meeting m ON f.fromUserId = m.studentId
                    WHERE m.counsellorId = @CounsellorId -- Replace @CounsellorId with the counselor ID
                    ORDER BY m.studentId, FeedbackRating; */}
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

                {/* SELECT 
                    CONCAT(u.firstName, ' ', u.lastName) AS StudentName,
                    u.Gender,
                    FORMAT(m.MeetingTime, 'hh:mm tt') AS MeetingTime,
                    FORMAT(m.MeetingDate, 'yyyy-MM-dd') AS MeetingDate,
                    i.amount AS InvoiceAmount
                        FROM Meeting m
                        JOIN Invoice i ON m.invoiceId = i.invoiceId
                        JOIN Users u ON m.studentId = u.userId
                        JOIN Person p ON u.userId = p.userId
                        WHERE m.counsellorId = @CounsellorId
                        ORDER BY m.MeetingDate DESC, m.MeetingTime DESC; */}

                <h3 className="dashboard-heading">
                  Meetings Overview
                </h3>
                <table className="dashboard-info-table">
                  <thead>
                    <tr>
                      <th className="dashboard-table-heading">Student Name</th>
                      <th className="dashboard-table-heading">
                        Gender
                      </th>
                      <th className="dashboard-table-heading">Meeting Time</th>
                      <th className="dashboard-table-heading">Meeting Date</th>
                      <th className="dashboard-table-heading">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                  {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.studentName}</td>
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

export default DashboradCounsellorView;
