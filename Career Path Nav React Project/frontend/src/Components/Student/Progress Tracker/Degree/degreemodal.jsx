import React from "react";
import "../../Student Interest Details/modal.css";
import { FaGraduationCap } from "react-icons/fa";

const AddDegree = ({ isOpen, onCancel }) => {
 

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>

      <dialog open className={"room-dialog sidebar-closed"}>
        <h2 className="h2class">
          Degree Details <FaGraduationCap className="icon" />
        </h2>
        <form>
          

           <p>
            <label className="labelclass">Degree Title *</label>
            <input
              className="inputclass"
              type="text"
              id="degreetitle"
              name="degreetitle"
              required
            />
          </p>

          <p>
            <label className="labelclass">Current Status of Degree *</label>
            <select
              className="selectclass"
              id="degreestatus"
              name="degreestatus"
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
              
            />
          </p>

          <p>
            <label className="labelclass">Location of Institute *</label>
            <input
              className="inputclass"
              type="text"
              id="locationdeg"
              name="locationdeg"
              required
              
            />
          </p>


          <p>
            <label className="labelclass">Career Oppurtunities</label>
            <input
              className="inputclass"
              type="text"
              id="careeropp"
              name="careeropp"
              
            />
          </p>

          <p>
            <label className="labelclass">Salary Prospects</label>
            <input
              className="inputclass"
              type="text"
              id="degsalary"
              name="degsalary"
              
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

export default AddDegree;
