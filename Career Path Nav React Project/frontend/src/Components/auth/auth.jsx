import React, { useState } from "react";
import "./auth.css";
import { FaUser} from 'react-icons/fa'; 
import { PiPasswordBold } from "react-icons/pi";
import { IoMailSharp } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";


const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  // States for form inputs and error messages
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const toggle = () => {
    // Reset form data and error messages when toggling
    setIsSignIn(!isSignIn);
    setFormData({
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
    setErrorMessages({
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Check for empty fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission (e.g., call API or other logic)
      console.log("Form is valid!");
    }
  };

  return (
    <div
      id="container"
      className={`container ${isSignIn ? "sign-in" : "sign-up"}`}
    >
      {/* Form Section */}
      <div className="row">
        {/* Sign Up */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <MdDriveFileRenameOutline  className="icon"/>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder={errorMessages.firstName || "Firstname"}
                  className={errorMessages.firstName ? "error-input" : ""}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <MdDriveFileRenameOutline  className="icon"/>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={errorMessages.lastName || "Lastname"}
                  className={errorMessages.lastName ? "error-input" : ""}
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <IoMailSharp  className="icon"/>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={errorMessages.email || "Email"}
                  className={errorMessages.email ? "error-input" : ""}
                  required
                />
              </div>
              <div className="input-group role-group">
                <i className="bx bx-mail-send"></i>
                <FaUser  className="icon" />
                <select 
                  className={`role-dropdown ${errorMessages.role ? "error-input" : ""}`}
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    {errorMessages.role || "Select Role"}
                  </option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="counsellor">Counsellor</option>
                </select>
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <PiPasswordBold  className="icon" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={errorMessages.password || "Password"}
                  className={errorMessages.password ? "error-input" : ""}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <PiPasswordBold  className="icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={errorMessages.confirmPassword || "Confirm password"}
                  className={errorMessages.confirmPassword ? "error-input" : ""}
                  required
                />
              </div>
              <button onClick={handleSubmit}>Sign up   <PiSignInBold /></button>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>

        {/* Sign In */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
             <CgProfile className="signIn-Icon"/>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <IoMailSharp className="icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={errorMessages.email || "Email"}
                  className={errorMessages.email ? "error-input" : ""}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <PiPasswordBold  className="icon"/>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={errorMessages.password || "Password"}
                  className={errorMessages.password ? "error-input" : ""}
                  required
                />
              </div>
              <button onClick={handleSubmit}>Sign in   <PiSignInBold /></button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="row content-row">
        {/* Sign In Content */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
        </div>

        {/* Sign Up Content */}
        <div className="col align-items-center flex-col">
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
