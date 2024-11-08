import React from 'react';
import './interest.css';

export default function BackgroundTable({setisbtnclick1}) {
  const backgroundEducation = [
    {
      instituteName: "ABC High School",
      degreeTitle: "Matriculation",
      totalMarks: 1100,
      obtainedMarks: 990,
    },
    {
      instituteName: "XYZ College",
      degreeTitle: "Intermediate",
      totalMarks: 1100,
      obtainedMarks: 1020,
    },
    
  ];

  const handleaddbg =()=>
  {
    setisbtnclick1(true)
  }

  return (
    <div className="interest-table-container">
      <table className="interest-table">
        <caption>Background Information</caption>
        <thead>
          <tr>
            <th>Institute Name</th>
            <th>Degree Title</th>
            <th>Total Marks</th>
            <th>Obtained Marks</th>
          </tr>
        </thead>
        <tbody>
          {backgroundEducation.map((education, index) => (
            <tr key={index}>
              <td>{education.instituteName}</td>
              <td>{education.degreeTitle}</td>
              <td>{education.totalMarks}</td>
              <td>{education.obtainedMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-interest-btn" onClick={handleaddbg}>+</button>


    </div>
  );
}
