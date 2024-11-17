import React, { useState } from 'react';
import '../Jobs/jobs.css';

function DegreeCard({ degree, onStatusChange }) {
  const [status, setStatus] = useState(degree?.status || 'Wishlist');

  if (!degree) {
    return <div className="job-card p-4">No degree data available</div>;
  }

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onStatusChange(degree.id, newStatus);
  };

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
        return 'status-wishlist';
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3 className="job-card-title">{degree.title}</h3>
        <p className="job-card-company">{degree.institution}</p>
      </div>
      <div className="job-card-content">
        <div className="job-card-detail">
          <span className="job-card-icon">📍</span>
          <span>{degree.location}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">⏱</span>
          <span>{degree.duration}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">📚</span>
          <span>Mode of Study: {degree.modeOfStudy}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">📖</span>
          <span>Curriculum: {degree.curriculumOverview}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💼</span>
          <span>Career Opportunities: {degree.careerOpportunities}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💵</span>
          <span>Salary Prospects: {degree.salaryProspects}</span>
        </div>
      </div>
      <div className="job-card-footer">
        <span className={`job-status-badge ${getStatusClass(status)}`}>{status}</span>
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
