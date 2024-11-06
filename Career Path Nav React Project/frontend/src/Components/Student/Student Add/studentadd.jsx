import React from "react";
import { FaSignOutAlt, FaBell, FaUserCircle } from "react-icons/fa";
import './studentadd.css';

export default function Studentadd() {
  return (
    <div>
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

      {/* Student Add Form */}
      <div className="student-form">
        <div className="form-row">
          {/* Left Column - Profile Picture */}
          <div className="form-column profile-column">
            <FaUserCircle className="profile-icon" />
            <div className="image-buttons">
              <button className="image-btn">Choose File</button>
              <button className="image-btn remove-btn">Remove</button>
            </div>
          </div>

          {/* Center Column - First Set of Fields */}
          <div className="form-column">
            <label>First Name</label>
            <input type="text" className="form-control" required />

            <label>Date of Birth</label>
            <input type="date" className="form-control" required />

            <label>City</label>
            <input type="text" className="form-control" required />

            <label>Country</label>
            <input type="text" className="form-control" required />

            <label>Home Address</label>
            <input type="text" className="form-control" required />
          </div>

          {/* Right Column - Second Set of Fields */}
          <div className="form-column">
            <label>Last Name</label>
            <input type="text" className="form-control" required />

            <label>Gender</label>
            <select className="form-control" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label>Email</label>
            <input type="email" className="form-control" required />

            <label>Phone Number</label>
            <input type="tel" className="form-control" required />

            <label>CNIC</label>
            <input type="text" className="form-control" required />
          </div>
        </div>

        {/* Save and Clear Buttons */}
        <div className="form-buttons">
          <button className="action-btn save-btn">Save Changes</button>
          <button className="action-btn clear-btn">Clear</button>
        </div>
      </div>
    </div>
  );
}
