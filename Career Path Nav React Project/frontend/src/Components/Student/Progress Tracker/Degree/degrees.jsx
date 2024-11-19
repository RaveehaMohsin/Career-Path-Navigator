import React, {  useState } from 'react';
import DegreeCard from './degree-card'; 
import '../Jobs/jobs.css';
import Upperheader from '../../../UpperHeader/upperheader';
import { FaPlus, FaUserCircle } from 'react-icons/fa';
import AddDegree from './degreemodal'; 

export default function Degrees() {

  const [degrees, setDegrees] = useState([
    {
      id: 1,
      title: 'Bachelor of Computer Science',
      institution: 'Harvard University',
      location: 'Cambridge, MA',
      duration: '4 years',
      modeOfStudy: 'On-Campus',
      curriculumOverview: 'Data Structures, Algorithms, AI, Software Development',
      careerOpportunities: 'Software Engineer, Data Scientist, Researcher',
      salaryProspects: '$85,000 - $120,000/year',
      status: 'Wishlist',
    },
    {
      id: 2,
      title: 'Master of Data Science',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      duration: '2 years',
      modeOfStudy: 'Online',
      curriculumOverview: 'Machine Learning, Big Data, Advanced Statistics',
      careerOpportunities: 'Data Scientist, Machine Learning Engineer',
      salaryProspects: '$100,000 - $140,000/year',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'PhD in Artificial Intelligence',
      institution: 'MIT',
      location: 'Cambridge, MA',
      duration: '5 years',
      modeOfStudy: 'On-Campus',
      curriculumOverview: 'Neural Networks, Robotics, Advanced AI Algorithms',
      careerOpportunities: 'AI Researcher, Professor, R&D Specialist',
      salaryProspects: '$120,000 - $200,000/year',
      status: 'Completed',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setDegrees(
      degrees.map((degree) =>
        degree.id === id ? { ...degree, status: newStatus } : degree
      )
    );
  };

  const [isAddingDegree, setIsAddingDegree] = useState(false);

  const handleAddClick = () => {
    setIsAddingDegree(true);
  };

  const handleCloseDialog = () => {
    setIsAddingDegree(false);
  };

  return (
    <div>
      <Upperheader title="Degrees Progress Tracker" />
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
          <AddDegree isOpen={isAddingDegree} onCancel={handleCloseDialog} />
        )}

        {/* Degree Listings Grid */}
        <div className="job-listings">
          {degrees.map((degree) => (
            <DegreeCard
              key={degree.id}
              degree={degree}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
