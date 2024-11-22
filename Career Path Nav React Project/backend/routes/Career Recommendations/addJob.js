const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
  const {
    studentId,
    jobTitle,
    company,
    locationJob,
    salaryRange,
    employmentType,
    jobDescription,
    educationLevelRequired,
    requiredSkills,
    status,
  } = req.body;

  try {
    const pool = await sql.connect();

    // Check if the job already exists for the student
    const checkQuery = `
      SELECT COUNT(*) AS count FROM Jobs
      WHERE studentId = @studentId AND jobTitle = @jobTitle AND company = @company
    `;
    const checkResult = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("jobTitle", sql.VarChar(255), jobTitle)
      .input("company", sql.VarChar(255), company)
      .query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ error: "Job entry already exists for this student." });
    }

    // Insert the job data
    const insertQuery = `
      INSERT INTO Jobs (studentId, jobTitle, company, locationJob, salaryRange, employmentType, 
                        jobDescription, educationLevelRequired, requiredSkills, status)
      VALUES (@studentId, @jobTitle, @company, @locationJob, @salaryRange, @employmentType, 
              @jobDescription, @educationLevelRequired, @requiredSkills, @status)
    `;

    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("jobTitle", sql.VarChar(255), jobTitle)
      .input("company", sql.VarChar(255), company)
      .input("locationJob", sql.VarChar(255), locationJob)
      .input("salaryRange", sql.VarChar(255), salaryRange)
      .input("employmentType", sql.VarChar(255), employmentType)
      .input("jobDescription", sql.VarChar(sql.MAX), jobDescription)
      .input("educationLevelRequired", sql.VarChar(255), educationLevelRequired)
      .input("requiredSkills", sql.VarChar(255), requiredSkills)
      .input("status", sql.VarChar(255), status)
      .query(insertQuery);

    res.status(201).json({ message: "Job details successfully added." });
  } catch (error) {
    console.error("Error inserting job:", error);
    res.status(500).json({ error: "An error occurred while adding the job details." });
  }
});

module.exports = router;
