const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming connection is already made

router.post("/", async (req, res) => {
  const { studentid, institutename, degreelevel, degreetitle, totalmarks, obtainedmarks } = req.body;

  // Validate input fields
  if (!studentid || !institutename || !degreetitle || !totalmarks || !obtainedmarks) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // SQL query to check if the student has already entered the same degree details
    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM Background
      WHERE studentId = ? 
        AND instituteName = ? 
        AND degreeTitle = ? 
        AND degreeLevel = ?
    `;

    // Execute the check query using the MySQL connection
    connection.query(checkQuery, [studentid, institutename, degreetitle, degreelevel], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result[0].count > 0) {
        // If the degree entry already exists, return an error
        return res.status(400).json({ error: "This degree entry already exists for the student." });
      }

      // SQL query to insert data into the Background table
      const insertQuery = `
        INSERT INTO Background (studentId, instituteName, degreeTitle, degreeLevel, TotalMarks, ObtainedMarks)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      // Execute the insert query using the MySQL connection
      connection.query(insertQuery, [studentid, institutename, degreetitle, degreelevel, totalmarks, obtainedmarks], (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Failed to insert record into Background table" });
        }

        if (result.affectedRows > 0) {
          res.status(201).json({ message: "Record added successfully to Background table" });
        } else {
          res.status(500).json({ error: "Failed to insert record into Background table" });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
