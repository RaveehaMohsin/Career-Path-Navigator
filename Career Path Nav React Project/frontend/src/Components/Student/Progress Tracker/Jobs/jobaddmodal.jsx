import React from "react";
import "./modal.css";
import { FaGraduationCap } from "react-icons/fa";

const AddJob = ({ isOpen, onCancel }) => {
 

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>

      <dialog open className={"room-dialog sidebar-closed"}>
        <h2 className="h2class">
          Job Details <FaGraduationCap className="icon" />
        </h2>
        <form>
          

          <p>
            <label className="labelclass">Degree Title</label>
            <select
              className="selectclass"
              id="degreetitle"
              name="degreetitle"
              required
            >
              <option value="Matriculation">Matriculation</option>
              <option value="O Levels">O Levels</option>
              <option value="Intermediate">Intermediate</option>
              <option value="A Levels">A Levels</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's degree">Bachelor's degree</option>
              <option value="Master's degree">Master's degree</option>
              <option value="M.Phil">M.Phil</option>
              <option value="ph.D.">ph.D.</option>
            </select>
            
          </p>

           <p>
            <label className="labelclass">Job Title</label>
            <input
              className="inputclass"
              type="text"
              id="jobtitle"
              name="jobtitle"
              required
            />
          </p>

          <p>
            <label className="labelclass">Company</label>
            <input
              className="inputclass"
              type="text"
              id="jobcompany"
              name="jobcompany"
              required
            />
          </p>

          <p>
            <label className="labelclass">Location</label>
            <input
              className="inputclass"
              type="text"
              id="joblocation"
              name="joblocation"
              required
            />
          </p>

          <p>
            <label className="labelclass">Salary Offered</label>
            <input
              className="inputclass"
              type="number"
              id="jobsalary"
              name="jobsalary"
              required
            />
          </p>

          
          <p>
            <label className="labelclass">Employment Type</label>
            <select
              className="selectclass"
              id="degreetitle"
              name="degreetitle"
              required
            >
              <option value="Matriculation">Matriculation</option>
              <option value="O Levels">O Levels</option>
              <option value="Intermediate">Intermediate</option>
              <option value="A Levels">A Levels</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's degree">Bachelor's degree</option>
              <option value="Master's degree">Master's degree</option>
              <option value="M.Phil">M.Phil</option>
              <option value="ph.D.">ph.D.</option>
            </select>
            
          </p>



          <p>
            <label className="labelclass">Obtained Marks</label>
            <input
              className="inputclass"
              type="number"
              id="obtainedmarks"
              name="obtainedmarks"
              required
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
