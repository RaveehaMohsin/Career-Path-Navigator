const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
  const { rating, comments, recommend, experience, submissionDate, fromUserId, toUserId } = req.body;

  if ( !fromUserId || !toUserId || !experience || !submissionDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const pool = await sql.connect();

    // Insert the new feedback
    const query = `
      USE CareerPathNavigator;
      INSERT INTO Feedback (fromUserId, toUserId, rating, comments, submissionDate, recommendtoothers, experience)
      VALUES (@fromUserId, @toUserId, @rating, @comments, @submissionDate, @recommendtoothers, @experience)
    `;

    const result = await pool
      .request()
      .input("fromUserId", sql.Int, fromUserId)
      .input("toUserId", sql.Int, toUserId)
      .input("rating", sql.Int, rating)
      .input("comments", sql.Text, comments)
      .input("submissionDate", sql.DateTime, submissionDate)
      .input("recommendtoothers", sql.Bit, recommend)
      .input("experience", sql.VarChar(50), experience)
      .query(query);

    if (result.rowsAffected[0] > 0) {
      res.status(201).json({ message: "Feedback added successfully" });
    } else {
      res.status(500).json({ error: "Failed to add feedback" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
