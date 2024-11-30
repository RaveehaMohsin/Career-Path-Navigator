import React, { useState } from "react";
import "./dashboardadminview.css";
import Upperheader from "../../UpperHeader/upperheader";
import { RxPerson } from "react-icons/rx";
import AreaLineChart from "./lineareachart";
import DoubleAreaLineChart from "./doublearealine";
import BarChart from "./barchart";
import { GiReceiveMoney } from "react-icons/gi";

const DashboradAdminView = () => {
  const data = [
    {
      institute: "Institute 1",
      degree: "Bachelor of Science",
      percentage: "85%",
    },
    { institute: "Institute 2", degree: "Intermediate", percentage: "75%" },
    { institute: "Institute 3", degree: "High School", percentage: "90%" },
    {
      institute: "Institute 4",
      degree: "Bachelor of Science",
      percentage: "88%",
    },
    { institute: "Institute 5", degree: "Intermediate", percentage: "82%" },
    { institute: "Institute 6", degree: "High School", percentage: "78%" },
    {
      institute: "Institute 7",
      degree: "Bachelor of Science",
      percentage: "90%",
    },
    { institute: "Institute 8", degree: "Intermediate", percentage: "80%" },
    { institute: "Institute 9", degree: "High School", percentage: "85%" },
    {
      institute: "Institute 10",
      degree: "Bachelor of Science",
      percentage: "87%",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Get current entries based on currentPage
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleNext = () => {
    if (currentPage < Math.ceil(data.length / entriesPerPage)) {
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
      <Upperheader title="Dashboard" />

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
                  <p>+10% than month </p>
                </div>
              </div>

              <div className="info-box-card">
                <div>
                  <div className="info-box-card-image-container02">
                    <RxPerson className="info-box-card-image" />
                  </div>

                  <p>Total Students</p>
                  <h3>943</h3>
                  <p>+10% than month </p>
                </div>
              </div>
            </div>
            <div className="unique-vertical-container unique-box-b">
              <div className="info-box-card">
                <div>
                  <div className="info-box-card-image-container03">
                    <GiReceiveMoney className="info-box-card-image" />
                  </div>

                  <p>Total Students</p>
                  <h3>943</h3>
                  <p>+10% than month </p>
                </div>

                <div className="line-chart-container">
                  <AreaLineChart />
                </div>
              </div>
            </div>
          </div>
          {/* Second Div in Row */}
          <div className="unique-column-container">
            <div className="unique-vertical-container unique-box-c">
              <div className="chart-content-container">
                <DoubleAreaLineChart />
              </div>
            </div>
            <div className="unique-vertical-container unique-box-d">
              <div className="chart-content-container">
                <BarChart />
              </div>
            </div>
          </div>
          {/* Third Div in Row */}
          <div className="unique-column-container">
            <div className="table-cobntet-last-container">
              <div className="dashboard-info-container">
                <h3 className="dashboard-heading">Background Information</h3>
                <table className="dashboard-info-table">
                  <thead>
                    <tr>
                      <th className="dashboard-table-heading">
                        Institute Name
                      </th>
                      <th className="dashboard-table-heading">Degree Title</th>
                      <th className="dashboard-table-heading">
                        Obtained Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEntries.map((item, index) => (
                      <tr key={index}>
                        <td>{item.institute}</td>
                        <td>{item.degree}</td>
                        <td>{item.percentage}</td>
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
