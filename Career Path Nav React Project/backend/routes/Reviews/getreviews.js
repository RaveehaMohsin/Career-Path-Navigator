const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get("/", async (req, res) => {
    try {
      const pool = await sql.connect();
  
      const query = `
        USE CareerPathNavigator;
        SELECT 
          f.FeedbackId,
          f.fromUserId,
          f.toUserId,
          f.rating,
          f.comments,
          f.submissionDate,
          f.recommendtoothers,
          f.experience 
         FROM Feedback f
      `;
  
      const result = await pool.request().query(query);
  
      if (result.recordset.length > 0) {
        res.status(200).json(result.recordset);
      } else {
        res.status(404).json({ message: "No feedback found" });
      }
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  module.exports = router;