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

    const query = `
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
