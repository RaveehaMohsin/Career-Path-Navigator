import React from "react";
import "./card.css";
import { useHistory } from "react-router-dom";
import {
  FaUser,
  FaTachometerAlt,
  FaEnvelope,
  FaClock,
  FaCalendarAlt,
  FaMoneyBill,
  FaChalkboardTeacher
} from "react-icons/fa";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const Card = ({
  pic,
  heading,
  paragraph,
  label1,
  label2,
  label3,
  email,
  expertise,
  availableDays,
  timeSlots,
  hourlyRate,
  status,
  meetingdate,
  meetingtime,
  studentId,
  counsellorId,
  mycounsellorId,
  appointmentMode = false,
}) => {
  const history = useHistory();

  const handleCounsellorViewMeet = () => {
    history.push(`/admin/counsellorview/counsellordetailmeet/${mycounsellorId}`);
  };

  const handleCounsellorViewProfile = ()=>{
    history.push(`/admin/counsellorview/counsellorpersonprofile/${mycounsellorId}`);
  }

  const handleMeetingClick = async () => {
    if (status === "Not Available" || status === "Booked") {
      return; 
    }
    const selectedCounsellorPrice = hourlyRate;
    const meetingDetails = {
      counsellorId: counsellorId, 
      studentId: studentId,     
      meetingDate: meetingdate, 
      meetingTime: meetingtime, 
    };

    const response = await fetch('http://localhost:4000/create-payment-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: selectedCounsellorPrice,  
            meetingDetails,
        }),
    });

    const session = await response.json();
    window.location.href = session.url;
};

  let icon;
  let labelClass;

  // Determine icon and class based on status
  switch (status) {
    case "Available":
      icon = <FaCheckCircle />;
      labelClass = "counsellor-card-label04"; // Available
      break;
    case "Not Available":
      icon = <FaTimesCircle />;
      labelClass = "counsellor-card-label05"; // Not Available
      break;
    case "Booked":
      icon = <FaExclamationCircle />;
      labelClass = "counsellor-card-label06"; // Booked
      break;
    default:
      icon = <FaExclamationCircle />;
      labelClass = "counsellor-card-label04"; // Default to Available
  }

  return (
    <div className="counsellor-card">
      <div className="counsellor-card-image">
        <img src={pic} alt="Profile" className="counsellor-profile-image" />
      </div>
      <h2 className="counsellor-card-heading">{heading}</h2>
      {appointmentMode ? (
        <div>
          <p className="counsellor-card-paragraph">
            <FaEnvelope /> {email}
          </p>
          <p className="counsellor-card-paragraph">Expertise: {expertise}</p>
          <p className="counsellor-card-label01">
            <FaCalendarAlt></FaCalendarAlt> {availableDays}
          </p>
          <p className="counsellor-card-label02" style={{ margin: "2%" }}>
            <FaClock></FaClock> {timeSlots}
          </p>
          <p className="counsellor-card-label03">
            <FaMoneyBill /> ${hourlyRate} /hr
          </p>
          <p className={labelClass}>
            {icon} {status}{" "}
          </p>
        </div>
      ) : (
        <p className="counsellor-card-paragraph"><FaEnvelope /> {paragraph}</p>
      )}
      <div className="counsellor-card-label-container">
        {!appointmentMode && (
          <div className="counsellor-card-label-row">
            <div className="counsellor-card-label01"><FaMoneyBill />  ${label1}</div>
            <div className="counsellor-card-label02"><FaClock></FaClock> {label2}</div>
          </div>
        )}
        {!appointmentMode && (
          <div className="counsellor-card-label03"><FaChalkboardTeacher /> {label3}</div>
        )}
      </div>
      <div className="counsellor-card-buttons">
        {appointmentMode ? (
          <button
          onClick={()=>handleMeetingClick()}
            className="counsellor-card-button primary"
            style={{
              margin: "auto",
              opacity:
                status === "Not Available" || status === "Booked" ? 0.5 : 1, // Change opacity for disabled button
              cursor:
                status === "Not Available" || status === "Booked"
                  ? "not-allowed"
                  : "pointer", // Change cursor for disabled button
            }}         
          >
            <FaTachometerAlt /> Meeting
          </button>
        ) : (
          <>
            <button className="counsellor-card-button primary" onClick={()=>handleCounsellorViewProfile()}>
              <FaUser /> Profile
            </button>
            <button
              className="counsellor-card-button secondary"
              onClick={() => handleCounsellorViewMeet()}
            >
              <FaTachometerAlt /> Meetings
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
