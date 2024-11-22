import React, { useEffect, useState } from "react";
import "./modal.css";
import { FaGraduationCap } from "react-icons/fa";
import Swal from "sweetalert2";

const AddBackground = ({ isOpen, onCancel , selectedRecord, isEditing }) => {

  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentuser = userData.user;

  const [degreetitle, setdegreetitle] = useState("");
  const [institutename , setinstitutename] = useState("");
  const [totalmarks , settotalmarks] = useState("");
  const [obtainedmarks , setobtainedmarks] = useState("");
  console.log(isEditing , selectedRecord)

    // Populate fields when a record is selected for editing
    useEffect(() => {
      if (isEditing && selectedRecord) {
        setdegreetitle(selectedRecord.degreeTitle);
        setinstitutename(selectedRecord.instituteName);
        settotalmarks(selectedRecord.TotalMarks);
        setobtainedmarks(selectedRecord.ObtainedMarks);
      } else {
        setdegreetitle("");
        setinstitutename("");
        settotalmarks("");
        setobtainedmarks("");
      }
    }, [isEditing, selectedRecord]);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const backgroundData = {
        studentid: currentuser.userId,
        degreetitle,
        institutename,
        totalmarks,
        obtainedmarks,
      };
      console.log(backgroundData)
  
      const url = isEditing
        ? `http://localhost:4000/getbackground/${selectedRecord.backgroundId}`
        : `http://localhost:4000/addbackground`;
  
      const method = isEditing ? "PUT" : "POST";
  
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backgroundData),
        });
  
        const data = await response.json();
  
        if (data.message) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message,
          });
          onCancel(); // Close modal after successful operation
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
          {isEditing ? "Update Background" : "Add Background"} <FaGraduationCap className="icon" />
        </h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label className="labelclass">Degree Title</label>
            <select
              className="selectclass"
              id="degreetitle"
              name="degreetitle"
              value={degreetitle}
              onChange={(e) => setdegreetitle(e.target.value)}
              required
            >
              <option value="">Select Degree Title</option>
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
              onChange={(e) => setobtainedmarks(e.target.value)}
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
