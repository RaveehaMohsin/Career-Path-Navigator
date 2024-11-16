import React, { useState } from 'react';
import './job-card.css'

function JobCard({ job, onStatusChange }) {
  const [status, setStatus] = useState(job?.status || 'Unknown');

  if (!job) {
    return <div className="job-card p-4">No job data available</div>;
  }

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onStatusChange(job.id, newStatus);
  };

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
        return 'status-wishlist';
    }
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
          <span>{job.location}</span>
        </div>
        <p>{job.jobDescription}</p>
        <div className="job-card-detail">
          <span className="job-card-icon">💵</span>
          <span>{job.salaryRange}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💼</span>
          <span>{job.employmentType}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">🎓</span>
          <span>{job.educationLevel}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💻</span>
          <span>{job.requiredSkills}</span>
        </div>
      </div>
      <div className="job-card-footer">
        <span className={`job-status-badge ${getStatusClass(status)}`}>{status}</span>
        <select onChange={handleStatusChange} value={status}>
          <option value="Wishlist">Wishlist</option>
          <option value="Applied">Applied</option>
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
