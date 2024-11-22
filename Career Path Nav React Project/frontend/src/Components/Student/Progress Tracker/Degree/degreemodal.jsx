import React, { useState } from "react";
import Swal from "sweetalert2";
import "../../Student Interest Details/modal.css";
import { FaGraduationCap } from "react-icons/fa";

const AddDegree = ({ isOpen, onCancel }) => {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentuser = userData.user;

  const [formData, setFormData] = useState({
    degreetitle: "",
    degreestatus: "Wishlist",
    degreeinstitute: "",
    degreeduration: "",
    curriculum: "",
    locationdeg: "",
    modeofstudy: "",
    careeropp: "",
    degsalary: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const degreeData = {
      studentId: currentuser.userId,
      degreeTitle: formData.degreetitle,
      status: formData.degreestatus,
      institution: formData.degreeinstitute,
      locationInstitute: formData.locationdeg,
      duration: formData.degreeduration,
      modeOfStudy: formData.modeofstudy,
      curriculumOverview: formData.curriculum,
      careerOpportunities: formData.careeropp,
      salaryProspects: formData.degsalary,
    };

    try {
      const response = await fetch("http://localhost:4000/addDegree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(degreeData),
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
          text: data.error || "An error occurred while adding the degree details.",
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

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>

      <dialog open className={"room-dialog sidebar-closed"}>
        <h2 className="h2class">
          Degree Details <FaGraduationCap className="icon" />
        </h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label className="labelclass">Degree Title *</label>
            <input
              className="inputclass"
              type="text"
              id="degreetitle"
              name="degreetitle"
              value={formData.degreetitle}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label className="labelclass">Current Status of Degree *</label>
            <select
              className="selectclass"
              id="degreestatus"
              name="degreestatus"
              value={formData.degreestatus}
              onChange={handleChange}
              required
            >
              <option value="Wishlist">Wishlist</option>
              <option value="Completed">Completed</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Applied">Applied</option>
              <option value="NotEligible">Not Eligible</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Institute Name *</label>
            <input
              className="inputclass"
              type="text"
              id="degreeinstitute"
              name="degreeinstitute"
              value={formData.degreeinstitute}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label className="labelclass">Degree Duration *</label>
            <input
              className="inputclass"
              type="text"
              id="degreeduration"
              name="degreeduration"
              value={formData.degreeduration}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label className="labelclass">Curriculum Overview</label>
            <input
              className="inputclass"
              type="text"
              id="curriculum"
              name="curriculum"
              value={formData.curriculum}
              onChange={handleChange}
            />
          </p>

          <p>
            <label className="labelclass">Location of Institute *</label>
            <input
              className="inputclass"
              type="text"
              id="locationdeg"
              name="locationdeg"
              value={formData.locationdeg}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label className="labelclass">Mode of Study</label>
            <input
              className="inputclass"
              type="text"
              id="modeofstudy"
              name="modeofstudy"
              value={formData.modeofstudy}
              onChange={handleChange}
            />
          </p>

          <p>
            <label className="labelclass">Career Opportunities</label>
            <input
              className="inputclass"
              type="text"
              id="careeropp"
              name="careeropp"
              value={formData.careeropp}
              onChange={handleChange}
            />
          </p>

          <p>
            <label className="labelclass">Salary Prospects</label>
            <input
              className="inputclass"
              type="text"
              id="degsalary"
              name="degsalary"
              value={formData.degsalary}
              onChange={handleChange}
            />
          </p>

          <p className="actions">
            <button className="buttonmodalclass" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="buttonmodalclass" type="submit">
              Add Details
            </button>
          </p>
        </form>
      </dialog>
    </>
  );
};

export default AddDegree;
