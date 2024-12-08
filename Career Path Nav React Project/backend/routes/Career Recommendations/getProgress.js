const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming your MySQL connection is exported from this file

// Get all jobs for a specific student ID
router.get("/getjobs/:studentId", (req, res) => {
  const { studentId } = req.params;

  const selectQuery = `
    SELECT jobId, jobTitle, company, locationJob, salaryRange, employmentType, 
           jobDescription, educationLevelRequired, requiredSkills, status
    FROM Jobs
    WHERE studentId = ?
  `;

  connection.query(selectQuery, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({ error: "An error occurred while fetching the jobs." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No jobs found for this student." });
    }

    res.status(200).json({ jobs: results });
  });
});

// Get all courses for a specific student ID
router.get("/getcourses/:studentId", (req, res) => {
  const { studentId } = req.params;

  const selectQuery = `
    SELECT courseId, courseTitle, providerSource, durationCourse, courseLevel, 
           prerequisites, skillsCovered, courseFees, certification, status
    FROM Course
    WHERE studentId = ?
  `;

  connection.query(selectQuery, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).json({ error: "An error occurred while fetching the courses." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No courses found for this student." });
    }

    res.status(200).json({ courses: results });
  });
});

// Get all degrees for a specific student ID
router.get("/getdegrees/:studentId", (req, res) => {
  const { studentId } = req.params;

  const selectQuery = `
    SELECT *
    FROM Degree
    WHERE studentId = ?
  `;

  connection.query(selectQuery, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching degrees:", err);
      return res.status(500).json({ error: "An error occurred while fetching the degrees." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No degrees found for this student." });
    }

    res.status(200).json({ degrees: results });
  });
});

module.exports = router;
