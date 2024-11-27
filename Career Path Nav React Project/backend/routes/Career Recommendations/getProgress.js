const express = require("express");
const router = express.Router();
const sql = require("mssql");

// Get all jobs for a specific student ID
router.get("/getjobs/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const pool = await sql.connect();

    // Query to select all jobs associated with the studentId
    const selectQuery = `
      SELECT jobId, jobTitle, company, locationJob, salaryRange, employmentType, 
             jobDescription, educationLevelRequired, requiredSkills, status
      FROM Jobs
      WHERE studentId = @studentId
    `;

    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .query(selectQuery);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "No jobs found for this student." });
    }

    res.status(200).json({ jobs: result.recordset });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "An error occurred while fetching the jobs." });
  }
});

// Get all courses for a specific student ID
router.get("/getcourses/:studentId", async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const pool = await sql.connect();
  
      // Query to select all courses associated with the studentId
      const selectQuery = `
        SELECT courseId, courseTitle, providerSource, durationCourse, courseLevel, 
               prerequisites, skillsCovered, courseFees, certification, status
        FROM Course
        WHERE studentId = @studentId
      `;
  
      const result = await pool
        .request()
        .input("studentId", sql.Int, studentId)
        .query(selectQuery);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No courses found for this student." });
      }
  
      res.status(200).json({ courses: result.recordset });
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "An error occurred while fetching the courses." });
    }
  });
  
// Get all degrees for a specific student ID
router.get("/getdegrees/:studentId", async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const pool = await sql.connect();
  
      // Query to select all degrees associated with the studentId
      const selectQuery = `
        SELECT *
        FROM Degree
        WHERE studentId = @studentId
      `;
  
      const result = await pool
        .request()
        .input("studentId", sql.Int, studentId)
        .query(selectQuery);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "No degrees found for this student." });
      }
  
      res.status(200).json({ degrees: result.recordset });
    } catch (error) {
      console.error("Error fetching degrees:", error);
      res.status(500).json({ error: "An error occurred while fetching the degrees." });
    }
  });
  

module.exports = router;




