import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import './interest.css';

export default function BackgroundTable({ setisbtnclick1, setSelectedRecord, setIsEditing }) {
  const [backgroundEducation, setBackgroundEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  

  const fetchBackground = async () => {
    try {
      setIsLoading(true);
      const userId = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers")).user.userId;
      const response = await fetch(`https://marshy-brainy-weight.glitch.me/getbackground/${userId}`);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setBackgroundEducation(data);
      } else {
        setBackgroundEducation([]);
      }
    } catch (error) {
      console.error("Error fetching background information:", error);
      setBackgroundEducation([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (record) => {
    setSelectedRecord(record);
    setIsEditing(true); 
    setisbtnclick1(false); 
  };

  useEffect(() => {
    fetchBackground();
  }, []);

  const handleReload = () => {
    fetchBackground(); 
  };

  const handleaddbg = () => {
    setisbtnclick1(true);
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Delete clicked for id: ${id}`);
      const response = await fetch(`https://marshy-brainy-weight.glitch.me/getbackground/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("Record deleted successfully");
        setBackgroundEducation((prev) =>
          prev.filter((item) => item.backgroundId !== id)
        );
      } else {
        const errorData = await response.json();
        console.error("Failed to delete the record:", errorData.message);
      }
    } catch (error) {
      console.error("Error while deleting the record:", error);
    }
  };

  return (
    <div className="interest-table-container">
      <table className="interest-table">
        <caption>
          Background Information{' '}
          <button className="btntable" onClick={handleReload}>
            Reload
          </button>
        </caption>
        <thead>
          <tr>
            <th>Institute Name</th>
            <th>Degree Level</th>
            <th>Degree Title</th>
            <th>Total Marks</th>
            <th>Obtained Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                Loading...
              </td>
            </tr>
          ) : backgroundEducation.length > 0 ? (
            backgroundEducation.map((education, index) => (
              <tr key={index}>
                <td>{education.instituteName}</td>
               <td>{education.degreeLevel}</td>
                <td>{education.degreeTitle}</td>
                <td>{education.TotalMarks}</td>
                <td>{education.ObtainedMarks}</td>
                <td>
                  <div className="action-buttons1">
                    <button
                      className="action-btn1 update-btn"
                      onClick={() => handleUpdate(education)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn1 delete-btn"
                      onClick={() => handleDelete(education.backgroundId)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No Background Education found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="add-interest-btn" onClick={handleaddbg}>
        +
      </button>
    </div>
  );
}
