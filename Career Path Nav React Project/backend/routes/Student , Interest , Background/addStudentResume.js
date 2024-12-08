const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming connection is already made

router.post("/", async (req, res) => {
  const {
    studentId,
    resumeObjective,
    technicalSkills,
    linkedInProfile,
    githubProfile,
    reference,
    achievements,
    projects,
  } = req.body;

  try {
    // Check if the student already exists in the table
    const checkQuery = `
      SELECT COUNT(*) AS count FROM Student WHERE studentId = ?
    `;

    // Execute the check query using MySQL connection
    connection.query(checkQuery, [studentId], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result[0].count > 0) {
        // Update the existing record
        const updateQuery = `
          UPDATE Student
          SET 
            resumeObjective = ?, 
            technicalSkills = ?, 
            linkedInProfile = ?, 
            githubProfile = ?, 
            reference = ?, 
            achievmentscertifications = ?, 
            projects = ?
          WHERE studentId = ?
        `;

        // Execute the update query
        connection.query(
          updateQuery,
          [
            resumeObjective,
            technicalSkills,
            linkedInProfile,
            githubProfile,
            reference,
            achievements,
            projects,
            studentId,
          ],
          (err, result) => {
            if (err) {
              console.error("Database error:", err);
              return res.status(500).json({ error: "An error occurred while updating the resume details." });
            }

            return res.status(200).json({ message: "Resume details successfully updated." });
          }
        );
      } else {
        // Insert a new record
        const insertQuery = `
          INSERT INTO Student (studentId, resumeObjective, technicalSkills, linkedInProfile, githubProfile, 
                               reference, achievmentscertifications, projects)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Execute the insert query
        connection.query(
          insertQuery,
          [
            studentId,
            resumeObjective,
            technicalSkills,
            linkedInProfile,
            githubProfile,
            reference,
            achievements,
            projects,
          ],
          (err, result) => {
            if (err) {
              console.error("Database error:", err);
              return res.status(500).json({ error: "An error occurred while adding the resume details." });
            }

            return res.status(201).json({ message: "Resume details successfully added." });
          }
        );
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "An error occurred while processing the resume details." });
  }
});

module.exports = router;
