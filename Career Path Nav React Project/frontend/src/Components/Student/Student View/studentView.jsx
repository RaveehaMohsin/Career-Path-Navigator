import React, { useEffect, useState } from "react";
import "./studentViewProfile1.css";
import UpperHeader from "../../UpperHeader/upperheader";
import studentHeader from "../../../Assets/studentheader.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaCity } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";
import { FaTag, FaClock } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const StudentView = () => {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const [currentuserdata , setcurrentuserdata] = useState();
  const [personData, setpersonData] = useState();
  const [personimage, setSelectedImage] = useState();
  const [interests, setInterests] = useState();
  const [background, setBackground] = useState();
  const [jobs, setJobs] = useState();
  const [degrees, setDegrees] = useState();
  const [courses, setCourses] = useState();
  const { userId: urlUserId } = useParams();
  const userId = urlUserId || userData.user.userId;

  useEffect(() => {
    // Calling both functions inside useEffect
    fetchuserProfile();
    fetchPersonProfile();
    fetchInterests();
    fetchBackground();
    fetchJobs();
    fetchDegrees();
    fetchCourses();
  }, []); // Empty dependency array ensures this runs once on mount

  const fetchPersonProfile = async () => {
    try {
      const response = await fetch(`https://marshy-brainy-weight.glitch.me/getperson/${userId}`);
      const data = await response.json();

      if (data) {
        setpersonData(data);
        // If there's an image, set it
        if (data.Img) {
          setSelectedImage("https://marshy-brainy-weight.glitch.me" + data.Img);
        }
      } else {
        console.log("No person data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchuserProfile = async () => {
    try {
      const response = await fetch(`https://marshy-brainy-weight.glitch.me/getuser/${userId}`);
      const data = await response.json();

      if (data) {
        setcurrentuserdata(data);
       
      } else {
        console.log("No User data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchInterests = async () => {
    try {
      const response = await fetch(
        `https://marshy-brainy-weight.glitch.me/getinterest/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        setInterests(data);
      } else {
        setInterests([]);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
      setInterests([]);
    }
  };

  const fetchBackground = async () => {
    try {
      const response = await fetch(
        `https://marshy-brainy-weight.glitch.me/getbackground/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        setBackground(data);
      } else {
        setBackground([]);
      }
    } catch (error) {
      console.error("Error fetching background:", error);
      setBackground([]);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        `https://marshy-brainy-weight.glitch.me/getProgresses/getjobs/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching Jobs:", error);
      setJobs([]);
    }
  };

  const fetchDegrees = async () => {
    try {
      const response = await fetch(
        `https://marshy-brainy-weight.glitch.me/getProgresses/getdegrees/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        setDegrees(data.degrees);
      } else {
        setDegrees([]);
      }
    } catch (error) {
      console.error("Error fetching Degrees:", error);
      setDegrees([]);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `https://marshy-brainy-weight.glitch.me/getProgresses/getcourses/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        setCourses(data.courses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching Courses:", error);
      setCourses([]);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Get current entries based on currentPage
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = background?.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleNext = () => {
    if (currentPage < Math.ceil(background?.length / entriesPerPage)) {
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
      <UpperHeader title="Profile Preview" name={username} />
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
                  src={personimage}
                  alt="Profile"
                  className="profile-picture"
                />
              </div>
            </div>

            <div className="student-name">
            <h2>{currentuserdata?.firstName && currentuserdata?.lastName ? `${currentuserdata.firstName} ${currentuserdata.lastName}` : "Not set"}</h2>
              <p>{currentuserdata?.role}</p>
            </div>

            <div className="personal-info">
              <div className="info-column">
                <div className="cell">
                  <div className="icon-container">
                    <MdOutlineMailOutline className="icon-view" />
                  </div>
                  <p className="heading-text"> Email:</p>
                  <p className="info-text">{currentuserdata?.email}</p>
                </div>

                <div className="cell">
                  <div className="icon-container">
                    <PiGenderFemaleBold className="icon-view" />
                  </div>
                  <p className="heading-text">Gender:</p>
                  <p className="info-text">{personData?.Gender || "Not set"}</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <FaRegAddressCard className="icon-view" />
                  </div>
                  <p className="heading-text">CNIC:</p>
                  <p className="info-text">{personData?.CNIC || "---"}</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <MdOutlineSpeakerNotes className="icon-view" />
                  </div>
                  <p className="heading-text">Address:</p>
                  <p className="info-text">
                    {personData?.Address || "Unavailable"}
                  </p>
                </div>
              </div>

              <div className="info-column">
                <div className="cell">
                  <div className="icon-container">
                    <FaPhone className="icon-view" />
                  </div>
                  <p className="heading-text">Phone No:</p>
                  <p className="info-text">{personData?.PhoneNo || "---"}</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <LiaBirthdayCakeSolid className="icon-view" />
                  </div>
                  <p className="heading-text">DOB:</p>
                  <p className="info-text">
                    {personData?.DOB ? formatDate(personData?.DOB) : "Not set"}
                  </p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <FaCity className="icon-view" />
                  </div>
                  <p className="heading-text">City:</p>
                  <p className="info-text">{personData?.City || "Not set"}</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <MdAccountBalance className="icon-view" />
                  </div>
                  <p className="heading-text">Country:</p>
                  <p className="info-text">
                    {personData?.Country || "Not set"}
                  </p>
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
                  <th className="table-heading">Degree Level</th>
                  <th className="table-heading">Degree Title</th>
                  <th className="table-heading">Marks</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.instituteName}</td>
                    <td>{item.degreeLevel}</td>
                    <td>{item.degreeTitle}</td>
                    <td>
                      {item.TotalMarks} / {item.ObtainedMarks}
                    </td>
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
            <p>
              {interests?.map((interest, index) => (
                <div key={index} className="interest-item">
                  <FaTag style={{ marginRight: "8px" }} />{" "}
                  {/* Displaying the icon */}
                  <span>{interest.category}</span>{" "}
                  {/* Displaying the category */}
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaClock style={{ marginRight: "5px" }} /> {/* Time icon */}
                    <span>
                      {new Date(interest.created_at).toLocaleDateString()}
                    </span>{" "}
                    {/* Formatted date */}
                    <br />
                  </div>
                </div>
              ))}
            </p>
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
                {jobs
                  ?.filter((job) => job.status === "Current Job")
                  .map((job) => (
                    <div key={job.jobId} className="info-content">
                      <p>
                        <IoSchoolOutline className="info-content-icon01" />{" "}
                        {job.jobTitle}
                      </p>
                      <p>
                        <CiLocationOn className="info-content-icon02" />{" "}
                        {job.company}
                      </p>
                      <p>
                        <IoIosTimer className="info-content-icon03" />{" "}
                        {job.employmentType}
                      </p>
                      <p>
                        <span className="status-icon">⭐</span> {job.status}
                      </p>
                      <p style={{ color: "#00273a" }}>----------</p>
                    </div>
                  ))}
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
                {degrees
                  ?.filter(
                    (degree) =>
                      degree.status === "Enrolled" ||
                      degree.status === "Completed"
                  )
                  .map((degree) => (
                    <div key={degree.degreeId} className="info-content">
                      <p>
                        <IoSchoolOutline className="info-content-icon01" />{" "}
                        {degree.degreeTitle}
                      </p>
                      <p>
                        <CiLocationOn className="info-content-icon02" />{" "}
                        {degree.instituition}
                      </p>
                      <p>
                        <IoIosTimer className="info-content-icon03" />{" "}
                        {degree.duration}
                      </p>
                      <p>
                        <span className="status-icon">⭐</span> {degree.status}
                      </p>
                      <p style={{ color: "#00273a" }}>----------</p>
                    </div>
                  ))}
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
                {courses
                  ?.filter(
                    (course) =>
                      course.status === "Completed"
                  )
                  .map((course) => (
                    <div key={course.degreeId} className="info-content">
                      <p>
                        <IoSchoolOutline className="info-content-icon01" />{" "}
                        {course.courseTitle}
                      </p>
                      <p>
                        <CiLocationOn className="info-content-icon02" />{" "}
                        {course.providerSource}
                      </p>
                      <p>
                        <IoIosTimer className="info-content-icon03" />{" "}
                        {course.durationCourse}
                      </p>
                      <p>
                        <span className="status-icon">⭐</span> {course.status}
                      </p>
                      <p style={{ color: "#00273a" }}>----------</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="for-button">
              <Link to="/progresstracker/degrees">
                <button className="detail-button">
                  {" "}
                  View More in Progress Tracker{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
