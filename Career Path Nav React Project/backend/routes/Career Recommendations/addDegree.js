const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming the MySQL connection is exported from this file

router.post("/", async (req, res) => {
  const {
    studentId,
    degreeTitle,
    institution,
    locationInstitute,
    duration,
    modeOfStudy,
    curriculumOverview,
    careerOpportunities,
    salaryProspects,
    status,
  } = req.body;

  try {
    // Check if the degree already exists for the student
    const checkQuery = `
      SELECT COUNT(*) AS count FROM Degree
      WHERE studentId = ? AND degreeTitle = ? AND instituition = ?
    `;

    connection.query(checkQuery, [studentId, degreeTitle, institution], (err, results) => {
      if (err) {
        console.error("Error checking existing degree:", err);
        return res.status(500).json({ error: "An error occurred while checking the degree entry." });
      }

      if (results[0].count > 0) {
        return res.status(400).json({ error: "Degree entry already exists for this student." });
      }

      // If no duplicate, insert the new degree details
      const insertQuery = `
        INSERT INTO Degree (studentId, degreeTitle, instituition, locationInstitute, duration, 
                            modeOfStudy, curriculumOverview, careerOpportunities, salaryProspects, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      connection.query(
        insertQuery,
        [
          studentId,
          degreeTitle,
          institution,
          locationInstitute,
          duration,
          modeOfStudy,
          curriculumOverview,
          careerOpportunities,
          salaryProspects,
          status,
        ],
        (err, results) => {
          if (err) {
            console.error("Error inserting degree:", err);
            return res.status(500).json({ error: "An error occurred while adding the degree details." });
          }

          res.status(201).json({ message: "Degree details successfully added." });
        }
      );
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

module.exports = router;
