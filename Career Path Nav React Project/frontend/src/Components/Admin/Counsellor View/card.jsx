import React from "react";
import "./counsellorview.css";
import { FaUser, FaTachometerAlt} from 'react-icons/fa'; 

const Card = ({ pic, heading, paragraph, label1, label2, label3}) => {
    return (
      <div className="card">
        <div className="card-image">
          <img src={pic} alt="Profile" className="profile-image" />
        </div>
        <h2 className="card-heading">{heading}</h2>
        <p className="card-paragraph">{paragraph}</p>
        <div className="card-label-container">
          <div className="card-label-row">
            <div className="card-label01">{label1}</div>
            <div className="card-label02">{label2}</div>
          </div>
          <div className="card-label03">{label3}</div>
        </div>
        <div className="card-buttons">
          <button className="card-button primary">
            <FaUser /> Profile
          </button>
          <button className="card-button secondary">
            <FaTachometerAlt /> Meetings
          </button>
        </div>
      </div>
    );
  };

export default Card;