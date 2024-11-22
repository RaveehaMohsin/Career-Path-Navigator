import React, { useState } from 'react';
import '../Jobs/jobs.css';

function CourseCard({ course }) {
  const [status, setStatus] = useState(course?.status || 'Wishlist');

  if (!course) {
    return <div className="job-card p-4">No course data available</div>;
  }

  const courseId = course.courseId; 

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus); 

    try {

      const response = await fetch(`http://localhost:4000/updateProgressStatus/update-status-course/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        console.log('Course status updated:', updatedJob.message);  // Log or handle success message
      } else {
        console.error('Failed to update course status');
      }
    } catch (error) {
      console.error('Error updating course status:', error);
    }
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
        <h3 className="job-card-title">{course.courseTitle}</h3>
        <p className="job-card-company">{course.providerSource}</p>
      </div>
      <div className="job-card-content">
        <div className="job-card-detail">
          <span className="job-card-icon">⏱</span>
          <span>{course.durationCourse}</span>
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
          <span>Skills : {course.skillsCovered || 'Not defined'}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">💵</span>
          <span>{course.courseFees || 'Free'}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-icon">🏆</span>
          <span>{String(course.certification).toLowerCase() === 'yes' ? 'Certification Available' : 'No Certification'}</span>
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
