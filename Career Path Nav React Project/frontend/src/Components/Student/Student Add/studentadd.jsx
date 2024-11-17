import React from "react";
import Upperheader from "../../UpperHeader/upperheader";
import {  FaUserCircle } from "react-icons/fa";
import './studentadd.css';

export default function Studentadd() {
  return (
    <div>
      <Upperheader title="Add Personal Details" />
      {/* Student Add Form */}
      <div className="student-form">
        <form>
          <div className="form-row">
            {/* Left Column - Profile Picture */}
            <div className="form-column profile-column">
              <FaUserCircle className="profile-icon" />
              <div className="image-buttons">
                <button className="image-btn" type="button">Choose File</button>
                <button className="image-btn remove-btn" type="button">Remove</button>
              </div>
            </div>

            {/* Center Column - First Set of Fields */}
            <div className="form-column">
              <label>First Name</label>
              <input type="text" className="form-control" required placeholder="James" />

              <label>Date of Birth</label>
              <input type="date" className="form-control" required  />

              <label>City</label>
              <input type="text" className="form-control" required />

              <label>Country</label>
              <input type="text" className="form-control" required placeholder="USA" />

              <label>Home Address</label>
              <input type="text" className="form-control" required />
            </div>

            {/* Right Column - Second Set of Fields */}
            <div className="form-column">
              <label>Last Name</label>
              <input type="text" className="form-control" required placeholder="Wally" />

              <label>Gender</label>
              <select className="form-control" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <label>Email</label>
              <input type="email" className="form-control" required placeholder="hello@example.com" />

              <label>Phone Number</label>
              <input type="tel" className="form-control" required placeholder="+12345678" />

              <label>CNIC</label>
              <input type="text" className="form-control" required />
            </div>
          </div>

          {/* Save and Clear Buttons */}
          <div className="form-buttons">
            <button type="submit" className="action-btn save-btn">Save Changes</button>
            <button type="reset" className="action-btn clear-btn">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
