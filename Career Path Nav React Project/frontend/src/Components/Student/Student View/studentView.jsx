import React, { useState } from "react";
import "./studentView.css";
import UpperHeader from "../../UpperHeader/upperheader"
import { FaSignOutAlt, FaBell } from "react-icons/fa";
import profilePic from "../../../Assets/studentProfilePic.jpg";
import studentHeader from "../../../Assets/studentheader.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { ImProfile } from "react-icons/im";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaCity } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";

const studentView = () => {
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
      
      <UpperHeader title="Student View"/>
      {/* Main container with two columns */}
      <div className="main-container">
        <div className="profile-background-container">
          {/* Personal Profile View section */}
          <div className="profile-container">
            <div className="profile-header">
              <img
                src={studentHeader}
                alt="Header Background"
                className="header-image"
              />
              <div className="profile-picture-container">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="profile-picture"
                />
              </div>
            </div>

            <div className="student-name">
              <h2>Tayyaba Afzal</h2>
              <p>Student</p>
            </div>

            <div className="personal-info">
              <div className="info-column">
                <div className="cell">
                  <div className="icon-container">
                    <MdOutlineMailOutline className="icon-view" />
                  </div>
                  <p className="heading-text"> Email:</p>
                  <p className="info-text">tayyabaafzal957@gmail.com</p>
                </div>

                <div className="cell">
                  <div className="icon-container">
                    <PiGenderFemaleBold className="icon-view" />
                  </div>
                  <p className="heading-text">Gender:</p>
                  <p className="info-text">Female</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <FaRegAddressCard className="icon-view" />
                  </div>
                  <p className="heading-text">CNIC:</p>
                  <p className="info-text">35202-6480145-8</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <MdOutlineSpeakerNotes className="icon-view" />
                  </div>
                  <p className="heading-text">Address:</p>
                  <p className="info-text">
                    Plot-785, Phase 2, Block L, Johar Town, Lahore
                  </p>
                </div>
              </div>

              <div className="info-column">
                <div className="cell">
                  <div className="icon-container">
                    <ImProfile className="icon-view" />
                  </div>
                  <p className="heading-text">LinkedIn Profile:</p>
                  <p className="info-text">tayyaba957</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <LiaBirthdayCakeSolid className="icon-view" />
                  </div>
                  <p className="heading-text">DOB:</p>
                  <p className="info-text">14/02/2004</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <FaCity className="icon-view" />
                  </div>
                  <p className="heading-text">City:</p>
                  <p className="info-text">Lahore</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <MdAccountBalance className="icon-view" />
                  </div>
                  <p className="heading-text">Country:</p>
                  <p className="info-text">Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Information Table section */}
          <div className="background-info-container">
            <h3 className="background-heading">Background Information</h3>
            <table className="background-info-table">
              <thead>
                <tr>
                  <th className="table-heading">Institute Name</th>
                  <th className="table-heading">Degree Title</th>
                  <th className="table-heading">Obtained Percentage</th>
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
            <div className="pagination-buttons">
              <button className="pagination-button" onClick={handlePrevious}>
                &#8592; {/* Left arrow */}
              </button>
              <button className="pagination-button" onClick={handleNext}>
                &#8594; {/* Right arrow */}
              </button>
            </div>
          </div>
        </div>

        {/* Additional parallel info section */}
        <div className="additional-info-container">
          <div className="info-box">
            <h3>All Interests</h3>
            <p>Last Updated</p>
          </div>

          <div className="info-detail-box">
            <div className="card">
              <div className="line01"></div>
              <div className="card-content">
                <h3>Jobs</h3>
                <div className="progress-bar">
                  <div className="progress01">
                    <div className="shine"></div>
                  </div>
                </div>
                <div className="info-content">
                <p> <IoSchoolOutline className="info-content-icon01"/> Bachelors of CS</p>
                <p> <CiLocationOn className="info-content-icon02"/> Islamabad, Pakistan</p>
                <p> <IoIosTimer className="info-content-icon03"/> Full Time</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="line02"></div>
              <div className="card-content">
                <h3>Degrees</h3>
                <div className="progress-bar">
                  <div className="progress02">
                    <div className="shine"></div>
                  </div>
                </div>
                <div className="info-content">
                <p> <IoSchoolOutline className="info-content-icon01"/> Bachelors of CS</p>
                <p> <CiLocationOn className="info-content-icon02"/> Islamabad, Pakistan</p>
                <p> <IoIosTimer className="info-content-icon03"/> Full Time</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="line03"></div>
              <div className="card-content">
                <h3>Courses</h3>
                <div className="progress-bar">
                  <div className="progress03">
                    <div className="shine"></div>
                  </div>
                </div>
                <div className="info-content">
                <p> <IoSchoolOutline className="info-content-icon01"/> Bachelors of CS</p>
                <p> <CiLocationOn className="info-content-icon02"/> Islamabad, Pakistan</p>
                <p> <IoIosTimer className="info-content-icon03"/> Full Time</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="line04"></div>
              <div className="card-content">
                <h3>Certificates</h3>
                <div className="progress-bar">
                  <div className="progress04">
                    <div className="shine"></div>
                  </div>
                </div>
                <div className="info-content">
                <p> <IoSchoolOutline className="info-content-icon01"/> Bachelors of CS</p>
                <p> <CiLocationOn className="info-content-icon02"/> Islamabad, Pakistan</p>
                <p> <IoIosTimer className="info-content-icon03"/> Full Time</p>
                </div>
              </div>
            </div>

            <div className="for-button">
              <button className="detail-button"> View More </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default studentView;
