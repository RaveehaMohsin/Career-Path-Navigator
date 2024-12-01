const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get("/admin", async (req, res) => {
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
        f.experience,
        fromUser.firstName AS fromFirstName,
        fromUser.lastName AS fromLastName,
        toUser.firstName AS toFirstName,
        toUser.lastName AS toLastName
      FROM Feedback f
      JOIN Users fromUser ON f.fromUserId = fromUser.userId
      JOIN Users toUser ON f.toUserId = toUser.userId
      WHERE f.toUserId = 2; 
    `;

    const result = await pool.request().query(query);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "No feedback found for admin" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get feedback from students to counselors
router.get("/students-to-counselors", async (req, res) => {
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
        f.experience,
        fromUser.firstName AS fromFirstName,
        fromUser.lastName AS fromLastName,
        toUser.firstName AS toFirstName,
        toUser.lastName AS toLastName
      FROM Feedback f
      JOIN Users fromUser ON f.fromUserId = fromUser.userId
      JOIN Users toUser ON f.toUserId = toUser.userId
      WHERE fromUser.role = 'Student' 
        AND toUser.role = 'Counsellor';
    `;

    const result = await pool.request().query(query);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "No feedback found from students to counselors" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/counselors-to-students", async (req, res) => {
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
        f.experience,
        fromUser.firstName AS fromFirstName,
        fromUser.lastName AS fromLastName,
        toUser.firstName AS toFirstName,
        toUser.lastName AS toLastName
      FROM Feedback f
      JOIN Users fromUser ON f.fromUserId = fromUser.userId
      JOIN Users toUser ON f.toUserId = toUser.userId
      WHERE fromUser.role = 'Counsellor' 
        AND toUser.role = 'Student';
    `;

    const result = await pool.request().query(query);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "No feedback found from counselors to students" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
