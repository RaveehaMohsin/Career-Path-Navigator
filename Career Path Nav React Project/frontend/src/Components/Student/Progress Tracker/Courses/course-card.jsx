import React, { useState } from 'react';
import '../Jobs/jobs.css';

function CourseCard({ course, onStatusChange }) {
  const [status, setStatus] = useState(course?.status || 'Wishlist');

  if (!course) {
    return <div className="job-card p-4">No course data available</div>;
  }

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onStatusChange(course.id, newStatus);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'not interested':
        return 'status-not-interested';
      case 'in progress':
        return 'status-in-progress';
      default:
        return 'status-wishlist';
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3 className="job-card-title">{course.title}</h3>
        <p className="job-card-company">{course.provider}</p>
      </div>
      <div className="job-card-content">
        <div className="job-card-detail">
          <span className="job-card-icon">⏱</span>
          <span>{course.duration}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">📜</span>
          <span>{course.courseLevel}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">📖</span>
          <span>Prerequisites : {course.prerequisites || 'None'}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💡</span>
          <span>Skills : {course.skillsCovered}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💵</span>
          <span>{course.fees || 'Free'}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">🏆</span>
          <span>{course.certification ? 'Certification Available' : 'No Certification'}</span>
        </div>
      </div>
      <div className="job-card-footer">
        <span className={`job-status-badge ${getStatusClass(status)}`}>{status}</span>
        <select onChange={handleStatusChange} value={status}>
          <option value="Wishlist">Wishlist</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Not Interested">Not Interested</option>
        </select>
      </div>
    </div>
  );
}

export default CourseCard;
