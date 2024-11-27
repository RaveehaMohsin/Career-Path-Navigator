import React from "react";
import "./card.css";
import { FaUser, FaTachometerAlt} from 'react-icons/fa'; 
import { useHistory } from "react-router-dom";

const Card = ({ pic, heading, paragraph, label1, label2, label3}) => {
  const history = useHistory();

  const handleCounsellorViewMeet = () => {
    history.push("/admin/meetview/counsellordetailmeet");
  };


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
          <button className="card-button secondary" onClick={handleCounsellorViewMeet}>
            <FaTachometerAlt /> Meetings
          </button>
        </div>
      </div>
    );
  };

export default Card;