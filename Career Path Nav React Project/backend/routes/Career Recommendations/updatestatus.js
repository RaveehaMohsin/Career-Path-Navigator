const express = require("express");
const router = express.Router();
const sql = require("mssql");


router.put("/update-status-job/:jobId", async (req, res) => {
  const { jobId } = req.params;  // Get jobId from the route parameter
  const { status } = req.body;   // Get status from the request body

  try {
    const pool = await sql.connect();  // Connect to the database

    // Update the status of the job entry
    const updateQuery = `
      UPDATE Jobs
      SET status = @status
      WHERE jobId = @jobId
    `;

    const result = await pool
      .request()
      .input("jobId", sql.Int, jobId)  // Pass jobId to the query
      .input("status", sql.VarChar(255), status)  // Pass new status to the query
      .query(updateQuery);

    if (result.rowsAffected > 0) {
      // If the update was successful, return a success message
      res.status(200).json({ message: "Job status updated successfully." });
    } else {
      // If no rows were updated, it means the jobId was not found
      res.status(404).json({ message: "Job not found." });
    }
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ error: "An error occurred while updating the job status." });
  }
});

router.put("/update-status-course/:courseId", async (req, res) => {
  const { courseId } = req.params; // Get courseId from the route parameter
  const { status } = req.body; // Get status from the request body

  try {
    const pool = await sql.connect(); // Connect to the database

    // Update the status of the course entry
    const updateQuery = `
      UPDATE Course
      SET status = @status
      WHERE courseId = @courseId
    `;

    const result = await pool
      .request()
      .input("courseId", sql.Int, courseId) // Pass courseId to the query
      .input("status", sql.VarChar(255), status) // Pass new status to the query
      .query(updateQuery);

    if (result.rowsAffected > 0) {
      // If the update was successful, return a success message
      res.status(200).json({ message: "Course status updated successfully." });
    } else {
      // If no rows were updated, it means the courseId was not found
      res.status(404).json({ message: "Course not found." });
    }
  } catch (error) {
    console.error("Error updating course status:", error);
    res.status(500).json({ error: "An error occurred while updating the course status." });
  }
});

router.put("/update-status-degree/:degreeId", async (req, res) => {
  const { degreeId } = req.params; // Get degreeId from the route parameter
  const { status } = req.body; // Get status from the request body

  try {
    const pool = await sql.connect(); // Connect to the database

    // Update the status of the degree entry
    const updateQuery = `
      UPDATE Degree
      SET status = @status
      WHERE degreeId = @degreeId
    `;

    const result = await pool
      .request()
      .input("degreeId", sql.Int, degreeId) // Pass degreeId to the query
      .input("status", sql.VarChar(255), status) // Pass new status to the query
      .query(updateQuery);

    if (result.rowsAffected > 0) {
      // If the update was successful, return a success message
      res.status(200).json({ message: "Degree status updated successfully." });
    } else {
      // If no rows were updated, it means the degreeId was not found
      res.status(404).json({ message: "Degree not found." });
    }
  } catch (error) {
    console.error("Error updating degree status:", error);
    res.status(500).json({ error: "An error occurred while updating the degree status." });
  }
});


module.exports = router;
