import React, { useState } from 'react';
import CourseCard from './course-card';
import '../Jobs/jobs.css';
import Upperheader from '../../../UpperHeader/upperheader';
import { FaPlus, FaUserCircle } from 'react-icons/fa';
import AddCourse from './coursemodal';

export default function Courses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Full-Stack Web Development',
      provider: 'Coursera',
      duration: '6 months',
      courseLevel: 'Beginner to Advanced',
      prerequisites: 'Basic understanding of programming',
      skillsCovered: 'HTML, CSS, JavaScript, React, Node.js, MongoDB',
      fees: '$499',
      certification: true,
      status: 'Wishlist',
    },
    {
      id: 2,
      title: 'Data Science Specialization',
      provider: 'edX',
      duration: '4 months',
      courseLevel: 'Intermediate',
      prerequisites: 'Knowledge of Python and statistics',
      skillsCovered: 'Python, Pandas, NumPy, Machine Learning',
      fees: '$299',
      certification: true,
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'UI/UX Design Essentials',
      provider: 'Udemy',
      duration: '3 months',
      courseLevel: 'Beginner',
      prerequisites: 'None',
      skillsCovered: 'Figma, Sketch, Prototyping, Wireframing',
      fees: '$99',
      certification: true,
      status: 'Completed',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, status: newStatus } : course
      )
    );
  };

  const [isAddingCourse, setIsAddingCourse] = useState(false);

  const handleAddClick = () => {
    setIsAddingCourse(true);
  };

  const handleCloseDialog = () => {
    setIsAddingCourse(false);
  };

  return (
    <div>
      <Upperheader title="Courses Progress Tracker" />
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
          <AddCourse isOpen={isAddingCourse} onCancel={handleCloseDialog} />
        )}

        {/* Course Listings Grid */}
        <div className="job-listings">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
