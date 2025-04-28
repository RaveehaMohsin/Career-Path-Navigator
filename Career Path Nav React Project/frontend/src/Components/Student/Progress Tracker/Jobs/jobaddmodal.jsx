import React, { useState } from "react";
import "../../Student Interest Details/modal.css";
import { FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";

const AddJob = ({ isOpen, onCancel }) => {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentuser = userData.user;

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobStatus: "Wishlist",
    jobCompany: "",
    jobLocation: "",
    jobSalary: "",
    jobEmploymentType: "Full-time",
    jobDesc: "",
    jobEducationReq: "",
    jobSkillsReq: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      studentId: currentuser.userId,
      jobTitle: formData.jobTitle,
      company: formData.jobCompany,
      locationJob: formData.jobLocation,
      salaryRange: formData.jobSalary,
      employmentType: formData.jobEmploymentType,
      jobDescription: formData.jobDesc,
      educationLevelRequired: formData.jobEducationReq,
      requiredSkills: formData.jobSkillsReq,
      status: formData.jobStatus,
    };

    try {
      const response = await fetch("http://localhost:4000/addJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
        onCancel();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "An error occurred while adding the job details.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>
      <dialog open className={"room-dialog sidebar-closed"}>
        <h2 className="h2class">
          Job Details <FaUserTie className="icon" />
        </h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label className="labelclass">Job Title *</label>
            <input
              className="inputclass"
              type="text"
              id="jobtitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label className="labelclass">Current Status of Job *</label>
            <select
              className="selectclass"
              id="jobstatus"
              name="jobStatus"
              value={formData.jobStatus}
              onChange={handleChange}
              required
            >
              <option value="Wishlist">Wishlist</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Offered">Offered</option>
              <option value="Currentemployee">Current Employee</option>
              <option value="Rejected">Rejected</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Company *</label>
            <input
              className="inputclass"
              type="text"
              id="jobcompany"
              name="jobCompany"
              value={formData.jobCompany}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label className="labelclass">Location *</label>
            <input
              className="inputclass"
              type="text"
              id="joblocation"
              name="jobLocation"
              value={formData.jobLocation}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label className="labelclass">Salary Offered</label>
            <input
              className="inputclass"
              type="number"
              id="jobsalary"
              name="jobSalary"
              value={formData.jobSalary}
              onChange={handleChange}
            />
          </p>

          <p>
            <label className="labelclass">Employment Type *</label>
            <select
              className="selectclass"
              id="jobemploymenttype"
              name="jobEmploymentType"
              value={formData.jobEmploymentType}
              onChange={handleChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract Employment</option>
              <option value="Freelance">Freelance</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Job Description</label>
            <textarea
              className="inputclass"
              id="jobdesc"
              name="jobDesc"
              value={formData.jobDesc}
              onChange={handleChange}
            />
          </p>

          <p>
            <label className="labelclass">Education Required</label>
            <input
              className="inputclass"
              type="text"
              id="jobeducationreq"
              name="jobEducationReq"
              value={formData.jobEducationReq}
              onChange={handleChange}
            />
          </p>

          <p>
            <label className="labelclass">Skills Required</label>
            <input
              className="inputclass"
              type="text"
              id="jobskillsreq"
              name="jobSkillsReq"
              value={formData.jobSkillsReq}
              onChange={handleChange}
            />
          </p>

          <p className="actions">
            <button className="buttonmodalclass" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="buttonmodalclass" type="submit">Add Details</button>
          </p>
        </form>
      </dialog>
    </>
  );
};

export default AddJob;
