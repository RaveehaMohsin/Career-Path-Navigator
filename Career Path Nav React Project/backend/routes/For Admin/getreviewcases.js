const express = require("express");
const router = express.Router();
const connection = require('../../database/mysql');

// Route for fetching admin feedback
router.get("/admin", (req, res) => {
  const query = `
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

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "No feedback found for admin" });
    }
  });
});

// Route to get feedback from students to counselors
router.get("/students-to-counselors", (req, res) => {
  const query = `
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

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "No feedback found from students to counselors" });
    }
  });
});

// Route to get feedback from counselors to students
router.get("/counselors-to-students", (req, res) => {
  const query = `
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

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "No feedback found from counselors to students" });
    }
  });
});

module.exports = router;
