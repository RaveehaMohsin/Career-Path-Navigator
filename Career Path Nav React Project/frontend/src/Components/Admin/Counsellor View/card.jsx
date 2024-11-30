import React from "react";
import "./card.css";
import { FaUser, FaTachometerAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const Card = ({ pic, heading, paragraph, label1, label2, label3 }) => {
  const history = useHistory();

  const handleCounsellorViewMeet = () => {
    history.push("/admin/meetview/counsellordetailmeet");
  };

  return (
    <div className="counsellor-card">
      <div className="counsellor-card-image">
        <img src={pic} alt="Profile" className="counsellor-profile-image" />
      </div>
      <h2 className="counsellor-card-heading">{heading}</h2>
      <p className="counsellor-card-paragraph">{paragraph}</p>
      <div className="counsellor-card-label-container">
        <div className="counsellor-card-label-row">
          <div className="counsellor-card-label01">{label1}</div>
          <div className="counsellor-card-label02">{label2}</div>
        </div>
        <div className="counsellor-card-label03">{label3}</div>
      </div>
      <div className="counsellor-card-buttons">
        <button className="counsellor-card-button primary">
          <FaUser /> Profile
        </button>
        <button
          className="counsellor-card-button secondary"
          onClick={handleCounsellorViewMeet}
        >
          <FaTachometerAlt /> Meetings
        </button>
      </div>
    </div>
  );
};

export default Card;
