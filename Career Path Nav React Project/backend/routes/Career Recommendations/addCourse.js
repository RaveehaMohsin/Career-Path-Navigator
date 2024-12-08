const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming your MySQL connection is exported from this file

router.post("/", async (req, res) => {
  const {
    studentId,
    courseTitle,
    providerSource,
    durationCourse,
    courseLevel,
    prerequisites,
    skillsCovered,
    courseFees,
    certification,
    status,
  } = req.body;

  // Check for required fields
  if (!studentId || !courseTitle || !providerSource) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  try {
    // Check if the course already exists for the student
    const checkQuery = `
      SELECT COUNT(*) AS count FROM Course
      WHERE studentId = ? AND courseTitle = ? AND providerSource = ?
    `;

    connection.query(
      checkQuery,
      [studentId, courseTitle, providerSource],
      (err, checkResults) => {
        if (err) {
          console.error("Error checking course existence:", err);
          return res.status(500).json({ error: "Database error during check." });
        }

        if (checkResults[0].count > 0) {
          return res
            .status(400)
            .json({ error: "Course entry already exists for this student." });
        }

        // Insert the course data
        const insertQuery = `
          INSERT INTO Course (
            studentId, courseTitle, providerSource, durationCourse, 
            courseLevel, prerequisites, skillsCovered, courseFees, 
            certification, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(
          insertQuery,
          [
            studentId,
            courseTitle,
            providerSource,
            durationCourse,
            courseLevel,
            prerequisites,
            skillsCovered,
            courseFees,
            certification,
            status,
          ],
          (err, insertResults) => {
            if (err) {
              console.error("Error inserting course:", err);
              return res
                .status(500)
                .json({ error: "Database error during insertion." });
            }

            res
              .status(201)
              .json({ message: "Course details successfully added." });
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
