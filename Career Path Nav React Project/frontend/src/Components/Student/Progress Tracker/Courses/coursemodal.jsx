import React, { useState } from "react";
import Swal from "sweetalert2";
import "../../Student Interest Details/modal.css";
import { FaLaptop } from "react-icons/fa";

const AddCourse = ({ isOpen, onCancel }) => {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentUser = userData.user;

  const [formData, setFormData] = useState({
    coursetitle: "",
    coursestatus: "Wishlist",
    courseprovider: "",
    courseduration: "",
    courselevel: "Beginner",
    courseskills: "",
    coursecertificate: "Yes",
    coursefees: "",
    courseprereq: "",
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

    const courseData = {
      studentId: currentUser.userId,
      courseTitle: formData.coursetitle,
      providerSource: formData.courseprovider,
      durationCourse: formData.courseduration,
      courseLevel: formData.courselevel,
      prerequisites: formData.courseprereq,
      skillsCovered: formData.courseskills,
      courseFees: formData.coursefees,
      certification: formData.coursecertificate,
      status: formData.coursestatus,
    };

    try {
      const response = await fetch("http://localhost:4000/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
        onCancel(); // Close the modal after success
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "An error occurred while adding the course details.",
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
          Course Details <FaLaptop className="icon" />
        </h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label className="labelclass">Course Title *</label>
            <input
              className="inputclass"
              type="text"
              id="coursetitle"
              name="coursetitle"
              value={formData.coursetitle}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label className="labelclass">Current Status of Course *</label>
            <select
              className="selectclass"
              id="coursestatus"
              name="coursestatus"
              value={formData.coursestatus}
              onChange={handleChange}
              required
            >
              <option value="Wishlist">Wishlist</option>
              <option value="Completed">Completed</option>
              <option value="InProgress">In Progress</option>
              <option value="NotInterested">Not Interested</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Provider *</label>
            <input
              className="inputclass"
              type="text"
              id="courseprovider"
              name="courseprovider"
              value={formData.courseprovider}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label className="labelclass">Course Duration</label>
            <input
              className="inputclass"
              type="text"
              id="courseduration"
              name="courseduration"
              value={formData.courseduration}
              onChange={handleChange}
            />
          </p>

          <p>
            <label className="labelclass">Course Level *</label>
            <select
              className="selectclass"
              id="courselevel"
              name="courselevel"
              value={formData.courselevel}
              onChange={handleChange}
              required
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Skills Covered</label>
            <input
              className="inputclass"
              type="text"
              id="courseskills"
              name="courseskills"
              value={formData.courseskills}
              onChange={handleChange}
            />
          </p>

          <p>
            <label className="labelclass">Certificate *</label>
            <select
              className="selectclass"
              id="coursecertificate"
              name="coursecertificate"
              value={formData.coursecertificate}
              onChange={handleChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Course Fees</label>
            <input
              className="inputclass"
              type="text"
              id="coursefees"
              name="coursefees"
              value={formData.coursefees}
              onChange={handleChange}
            />
          </p>

          <p>
            <label className="labelclass">Any Prerequisites</label>
            <input
              className="inputclass"
              type="text"
              id="courseprereq"
              name="courseprereq"
              value={formData.courseprereq}
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

export default AddCourse;
