import React from "react";
import { FaSignOutAlt, FaBell } from "react-icons/fa";
import './studentadd.css';

export default function Studentadd() {
  return (
    <div className="upperheader">
      <div className="left-section">
        <div className="section-title">Add Personal Details</div>
      </div>
      <div className="right-section">
      <div className="user-name">Raveeha Mohsin</div>
        <img src="https://cdn-icons-png.flaticon.com/512/5850/5850276.png" alt="Profile" />
        <button className="icon-btn">
          <FaSignOutAlt />
        </button>
        <button className="icon-btn">
          <FaBell />
        </button>
      </div>
    </div>
  );
}
