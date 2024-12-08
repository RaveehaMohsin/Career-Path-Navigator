const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming your MySQL connection is exported from this file

router.post("/", async (req, res) => {
  const {
    studentId,
    jobTitle,
    company,
    locationJob,
    salaryRange,
    employmentType,
    jobDescription,
    educationLevelRequired,
    requiredSkills,
    status,
  } = req.body;

  // Check for required fields
  if (!studentId || !jobTitle || !company) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  try {
    // Check if the job already exists for the student
    const checkQuery = `
      SELECT COUNT(*) AS count FROM Jobs
      WHERE studentId = ? AND jobTitle = ? AND company = ?
    `;

    connection.query(
      checkQuery,
      [studentId, jobTitle, company],
      (err, checkResults) => {
        if (err) {
          console.error("Error checking job existence:", err);
          return res.status(500).json({ error: "Database error during check." });
        }

        if (checkResults[0].count > 0) {
          return res
            .status(400)
            .json({ error: "Job entry already exists for this student." });
        }

        // Insert the job data
        const insertQuery = `
          INSERT INTO Jobs (
            studentId, jobTitle, company, locationJob, salaryRange, employmentType, 
            jobDescription, educationLevelRequired, requiredSkills, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(
          insertQuery,
          [
            studentId,
            jobTitle,
            company,
            locationJob,
            salaryRange,
            employmentType,
            jobDescription,
            educationLevelRequired,
            requiredSkills,
            status,
          ],
          (err, insertResults) => {
            if (err) {
              console.error("Error inserting job:", err);
              return res
                .status(500)
                .json({ error: "Database error during insertion." });
            }

            res
              .status(201)
              .json({ message: "Job details successfully added." });
          }
        );
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

module.exports = router;
