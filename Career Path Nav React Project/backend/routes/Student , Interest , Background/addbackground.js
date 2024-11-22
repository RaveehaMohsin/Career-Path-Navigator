const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
  const { studentid, institutename, degreetitle, totalmarks, obtainedmarks } = req.body;

  // Validate input fields
  if (!studentid || !institutename || !degreetitle || !totalmarks || !obtainedmarks) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Connect to the database
    const pool = await sql.connect();

    // SQL query to insert data into the Background table
    const query = `
      INSERT INTO Background (studentId, instituteName, degreeTitle, TotalMarks, ObtainedMarks)
      VALUES (@studentId, @instituteName, @degreeTitle, @totalMarks, @obtainedMarks)
    `;

    // Execute the query with parameterized inputs to prevent SQL injection
    const result = await pool
      .request()
      .input("studentId", sql.Int, studentid)
      .input("instituteName", sql.VarChar(100), institutename)
      .input("degreeTitle", sql.VarChar(100), degreetitle)
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
