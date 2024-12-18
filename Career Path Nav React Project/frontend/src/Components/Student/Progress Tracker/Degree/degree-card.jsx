import React, { useState } from 'react';
import '../Jobs/jobs.css';

function DegreeCard({ degree }) {
  const [status, setStatus] = useState(degree?.status || 'Wishlist'); // Initial status from degree prop

  if (!degree) {
    return <div className="job-card p-4">No degree data available</div>;
  }

  const degreeId = degree.degreeId;

  // Function to handle status change
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus); // Update the local state

    try {
      // Make the API request to update the status
      const response = await fetch(`https://marshy-brainy-weight.glitch.me/updateProgressStatus/update-status-degree/${degreeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedDegree = await response.json();
        console.log('Degree status updated:', updatedDegree.message); // Log or handle success message
      } else {
        console.error('Failed to update degree status');
      }
    } catch (error) {
      console.error('Error updating degree status:', error);
    }
  };

  // Function to determine the CSS class for each status
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'enrolled':
        return 'status-enrolled';
      case 'not eligible':
        return 'status-not-eligible';
      case 'completed':
        return 'status-completed';
      case 'applied':
        return 'status-applied';
      default:
        return 'status-wishlist'; // Default status is wishlist
    }
  };

  // Function to check if a field is empty and return a fallback message
  const getFieldValue = (field, fallback) => {
    return field && field.trim() !== '' ? field : fallback;
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3 className="job-card-title">{degree.degreeTitle}</h3>
        <p className="job-card-company">{degree.instituition}</p>
      </div>
      <div className="job-card-content">
        <div className="job-card-detail">
          <span className="job-card-icon">📍</span>
          <span>{getFieldValue(degree.locationInstitute, 'No location provided')}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">⏱</span>
          <span>{getFieldValue(degree.duration, 'No duration information available')}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">📚</span>
          <span>Mode of Study: {getFieldValue(degree.modeofStudy, 'No mode of study specified')}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">📖</span>
          <span>Curriculum: {getFieldValue(degree.curriculumOverview, 'No curriculum overview available')}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💼</span>
          <span>Oppurtunities: {getFieldValue(degree.careerOpportunities, 'No career opportunities specified')}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💵</span>
          <span>Salary Prospects: {getFieldValue(degree.salaryProspects, 'No salary information available')}</span>
        </div>
      </div>
      <div className="job-card-footer">
        {/* Display current status */}
        <span className={`job-status-badge ${getStatusClass(status)}`}>{status}</span>

        {/* Dropdown to change status */}
        <select onChange={handleStatusChange} value={status}>
          <option value="Wishlist">Wishlist</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Completed">Completed</option>
          <option value="Not Eligible">Not Eligible</option>
          <option value="Applied">Applied</option>
        </select>
      </div>
    </div>
  );
}

export default DegreeCard;
