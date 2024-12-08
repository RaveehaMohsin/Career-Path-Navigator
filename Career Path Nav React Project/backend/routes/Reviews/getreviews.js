const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming connection is already made

router.get("/", async (req, res) => {
  try {
    // SQL query to select feedback
    const query = `
      SELECT 
        FeedbackId,
        fromUserId,
        toUserId,
        rating,
        comments,
        submissionDate,
        recommendtoothers,
        experience
      FROM Feedback
    `;

    // Execute the query using the existing MySQL connection
    connection.query(query, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "No feedback found" });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
