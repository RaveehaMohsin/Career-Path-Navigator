import React from "react";
import "../../Student Interest Details/modal.css";
import { FaLaptop } from "react-icons/fa";

const AddCourse = ({ isOpen, onCancel }) => {
 

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>

      <dialog open className={"room-dialog sidebar-closed"}>
        <h2 className="h2class">
          Course Details <FaLaptop className="icon" />
        </h2>
        <form>
          

           <p>
            <label className="labelclass">Course Title *</label>
            <input
              className="inputclass"
              type="text"
              id="coursetitle"
              name="coursetitle"
              required
            />
          </p>

          <p>
            <label className="labelclass">Current Status of Course *</label>
            <select
              className="selectclass"
              id="coursestatus"
              name="coursestatus"
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
              
            />
          </p>

          <p>
            <label className="labelclass">Course Level *</label>
            <select
              className="selectclass"
              id="courselevel"
              name="courselevel"
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
              
            />
          </p>

          <p>
            <label className="labelclass">Certificate *</label>
            <select
              className="selectclass"
              id="coursecertificate"
              name="coursecertificate"
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
              
            />
          </p>

          <p>
            <label className="labelclass">Any Prerequisites</label>
            <input
              className="inputclass"
              type="text"
              id="courseprereq"
              name="courseprereq"
              
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

export default AddCourse;
