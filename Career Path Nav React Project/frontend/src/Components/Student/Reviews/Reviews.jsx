import React, { useState } from "react";
import "./ReviewForm.css";
import { FaStar } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { MdRecommend } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import UpperHeader from "../../UpperHeader/upperheader";  
import Swal from "sweetalert2";

export default function ReviewForm() {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentUser = userData.user;
  const username = currentUser.firstName + " " + currentUser.lastName;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState("");
  const [recommend, setRecommend] = useState(false);
  const [experience, setExperience] = useState("");
  const [selectedCounsellorId, setSelectedCounsellorId] = useState(""); 
  const [selectedStudentId, setSelectedStudentId] = useState("");  // For selecting student ID

  const isCounsellorPage = window.location.pathname === "/review/counsellor";
  const isGiveStudentReviewPage = window.location.pathname === "/counsellor/givestudentreview";  // Check for student review page

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromUserId = currentUser.userId;
    let toUserId;

    // Determine the toUserId based on the page
    if (isCounsellorPage) {
      toUserId = selectedCounsellorId;
    } else if (isGiveStudentReviewPage) {
      toUserId = selectedStudentId;  // Use selectedStudentId for student review page
    } else {
      toUserId = 2; // Default ID or fallback if needed
    }

    const formData = {
      rating,
      comments,
      recommend,
      experience,
      submissionDate: new Date().toISOString(),
      fromUserId,
      toUserId,
    };

    try {
      const response = await fetch("http://localhost:4000/addreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your feedback has been submitted successfully!",
        });
      } else {
        // Error alert for non-OK responses
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to submit feedback: ${data.error || "Please try again."}`,
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);

      // Error alert for catch block
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to process the request. Please try again.",
      });
    }
  };

  return (
    <div>
      <UpperHeader title={isCounsellorPage ? "Give reviews to Counsellor" : (isGiveStudentReviewPage ? "Give reviews to Student" : "Give reviews to System")} name={username} />
      <div className="review-container">
        <form onSubmit={handleSubmit} className="review-form">
          <h2 className="review-title">Share Your Feedback</h2>

          {/* Conditionally render the select box for counsellor or student */}
          {isCounsellorPage && (
            <div className="review-field">
              <label className="review-label">Select Counsellor:</label>
              <select
                value={selectedCounsellorId}
                onChange={(e) => setSelectedCounsellorId(e.target.value)}
                className="review-select"
                required
              >
                <option value="" disabled>Select a counsellor</option>
                <option value="4">Counsellor 4</option>
                <option value="5">Counsellor 5</option>
                <option value="6">Counsellor 6</option>
                <option value="7">Counsellor 7</option>
                <option value="8">Counsellor 8</option>
              </select>
            </div>
          )}

          {isGiveStudentReviewPage && (
            <div className="review-field">
              <label className="review-label">Select Student:</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="review-select"
                required
              >
                <option value="" disabled>Select a student</option>
                <option value="101">Student 101</option>
                <option value="102">Student 102</option>
                <option value="103">Student 103</option>
                <option value="104">Student 104</option>
                <option value="105">Student 105</option>
              </select>
            </div>
          )}

          {/* Rating */}
          <div className="review-field">
            <label className="review-label">Rating:</label>
            <div className="review-stars">
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                  <FaStar
                    key={index}
                    size={30}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(currentRating)}
                    color={currentRating <= (hover || rating) ? "#FFD700" : "#ccc"}
                    className="review-icon"
                  />
                );
              })}
            </div>
          </div>

          {/* Comments */}
          <div className="review-field">
            <label className="review-label">
              <AiOutlineComment size={20} className="review-icon" /> Comments:
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Write your comments here..."
              className="review-textarea"
            />
          </div>

          {/* Recommend */}
          <div className="review-field">
            <label className="review-label">
              <MdRecommend size={20} className="review-icon" /> Recommend to Others:
            </label>
            <input
              type="checkbox"
              checked={recommend}
              onChange={() => setRecommend(!recommend)}
              className="review-checkbox"
            />
          </div>

          {/* Experience */}
          <div className="review-field">
            <label className="review-label">Experience:</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="review-select"
              required
            >
              <option value="" disabled>Select your experience</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
              <option value="Worst">Worst</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="review-button">
            <FiSend size={20} className="review-icon" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
}
