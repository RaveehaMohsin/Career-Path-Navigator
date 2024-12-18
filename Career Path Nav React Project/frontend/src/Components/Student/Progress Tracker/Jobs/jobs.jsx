import React, { useState, useEffect } from 'react';
import JobCard from './job-card';
import './jobs.css';
import Upperheader from '../../../UpperHeader/upperheader';
import { FaPlus, FaUserCircle } from 'react-icons/fa';
import AddJob from './jobaddmodal';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const studentId = userData.user.userId;
  const username = userData.user.firstName + " " + userData.user.lastName;

  const [showNoJobsMessage, setShowNoJobsMessage] = useState(false);

  useEffect(() => {
    if (jobs.length === 0) {
      const timer = setTimeout(() => {
        setShowNoJobsMessage(true);
      }, 1000); 

      return () => clearTimeout(timer);
    } else {
      setShowNoJobsMessage(false); 
    }
  }, [jobs]);

  // Fetch jobs from the backend when the component mounts
  const fetchJobs = async () => {
    try {
      const response = await fetch(`https://marshy-brainy-weight.glitch.me/getProgresses/getjobs/${studentId}`);
      const data = await response.json();

      if (response.ok) {
        setJobs(data.jobs);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  useEffect(() => {

    if (studentId) {
      fetchJobs();
    }
  }, [studentId]); 

  const handleStatusChange = (id, newStatus) => {
    setJobs(jobs.map(job => 
      job.jobId === id ? { ...job, status: newStatus } : job
    ));
  };

  const handleaddclick = () => {
    setIsAddingJob(true);
  };

  const handleCloseDialog = () => {
    setIsAddingJob(false);
    fetchJobs();
    
  };

  return (
    <div>
      <Upperheader title="Job Progress Tracker" name={username} />
      <div className="jobs-container">
        {/* Experience input section */}
        <div className="experience-input">
          <h2>
            <FaUserCircle /> Any additional experience of your jobs?
          </h2>
          <button type='button' onClick={handleaddclick}>
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
        {jobs.length === 0 && showNoJobsMessage ? (
          <p>No jobs found for this student.</p>
        ) : (
          jobs.map((job) => (
            <JobCard key={job.jobId} job={job} onStatusChange={handleStatusChange} />
          ))
        )}
      </div>
      </div>
    </div>
  );
}
