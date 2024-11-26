const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
  const { studentid, interesttype, interestcreation } = req.body;
  
  if (!studentid || !interesttype || !interestcreation) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const pool = await sql.connect();

    // Check if the interest category already exists for the given student ID
    const checkQuery = `
     USE CareerPathNavigator;
      SELECT COUNT(*) AS count
      FROM Interest
      WHERE studentId = @studentId AND category = @category
    `;
    
    const checkResult = await pool
      .request()
      .input("studentId", sql.Int, studentid)
      .input("category", sql.VarChar(50), interesttype)
      .query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ error: "Interest category already added" });
    }

    // Insert the new interest
    const query = `
      USE CareerPathNavigator;
      INSERT INTO Interest (studentId, category, created_at)
      VALUES (@studentId, @category, @created_at)
    `;

    const result = await pool
      .request()
      .input("studentId", sql.Int, studentid)
      .input("category", sql.VarChar(50), interesttype)
      .input("created_at", sql.Date, interestcreation)
      .query(query);

    if (result.rowsAffected[0] > 0) {
      res.status(201).json({ message: "Interest added successfully" });
    } else {
      res.status(500).json({ error: "Failed to add interest" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
