import React, { useEffect, useState } from "react";
import "./dashboardadminview.css";
import Upperheader from "../../UpperHeader/upperheader";
import { RxPerson } from "react-icons/rx";
import AreaLineChart from "./lineareachart";
import DoubleAreaLineChart from "./doublearealine";
import BarChart from "./barchart";
import { GiReceiveMoney } from "react-icons/gi";

const DashboradAdminView = () => {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

    // States to store fetched data
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalCounsellors, setTotalCounsellors] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [students1, setStudents] = useState([]);
    
    useEffect(() => {
      fetch('http://localhost:4000/dashboard/student-background')
      .then(response => response.json())
      .then(data => setStudents(data)) // Setting the fetched student data
      .catch(error => console.error('Error fetching student data:', error));

      // Fetch Total Students
      fetch('http://localhost:4000/dashboard/total-students')
        .then(response => response.json())
        .then(data => setTotalStudents(data.totalStudents))
        .catch(error => console.error('Error fetching total students:', error));
      
      // Fetch Total Counsellors
      fetch('http://localhost:4000/dashboard/total-counsellors')
        .then(response => response.json())
        .then(data => setTotalCounsellors(data.totalCounsellors))
        .catch(error => console.error('Error fetching total counsellors:', error));
      
      // Fetch Total Balance
      fetch('http://localhost:4000/dashboard/total-balance')
      .then(response => response.json())
      .then(data => setTotalBalance(
        data.reduce((total, item) => total + (parseFloat(item.totalAmount) || 0), 0)
      ))
      .catch(error => console.error('Error fetching total balance:', error));
    }, []);
  
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
    1, -1, 2, 1, 1, -2, 1, -1, -1, 0, 1, -1, 2, -1, 0, -2, 2, 1, -1, 2,
  ]; // The Y-axis values
  const barChartlabels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]; // The X-axis labels (months, for example)
  const barChartstatus = {
    p1: "2. Completed",
    p2: "1. Enrolled",
    p3: "0. Applied",
    p4: "-1. Wishlist",
    p5: "-2. Not Eligible",
  }; // Custom status values
  const barCharttitleData = "Degree Status Distribution"; // Custom title


  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;


  const handleNext = () => {
    if (currentPage < Math.ceil(students1.length / entriesPerPage)) {
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
      <Upperheader title="View Meetings" name={username} />

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
                  <h3>{totalStudents}</h3>
                  {/* Compare last two months student if count is greater or less */}
                  <p>+10% than month </p>
                </div>
              </div>

              <div className="info-box-card">
                <div>
                  <div className="info-box-card-image-container02">
                    <RxPerson className="info-box-card-image" />
                  </div>

                  <p>Total Counsellors</p>
                  <h3>{totalCounsellors}</h3>
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
                  <h3>$ {totalBalance}</h3>
                  {/* Compare last two months invoice amount if count is greater or less */}
                  <p> +15% than month </p>
                </div>

                <div className="line-chart-container">
                  {/* Line chart on all invoice prices */}
                  <AreaLineChart data={linechartData} />
                </div>
              </div>
            </div>
          </div>
          {/* Second Div in Row */}
          <div className="unique-column-container">
            <div className="unique-vertical-container unique-box-c">
              <div className="chart-content-container">
                {/* The query for for generation of data will likkt like
                SELECT 
                  FORMAT(Meeting.MeetingDate, 'yyyy-MM') AS Month,
                  SUM(Invoice.amount) AS TotalRevenue,
                  COUNT(Meeting.meetingId) AS TotalMeetings
                  FROM Invoice
                  JOIN Meeting ON Invoice.invoiceId = Meeting.invoiceId
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
                <h3 className="dashboard-heading">
                  Student Background Information
                </h3>
                <table className="dashboard-info-table">
                  <thead>
                    <tr>
                      
                      <th className="dashboard-table-heading">Student Name</th>
                      <th className="dashboard-table-heading">
                        Institute Name
                      </th>
                      <th className="dashboard-table-heading">Degree Title</th>
                      <th className="dashboard-table-heading">
                        Obtained Marks
                      </th>
                      <th className="dashboard-table-heading">Total Marks</th>
                      <th className="dashboard-table-heading">Percentage</th>
                    </tr>
                  </thead>

                  <tbody>
                {students1.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage).map(student => (
                  <tr key={student.id}>
                    
                    <td>{student.StudentName}</td>
                    <td>{student.InstituteName}</td>
                    <td>{student.DegreeTitle}</td>
                    <td>{student.ObtainedMarks}</td>
                    <td>{student.TotalMarks}</td>
                    <td>{student.Percentage}%</td>
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

export default DashboradAdminView;
