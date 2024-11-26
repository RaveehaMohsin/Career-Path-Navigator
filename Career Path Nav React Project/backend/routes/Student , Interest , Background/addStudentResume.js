const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
  const {
    studentId,
    resumeObjective,
    technicalSkills,
    linkedInProfile,
    githubProfile,
    reference,
    achievements,
    projects,
  } = req.body;

  try {
    const pool = await sql.connect();

    // Check if the student already exists in the table
    const checkQuery = `
      USE CareerPathNavigator;
      SELECT COUNT(*) AS count FROM Student WHERE studentId = @studentId
    `;
    const checkResult = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      // Update the existing record
      const updateQuery = `
        USE CareerPathNavigator;
        UPDATE Student
        SET 
          resumeObjective = @resumeObjective,
          technicalSkills = @technicalSkills,
          linkedInProfile = @linkedInProfile,
          githubProfile = @githubProfile,
          reference = @reference,
          achievmentscertifications = @achievements,
          projects = @projects
        WHERE studentId = @studentId
      `;

      await pool
        .request()
        .input("studentId", sql.Int, studentId)
        .input("resumeObjective", sql.Text, resumeObjective)
        .input("technicalSkills", sql.VarChar(sql.MAX), technicalSkills)
        .input("linkedInProfile", sql.VarChar(100), linkedInProfile)
        .input("githubProfile", sql.VarChar(100), githubProfile)
        .input("reference", sql.VarChar(sql.MAX), reference)
        .input("achievements", sql.Text, achievements)
        .input("projects", sql.Text, projects)
        .query(updateQuery);

      return res.status(200).json({ message: "Resume details successfully updated." });
    } else {
      // Insert a new record
      const insertQuery = `
        USE CareerPathNavigator;
        INSERT INTO Student (studentId, resumeObjective, technicalSkills, linkedInProfile, githubProfile, 
                             reference, achievmentscertifications, projects)
        VALUES (@studentId, @resumeObjective, @technicalSkills, @linkedInProfile, @githubProfile, 
                @reference, @achievements, @projects)
      `;

      await pool
        .request()
        .input("studentId", sql.Int, studentId)
        .input("resumeObjective", sql.Text, resumeObjective)
        .input("technicalSkills", sql.VarChar(sql.MAX), technicalSkills)
        .input("linkedInProfile", sql.VarChar(100), linkedInProfile)
        .input("githubProfile", sql.VarChar(100), githubProfile)
        .input("reference", sql.VarChar(sql.MAX), reference)
        .input("achievements", sql.Text, achievements)
        .input("projects", sql.Text, projects)
        .query(insertQuery);

      return res.status(201).json({ message: "Resume details successfully added." });
    }
  } catch (error) {
    console.error("Error handling resume data:", error);
    res.status(500).json({ error: "An error occurred while processing the resume details." });
  }
});

module.exports = router;
