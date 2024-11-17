import React from "react";
import "../../Student Interest Details/modal.css";
import { FaUserTie } from "react-icons/fa";

const AddJob = ({ isOpen, onCancel }) => {
 

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>

      <dialog open className={"room-dialog sidebar-closed"}>
        <h2 className="h2class">
          Job Details <FaUserTie className="icon" />
        </h2>
        <form>
          

           <p>
            <label className="labelclass">Job Title *</label>
            <input
              className="inputclass"
              type="text"
              id="jobtitle"
              name="jobtitle"
              required
            />
          </p>

          <p>
            <label className="labelclass">Current Status of Job *</label>
            <select
              className="selectclass"
              id="jobstatus"
              name="jobstatus"
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
              name="jobcompany"
              required
            />
          </p>

          <p>
            <label className="labelclass">Location *</label>
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
              
            />
          </p>

          
          <p>
            <label className="labelclass">Employment Type *</label>
            <select
              className="selectclass"
              id="jobemploymenttype"
              name="jobemploymenttype"
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
              name="jobdesc"
              required
            />
          </p>

          <p>
            <label className="labelclass">Education Required</label>
            <input
              className="inputclass"
              type="text"
              id="jobeducationreq"
              name="jobeducationreq"
              
            />
          </p>

          <p>
            <label className="labelclass">Skills Required</label>
            <input
              className="inputclass"
              type="text"
              id="jobskillsreq"
              name="jobskillsreq"
              
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
