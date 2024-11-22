const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
  const {
    studentId,
    courseTitle,
    providerSource,
    durationCourse,
    courseLevel,
    prerequisites,
    skillsCovered,
    courseFees,
    certification,
    status,
  } = req.body;

  try {
    const pool = await sql.connect();

    // Check if the course already exists for the student
    const checkQuery = `
      SELECT COUNT(*) AS count FROM Course
      WHERE studentId = @studentId AND courseTitle = @courseTitle AND providerSource = @providerSource
    `;
    const checkResult = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("courseTitle", sql.VarChar(255), courseTitle)
      .input("providerSource", sql.VarChar(255), providerSource)
      .query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ error: "Course entry already exists for this student." });
    }

    // Insert the course data
    const insertQuery = `
      INSERT INTO Course (studentId, courseTitle, providerSource, durationCourse, courseLevel, 
                          prerequisites, skillsCovered, courseFees, certification, status)
      VALUES (@studentId, @courseTitle, @providerSource, @durationCourse, @courseLevel, 
              @prerequisites, @skillsCovered, @courseFees, @certification, @status)
    `;

    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("courseTitle", sql.VarChar(255), courseTitle)
      .input("providerSource", sql.VarChar(255), providerSource)
      .input("durationCourse", sql.VarChar(255), durationCourse)
      .input("courseLevel", sql.VarChar(255), courseLevel)
      .input("prerequisites", sql.VarChar(sql.MAX), prerequisites)
      .input("skillsCovered", sql.VarChar(sql.MAX), skillsCovered)
      .input("courseFees", sql.VarChar(255), courseFees)
      .input("certification", sql.VarChar(255), certification)
      .input("status", sql.VarChar(255), status)
      .query(insertQuery);

    res.status(201).json({ message: "Course details successfully added." });
  } catch (error) {
    console.error("Error inserting course:", error);
    res.status(500).json({ error: "An error occurred while adding the course details." });
  }
});

module.exports = router;
