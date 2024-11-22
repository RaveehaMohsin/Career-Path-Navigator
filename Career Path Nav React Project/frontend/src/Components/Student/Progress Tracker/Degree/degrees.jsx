import React, { useState, useEffect } from 'react';
import DegreeCard from './degree-card';
import '../Jobs/jobs.css';
import Upperheader from '../../../UpperHeader/upperheader';
import { FaPlus, FaUserCircle } from 'react-icons/fa';
import AddDegree from './degreemodal';

export default function Degrees() {
  const [degrees, setDegrees] = useState([]);
  const [isAddingDegree, setIsAddingDegree] = useState(false);
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const studentId = userData.user.userId;
  const username = userData.user.firstName + " " + userData.user.lastName;

  const [showNoJobsMessage, setShowNoJobsMessage] = useState(false);

  useEffect(() => {
    if (degrees.length === 0) {
      const timer = setTimeout(() => {
        setShowNoJobsMessage(true);
      }, 1000); 

      return () => clearTimeout(timer);
    } else {
      setShowNoJobsMessage(false); 
    }
  }, [degrees]);

  // Fetch degrees from the backend when the component mounts
  const fetchDegrees = async () => {
    try {
      const response = await fetch(`http://localhost:4000/getProgresses/getdegrees/${studentId}`);
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        setDegrees(data.degrees);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching degrees:', error);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchDegrees();
    }
  }, [studentId]);

  const handleStatusChange = (id, newStatus) => {
    setDegrees(degrees.map(degree =>
      degree.degreeId === id ? { ...degree, status: newStatus } : degree
    ));
  };

  const handleAddClick = () => {
    setIsAddingDegree(true);
  };

  const handleCloseDialog = () => {
    setIsAddingDegree(false);
    fetchDegrees(); 
  };

  return (
    <div>
      <Upperheader title="Degrees Progress Tracker" name={username} />
      <div className="jobs-container">
        {/* Add Degree Section */}
        <div className="experience-input">
          <h2>
            <FaUserCircle /> Any additional Degrees?
          </h2>
          <button type="button" onClick={handleAddClick}>
            <FaPlus /> Add
          </button>
        </div>

        {isAddingDegree && (
          <AddDegree
            isOpen={isAddingDegree}
            onCancel={handleCloseDialog}
          />
        )}

        {/* Degree Listings Grid */}
        <div className="job-listings">
          {degrees.length === 0 && showNoJobsMessage  ? (
            <p>No degrees found for this student.</p>
          ) : (
            degrees.map(degree => (
              <DegreeCard
                key={degree.degreeId}
                degree={degree}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
