const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
  const { studentid, institutename, degreelevel, degreetitle, totalmarks, obtainedmarks } = req.body;

  // Validate input fields
  if (!studentid || !institutename || !degreetitle || !totalmarks || !obtainedmarks) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Connect to the database
    const pool = await sql.connect();

    // Query to check if the student has already entered the same degree details
    const checkQuery = `
     USE CareerPathNavigator;
      SELECT COUNT(*) AS count
      FROM Background
      WHERE studentId = @studentId
      AND instituteName = @instituteName
      AND degreeTitle = @degreeTitle
      AND degreeLevel = @degreeLevel
    `;

    const checkResult = await pool
      .request()
      .input("studentId", sql.Int, studentid)
      .input("instituteName", sql.VarChar(100), institutename)
      .input("degreeTitle", sql.VarChar(100), degreetitle)
      .input("degreeLevel", sql.VarChar(100), degreelevel)
      .query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      // If the degree entry already exists, return an error
      return res.status(400).json({ error: "This degree entry already exists for the student." });
    }

    // SQL query to insert data into the Background table
    const query = `
      USE CareerPathNavigator;
      INSERT INTO Background (studentId, instituteName, degreeTitle, degreeLevel, TotalMarks, ObtainedMarks)
      VALUES (@studentId, @instituteName, @degreeTitle, @degreeLevel, @totalMarks, @obtainedMarks)
    `;

    // Execute the query with parameterized inputs to prevent SQL injection
    const result = await pool
      .request()
      .input("studentId", sql.Int, studentid)
      .input("instituteName", sql.VarChar(100), institutename)
      .input("degreeTitle", sql.VarChar(100), degreetitle)
      .input("degreeLevel", sql.VarChar(100), degreelevel)
      .input("totalMarks", sql.Float, totalmarks)
      .input("obtainedMarks", sql.Float, obtainedmarks)
      .query(query);

    // Check if the insertion was successful
    if (result.rowsAffected[0] > 0) {
      res.status(201).json({ message: "Record added successfully to Background table" });
    } else {
      res.status(500).json({ error: "Failed to insert record into Background table" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
