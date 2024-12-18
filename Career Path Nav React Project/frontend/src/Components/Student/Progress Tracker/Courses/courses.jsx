import React, { useState, useEffect } from 'react';
import CourseCard from './course-card';
import '../Jobs/jobs.css';
import Upperheader from '../../../UpperHeader/upperheader';
import { FaPlus, FaUserCircle } from 'react-icons/fa';
import AddCourse from './coursemodal';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const studentId = userData.user.userId;
  const username = userData.user.firstName + " " + userData.user.lastName;

  const [showNoJobsMessage, setShowNoJobsMessage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      const timer = setTimeout(() => {
        setShowNoJobsMessage(true);
      }, 1000); 

      return () => clearTimeout(timer);
    } else {
      setShowNoJobsMessage(false); 
    }
  }, [courses]);

  // Fetch courses from the backend when the component mounts
  const fetchCourses = async () => {
    try {
      const response = await fetch(`https://marshy-brainy-weight.glitch.me/getProgresses/getcourses/${studentId}`);
      const data = await response.json();

      if (response.ok) {
        setCourses(data.courses);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchCourses();
    }
  }, [studentId]);

  const handleStatusChange = (id, newStatus) => {
    setCourses(courses.map(course =>
      course.courseId === id ? { ...course, status: newStatus } : course
    ));
  };

  const handleAddClick = () => {
    setIsAddingCourse(true);
  };

  const handleCloseDialog = () => {
    setIsAddingCourse(false);
    fetchCourses(); 
  };

  return (
    <div>
      <Upperheader title="Courses Progress Tracker" name={username} />
      <div className="jobs-container">
        {/* Add Course Section */}
        <div className="experience-input">
          <h2>
            <FaUserCircle /> Any additional Courses?
          </h2>
          <button type="button" onClick={handleAddClick}>
            <FaPlus /> Add
          </button>
        </div>

        {isAddingCourse && (
          <AddCourse
            isOpen={isAddingCourse}
            onCancel={handleCloseDialog}
          />
        )}

        {/* Course Listings Grid */}
        <div className="job-listings">
          {courses.length === 0 && showNoJobsMessage  ? (
            <p>No courses available for this student.</p>
          ) : (
            courses.map(course => (
              <CourseCard
                key={course.courseId}
                course={course}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
