const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
  const {
    studentId,
    degreeTitle,
    institution,
    locationInstitute,
    duration,
    modeOfStudy,
    curriculumOverview,
    careerOpportunities,
    salaryProspects,
    status,
  } = req.body;

  try {
    const pool = await sql.connect();

    // Check if the degree already exists for the student
    const checkQuery = `
      SELECT COUNT(*) AS count FROM Degree
      WHERE studentId = @studentId AND degreeTitle = @degreeTitle AND instituition = @institution
    `;
    const checkResult = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("degreeTitle", sql.VarChar(255), degreeTitle)
      .input("institution", sql.VarChar(255), institution)
      .query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ error: "Degree entry already exists for this student." });
    }

    const insertQuery = `
      INSERT INTO Degree (studentId, degreeTitle, instituition, locationInstitute, duration, 
                          modeofStudy, curriculumOverview, careerOpportunities, salaryProspects, status)
      VALUES (@studentId, @degreeTitle, @institution, @locationInstitute, @duration, 
              @modeOfStudy, @curriculumOverview, @careerOpportunities, @salaryProspects, @status)
    `;

    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("degreeTitle", sql.VarChar(255), degreeTitle)
      .input("institution", sql.VarChar(255), institution)
      .input("locationInstitute", sql.VarChar(255), locationInstitute)
      .input("duration", sql.VarChar(255), duration)
      .input("modeOfStudy", sql.VarChar(255), modeOfStudy)
      .input("curriculumOverview", sql.VarChar(sql.MAX), curriculumOverview)
      .input("careerOpportunities", sql.VarChar(sql.MAX), careerOpportunities)
      .input("salaryProspects", sql.VarChar(sql.MAX), salaryProspects)
      .input("status", sql.VarChar(255), status)
      .query(insertQuery);

    res.status(201).json({ message: "Degree details successfully added." });
  } catch (error) {
    console.error("Error inserting degree:", error);
    res.status(500).json({ error: "An error occurred while adding the degree details." });
  }
});

module.exports = router;
