import React, { useEffect, useState } from "react";
import "./modal.css";
import { FaLightbulb } from "react-icons/fa";
import Swal from "sweetalert2";

const AddInterest = ({ isOpen, onCancel }) => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const currentuser = userData.user;

  useEffect(() => {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 10);
    setCurrentDateTime(formattedDateTime);
  }, []);

  const [interestcategory, setinterestcategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const interestData = {
      studentid: currentuser.userId,
      interesttype: interestcategory,
      interestcreation: currentDateTime,
    };
  
    const url = `http://localhost:4000/addinterest`;
    const method = "POST";
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interestData),
      });
  
      const data = await response.json(); // Await the response before using `data`
  
      if (data.message) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          confirmButtonText: "OK",
        });
      } else if (data.error) {
        // Check for error message in case category already exists
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error, // Display the error message from the server
          confirmButtonText: "OK",
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
          Add Interest <FaLightbulb className="icon" />
        </h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label className="labelclass">Interest Type</label>
            <input
              className="inputclass"
              id="interesttype"
              name="interesttype"
              type="text"
              placeholder="e.g Cooking , Coding , Fashion Designing"
              value={interestcategory} 
              required
              onChange={(e) => setinterestcategory(e.target.value)}
            />
          </p>

          <p>
            <label className="labelclass">Created At</label>
            <input
              id="interestcreation"
              name="interestcreation"
              type="text" // Changed to text to match the date-time value format
              readOnly
              value={currentDateTime}
              className="inputclass"
            />
          </p>

          <p className="actions">
            <button className="buttonmodalclass" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="buttonmodalclass" type="submit">
              Add Interest
            </button>
          </p>
        </form>
      </dialog>
    </>
  );
};

export default AddInterest;
