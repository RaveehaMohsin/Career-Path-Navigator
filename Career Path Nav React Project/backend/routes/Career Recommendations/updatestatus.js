const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming your MySQL connection is exported from this file

// Update job status by jobId
router.put("/update-status-job/:jobId", (req, res) => {
  const { jobId } = req.params;  // Get jobId from the route parameter
  const { status } = req.body;   // Get status from the request body

  const updateQuery = `
    UPDATE Jobs
    SET status = ?
    WHERE jobId = ?
  `;

  connection.query(updateQuery, [status, jobId], (err, results) => {
    if (err) {
      console.error("Error updating job status:", err);
      return res.status(500).json({ error: "An error occurred while updating the job status." });
    }

    if (results.affectedRows > 0) {
      // If the update was successful, return a success message
      res.status(200).json({ message: "Job status updated successfully." });
    } else {
      // If no rows were updated, it means the jobId was not found
      res.status(404).json({ message: "Job not found." });
    }
  });
});

// Update course status by courseId
router.put("/update-status-course/:courseId", (req, res) => {
  const { courseId } = req.params; // Get courseId from the route parameter
  const { status } = req.body;     // Get status from the request body

  const updateQuery = `
    UPDATE Course
    SET status = ?
    WHERE courseId = ?
  `;

  connection.query(updateQuery, [status, courseId], (err, results) => {
    if (err) {
      console.error("Error updating course status:", err);
      return res.status(500).json({ error: "An error occurred while updating the course status." });
    }

    if (results.affectedRows > 0) {
      // If the update was successful, return a success message
      res.status(200).json({ message: "Course status updated successfully." });
    } else {
      // If no rows were updated, it means the courseId was not found
      res.status(404).json({ message: "Course not found." });
    }
  });
});

// Update degree status by degreeId
router.put("/update-status-degree/:degreeId", (req, res) => {
  const { degreeId } = req.params; // Get degreeId from the route parameter
  const { status } = req.body;     // Get status from the request body

  const updateQuery = `
    UPDATE Degree
    SET status = ?
    WHERE degreeId = ?
  `;

  connection.query(updateQuery, [status, degreeId], (err, results) => {
    if (err) {
      console.error("Error updating degree status:", err);
      return res.status(500).json({ error: "An error occurred while updating the degree status." });
    }

    if (results.affectedRows > 0) {
      // If the update was successful, return a success message
      res.status(200).json({ message: "Degree status updated successfully." });
    } else {
      // If no rows were updated, it means the degreeId was not found
      res.status(404).json({ message: "Degree not found." });
    }
  });
});

module.exports = router;
