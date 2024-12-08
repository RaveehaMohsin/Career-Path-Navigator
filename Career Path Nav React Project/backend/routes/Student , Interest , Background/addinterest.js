const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming connection is already made

router.post("/", async (req, res) => {
  const { studentid, interesttype, interestcreation } = req.body;

  // Validate required fields
  if (!studentid || !interesttype || !interestcreation) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // SQL query to check if the interest category already exists for the given student ID
    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM Interest
      WHERE studentId = ? AND category = ?
    `;

    // Execute the check query using MySQL connection
    connection.query(checkQuery, [studentid, interesttype], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result[0].count > 0) {
        // If the interest category already exists, return an error
        return res.status(400).json({ error: "Interest category already added" });
      }

      // SQL query to insert the new interest into the Interest table
      const insertQuery = `
        INSERT INTO Interest (studentId, category, created_at)
        VALUES (?, ?, ?)
      `;

      // Execute the insert query using the MySQL connection
      connection.query(insertQuery, [studentid, interesttype, interestcreation], (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Failed to add interest" });
        }

        if (result.affectedRows > 0) {
          res.status(201).json({ message: "Interest added successfully" });
        } else {
          res.status(500).json({ error: "Failed to add interest" });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
