import React, { useEffect, useState } from "react";
import "./modal.css";
import { FaGraduationCap } from "react-icons/fa";
import Swal from "sweetalert2";

const AddBackground = ({ isOpen, onCancel , selectedRecord, isEditing }) => {

  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentuser = userData.user;

  const [degreelevel, setdegreelevel] = useState("");
  const [degreetitle, setdegreetitle] = useState("");
  const [institutename , setinstitutename] = useState("");
  const [totalmarks , settotalmarks] = useState("");
  const [obtainedmarks , setobtainedmarks] = useState("");
  console.log(isEditing , selectedRecord)

    // Populate fields when a record is selected for editing
    useEffect(() => {
      if (isEditing && selectedRecord) {
        setdegreelevel(selectedRecord.degreeLevel);
        setdegreetitle(selectedRecord.degreeTitle);
        setinstitutename(selectedRecord.instituteName);
        settotalmarks(selectedRecord.TotalMarks);
        setobtainedmarks(selectedRecord.ObtainedMarks);
      } else {
        setdegreelevel("");
        setdegreetitle("");
        setinstitutename("");
        settotalmarks("");
        setobtainedmarks("");
      }
    }, [isEditing, selectedRecord]);

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Validation: Ensure obtained marks don't exceed total marks
      if (parseInt(obtainedmarks) > parseInt(totalmarks)) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Obtained marks cannot exceed total marks.",
        });
        return;
      }
    
      const backgroundData = {
        studentid: currentuser.userId,
        degreelevel,
        degreetitle,
        institutename,
        totalmarks,
        obtainedmarks,
      };
      console.log(backgroundData)
    
      // Determine the URL and method based on whether it's editing or adding a new background
      const url = isEditing
        ? `http://localhost:4000/getbackground/${selectedRecord.backgroundId}`
        : `http://localhost:4000/addbackground`;
    
      const method = isEditing ? "PUT" : "POST";
    
      try {
        // Sending the request to the backend
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backgroundData),
        });
    
        // Parse the response data
        const data = await response.json();
    
        if (response.ok) {  // Check if the response was successful (status code 2xx)
          Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message,
          });
          onCancel();  // Close modal after successful operation
        } else {
          // If there's an error (e.g., duplicate entry error), handle it
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.error || "An unexpected error occurred.",
          });
        }
      } catch (error) {
        // Handle unexpected errors like network issues
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
        });
      }
    };
    

    const handleObtainedMarksChange = (e) => {
      const value = e.target.value;
      setobtainedmarks(value);
    
      if (parseInt(value) > parseInt(totalmarks)) {
        Swal.fire({
          icon: "warning",
          title: "Validation Warning",
          text: "Obtained marks cannot exceed total marks.",
        });
      }
    };
    
 

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>

      <dialog open className={"room-dialog sidebar-closed"}>
        <h2 className="h2class">
          {isEditing ? "Update Background" : "Add Background"} <FaGraduationCap className="icon" />
        </h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label className="labelclass">Degree Level</label>
            <select
              className="selectclass"
              id="degreelevel"
              name="degreelevel"
              value={degreelevel}
              onChange={(e) => setdegreelevel(e.target.value)}
              required
            >
              <option value="" disabled>Select Degree Level</option>
              <option value="Matriculation">Matriculation</option>
              <option value="O Levels">O Levels</option>
              <option value="Intermediate">Intermediate</option>
              <option value="A Levels">A Levels</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's degree">Bachelor's degree</option>
              <option value="Master's degree">Master's degree</option>
              <option value="M.Phil">M.Phil</option>
              <option value="Ph.D.">Ph.D.</option>
            </select>
            
          </p>

          <p>
            <label className="labelclass">Degree Title</label>
            <input
              className="inputclass"
              type="text"
              id="degreetitle"
              name="degreetitle"
              value={degreetitle}
              onChange={(e) => setdegreetitle(e.target.value)}
              required
              placeholder="e.g Computer Science , Radiology etc"
            />
          </p>

           <p>
            <label className="labelclass">Institute Name</label>
            <input
              className="inputclass"
              type="text"
              id="institutename"
              name="institutename"
              value={institutename}
              onChange={(e) => setinstitutename(e.target.value)}
              required
            />
          </p>

          <p>
            <label className="labelclass">Total Marks</label>
            <input
              className="inputclass"
              type="number"
              id="totalmarks"
              name="totalmarks"
              required
              value={totalmarks}
              onChange={(e) => settotalmarks(e.target.value)}
            />
          </p>

          <p>
            <label className="labelclass">Obtained Marks</label>
            <input
              className="inputclass"
              type="number"
              id="obtainedmarks"
              name="obtainedmarks"
              required
              value={obtainedmarks}
              onChange={handleObtainedMarksChange}
            />
          </p>


          <p className="actions">
            <button className="buttonmodalclass" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="buttonmodalclass" type="submit">{isEditing ? "Update" : "Add"} Details</button>
          </p>
        </form>
      </dialog>
    </>
  );
};

export default AddBackground;
