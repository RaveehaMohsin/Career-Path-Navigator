import React, { useState } from 'react';
import './jobs.css';

function JobCard({ job }) {
  const [status, setStatus] = useState(job?.status || 'Unknown');  // Initial status from job prop

  if (!job) {
    return <div className="job-card p-4">No job data available</div>;
  }

  const jobId = job.jobId; 

  // Function to handle status change
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);  // Update the local state

    try {
      // Make the API request to update the status
      const response = await fetch(`http://localhost:4000/updateProgressStatus/update-status-job/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        console.log('Job status updated:', updatedJob.message);  // Log or handle success message
      } else {
        console.error('Failed to update job status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  // Function to determine the CSS class for each status
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'offered':
        return 'status-offered';
      case 'rejected':
        return 'status-rejected';
      case 'interviewed':
        return 'status-interviewed';
      case 'current job':
        return 'status-current-job';
      default:
        return 'status-wishlist';  // Default status is wishlist
    }
  };

  // Function to check if a field is empty and return a fallback message
  const getFieldValue = (field, fallback) => {
    return field && field.trim() !== '' ? field : fallback;
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3 className="job-card-title">{job.jobTitle}</h3>
        <p className="job-card-company">{job.company}</p>
      </div>
      <div className="job-card-content">
        <div className="job-card-detail">
          <span className="job-card-icon">📍</span>
          <span>{getFieldValue(job.locationJob, 'No location provided')}</span>
        </div>
        <p>{getFieldValue(job.jobDescription, 'No job description available')}</p>
        <div className="job-card-detail">
          <span className="job-card-icon">💵</span>
          <span>{getFieldValue(job.salaryRange, 'No salary information available')}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💼</span>
          <span>{getFieldValue(job.employmentType, 'No employment type specified')}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">🎓</span>
          <span>
          {job.educationLevelRequired 
            ? `Education Required: ${job.educationLevelRequired}` 
            : 'No education level specified'}
        </span>

        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💻</span>
          <span>
          {job.requiredSkills 
            ? `Skills: ${job.requiredSkills}` 
            : 'No skills specified'}
        </span>

        </div>
      </div>
      <div className="job-card-footer">
        {/* Display current status */}
        <span className={`job-status-badge ${getStatusClass(status)}`}>{status}</span>

        {/* Dropdown to change status */}
        <select onChange={handleStatusChange} value={status}>
          <option value="Wishlist">Wishlist</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
          <option value="Current Job">Current Job</option>
        </select>
      </div>
    </div>
  );
}

export default JobCard;
