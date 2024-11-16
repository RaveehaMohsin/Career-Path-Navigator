import React, { useState } from 'react';
import Upperheader from '../../UpperHeader/upperheader';
import './careerrecommendation.css';

export default function CareerRecommendation() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [courses, setCourses] = useState([]);

  const countries = ["United States", "Canada", "United Kingdom", "Australia", "India", "Pakistan"];
  const [interest, setInterest] = useState("");
  const [education, setEducation] = useState("");
  const [country, setCountry] = useState("");

  const handleGenerateResponses = async () => {
    setIsLoading(true);
  
    try {
      const prompt = `Provide 10 structured recommendations for jobs,
       degrees, and courses based on the following inputs: Interest: ${interest},Education Level: ${education}, Country: ${country}. 
       Return a JSON object with the following attributes: 
       Jobs (Job Title, Company, Location, Brief Job Description, Salary Range, Employment Type, Education Level Required, Required Skills), 
       Degrees (Degree Title, Institution, Location, Duration, Mode of Study, Curriculum Overview, Career Opportunities, Salary Prospects),
       and Courses (Course Title, Provider, Duration, Brief Course Description, Course Level, Prerequisites, Skills Covered, Course Fees, Certification).`;

      // Call the backend API with the prompt included in the request
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });
  
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
  
      const data = await response.json();
  
      // Log the raw response for debugging purposes
      console.log("Raw Response Data:", data);
  
      // Extract the text content from the response
      const textContent = data.candidates[0]?.content?.parts[0]?.text;
  
      if (!textContent) {
        throw new Error("No content received in response.");
      }
  
      // Clean up any unwanted characters around JSON data
      // Remove everything before and after the JSON string (if any)
      const jsonStringMatch = textContent.match(/({.*})/s); // Match everything within the JSON braces
  
      if (!jsonStringMatch) {
        throw new Error("No valid JSON found in the response.");
      }
  
      const jsonString = jsonStringMatch[0].trim();
  
      // Log cleaned-up JSON string for debugging
      console.log("Cleaned JSON String:", jsonString);
  
      try {
        // Try parsing the cleaned JSON string
        const parsedData = JSON.parse(jsonString);
  
        // Extract the Jobs, Degrees, and Courses arrays
        const jobs = parsedData.Jobs || [];
        const degrees = parsedData.Degrees || [];
        const courses = parsedData.Courses || [];
  
        // Log the extracted data for debugging
        console.log("Jobs:", jobs);
        console.log("Degrees:", degrees);
        console.log("Courses:", courses);
  
        // Update state with parsed data
        setJobs(jobs);
        setDegrees(degrees);
        setCourses(courses);
  
        setShowResults(true);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        throw new Error("Error parsing the response data into JSON.");
      }
  
    } catch (error) {
      console.error("Error in handleGenerateResponses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Upperheader title="Career Recommendation" />

      <div className="career-recommendation-container">
        {/* Dropdown Selects */}
        <select
          className="select-option"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select Interest</option>
          <option value="Technology">Technology</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
          <option value="Business">Business</option>
        </select>

        <select
          className="select-option"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select Education</option>
          <option value="High School">High School</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>

        <select
          className="select-option"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>

        {/* Generate Responses Button */}
        <button className="generate-button" onClick={handleGenerateResponses}>
          Generate Responses
        </button>

        {/* Loading Spinner */}
        {isLoading && <div className="spinner">Loading...</div>}

        {/* Results Tables */}
        {showResults && (
          <div className="results-tables table-responsive-xl">
            <table className="recommendation-table" style={{width:"1250px"}}>
              <caption style={{ captionSide: "top" }}>Degree Recommendations</caption>
              <thead>
                <tr>
                  <th>Degree Title</th>
                  <th>Institution</th>
                  <th>Location</th>
                  <th>Duration</th>
                  <th>Mode of Study</th>
                  <th>Curriculum Overview</th>
                  <th>Career Opportunities</th>
                  <th>Salary Prospects</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {degrees.map((degree, index) => (
                  <tr key={index}>
                    <td>{degree['Degree Title']}</td>
                    <td>{degree.Institution}</td>
                    <td>{degree.Location}</td>
                    <td>{degree.Duration}</td>
                    <td>{degree['Mode of Study']}</td>
                    <td>{degree['Curriculum Overview']}</td>
                    <td>{degree['Career Opportunities']}</td>
                    <td>{degree['Salary Prospects']}</td>
                    <td><button className="add-button">Add</button></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="recommendation-table" style={{width:"1250px"}} >
              <caption style={{ captionSide: "top" }}>Job Recommendations</caption>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Salary Range</th>
                  <th>Employment Type</th>
                  <th>Job Description</th>
                  <th>Education Level Required</th>
                  <th>Required Skills</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={index}>
                    <td>{job['Job Title']}</td>
                    <td>{job.Company}</td>
                    <td>{job.Location}</td>
                    <td>{job['Salary Range']}</td>
                    <td>{job['Employment Type']}</td>
                    <td>{job['Brief Job Description']}</td>
                    <td>{job['Education Level Required']}</td>
                    <td>{job['Required Skills']}</td>
                    <td><button className="add-button">Add</button></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="recommendation-table" style={{width:"1250px"}}>
              <caption style={{ captionSide: "top" }}>Course Recommendations</caption>
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Provider</th>
                  <th>Duration</th>
                  <th>Course Level</th>
                  <th>Prerequisites</th>
                  <th>Skills Covered</th>
                  <th>Course Fees</th>
                  <th>Certification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course['Course Title']}</td>
                    <td>{course.Provider}</td>
                    <td>{course.Duration}</td>
                    <td>{course['Course Level']}</td>
                    <td>{course.Prerequisites}</td>
                    <td>{course['Skills Covered']}</td>
                    <td>{course['Course Fees']}</td>
                    <td>{course.Certification}</td>
                    <td><button className="add-button">Add</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
