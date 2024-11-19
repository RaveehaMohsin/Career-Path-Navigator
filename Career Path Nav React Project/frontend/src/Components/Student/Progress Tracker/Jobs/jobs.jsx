import React, { useState } from 'react';
import JobCard from './job-card';
import './jobs.css';
import Upperheader from '../../../UpperHeader/upperheader';
import { FaPlus, FaUserCircle } from 'react-icons/fa';
import AddJob from './jobaddmodal';

export default function Jobs() {

  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobTitle: 'Software Engineer',
      company: 'TechCorp',
      location: 'Remote',
      jobDescription: 'Develop and maintain software applications.',
      salaryRange: '$70,000 - $90,000',
      employmentType: 'Full-time',
      educationLevel: "Bachelor's Degree",
      requiredSkills: 'JavaScript, React, Node.js',
      status: 'Wishlist',
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'InnovateX',
      location: 'San Francisco, CA',
      jobDescription: 'Lead product strategy and roadmap.',
      salaryRange: '$100,000 - $130,000',
      employmentType: 'Full-time',
      educationLevel: "Master's Degree",
      requiredSkills: 'Product Management, Agile, Market Research',
      status: 'Interviewed',
    },
    {
      id: 3,
      jobTitle: 'UX Designer',
      company: 'DesignFlow',
      location: 'Austin, TX',
      jobDescription: 'Design and enhance user interfaces.',
      salaryRange: '$85,000 - $105,000',
      employmentType: 'Full-time',
      educationLevel: "Bachelor's Degree",
      requiredSkills: 'UI/UX, Figma, Sketch',
      status: 'Offered',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    ));
  };

  const [isAddingJob , setIsAddingJob] = useState(false)

  const handleaddclick = () => {
    setIsAddingJob(true);
  };

  const handleCloseDialog = () => {
    setIsAddingJob(false);
  };

  return (
    <div>
      <Upperheader title="Job Progress Tracker" />
      <div className="jobs-container">
      {/* Experience input section */}
      <div className="experience-input">
        <h2>
          <FaUserCircle /> Any additional experience of your jobs?
        </h2>
        <button type='button' onClick={()=>handleaddclick()}>
          <FaPlus /> Add
        </button>
      </div>

      {isAddingJob && (
        <AddJob
          isOpen={isAddingJob}
          onCancel={handleCloseDialog}
        />
      )}

      {/* Job listings grid */}
      <div className="job-listings">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onStatusChange={handleStatusChange} />
        ))}
      </div>
      </div>
    </div>
  );
}
