import React, { useState } from "react";
import "../../Student/Student View/studentViewProfile1.css";
import UpperHeader from "../../UpperHeader/upperheader";
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
import { VscFeedback } from "react-icons/vsc";

const AdminProfileView = () => {
  const reviews = [
    "Good service, but could be faster.",
    "Intuitive UI, very easy to use.",
    "App crashed a few times, but support.",
    "Time-saving feature, highly recommended!",
    "Good product, needs more customization."
  ];

  return (
    <div>
      <UpperHeader title="Student View" />
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
        </div>

        {/* Additional parallel info section */}
        <div className="additional-info-container">
          <div className="info-box">
            <h3>Ratings</h3>
            <span className="stars">
              {"★".repeat(3)}
              {"☆".repeat(5 - 3)}
              <p>
                <i>3 stars</i>
              </p>
            </span>
          </div>

          <div className="info-detail-box">
            <div className="card">
              <div className="line01"></div>
              <div className="card-content">
                <h3>Reviews</h3>
                <div className="progress-bar">
                  <div className="progress01">
                    <div className="shine"></div>
                  </div>
                </div>
                <div className="info-content">
                  {reviews.map((review, index) => (
                    <div key={index} className="feedback">
                      <VscFeedback className="info-content-icon01" />
                      {review}
                    </div>
                  ))}
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
export default AdminProfileView;
