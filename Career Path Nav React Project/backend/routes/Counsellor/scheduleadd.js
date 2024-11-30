const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
  const {
    counsellorId,
    expertise,
    qualifications,
    hourlyRate,
    daysAvailable,
    selectedDays,
    timeSlots,
  } = req.body;

  try {
    const pool = await sql.connect();

    // Check if the counsellor's schedule already exists in the table
    const checkQuery = `
      USE CareerPathNavigator;
      SELECT COUNT(*) AS count FROM Counsellor WHERE counsellorId = @counsellorId
    `;
    const checkResult = await pool
      .request()
      .input("counsellorId", sql.Int, counsellorId)
      .query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      // Update the existing schedule
      const updateQuery = `
        USE CareerPathNavigator;
        UPDATE Counsellor
        SET 
          expertise = @expertise,
          qualifications = @qualifications,
          hourlyRate = @hourlyRate,
          noOfDaysAvailable = @daysAvailable,
          availableDays = @selectedDays,
          timeSlots = @timeSlots
        WHERE counsellorId = @counsellorId
      `;

      await pool
        .request()
        .input("counsellorId", sql.Int, counsellorId)
        .input("expertise", sql.VarChar(255), expertise)
        .input("qualifications", sql.Text, qualifications)
        .input("hourlyRate", sql.Decimal(10, 2), hourlyRate)
        .input("daysAvailable", sql.Int, daysAvailable)
        .input("selectedDays", sql.VarChar(sql.MAX), selectedDays.join(","))
        .input("timeSlots", sql.VarChar(50), `${timeSlots.start}-${timeSlots.end}`)
        .query(updateQuery);

      return res.status(200).json({ message: "Schedule updated successfully." });
    } else {
      // Insert a new schedule
      const insertQuery = `
        USE CareerPathNavigator;
        INSERT INTO Counsellor (counsellorId, expertise, qualifications, hourlyRate, noOfDaysAvailable, availableDays, timeSlots)
        VALUES (@counsellorId, @expertise, @qualifications, @hourlyRate, @daysAvailable, @selectedDays, @timeSlots)
      `;

      await pool
        .request()
        .input("counsellorId", sql.Int, counsellorId)
        .input("expertise", sql.VarChar(255), expertise)
        .input("qualifications", sql.Text, qualifications)
        .input("hourlyRate", sql.Decimal(10, 2), hourlyRate)
        .input("daysAvailable", sql.Int, daysAvailable)
        .input("selectedDays", sql.VarChar(sql.MAX), selectedDays.join(","))
        .input("timeSlots", sql.VarChar(50), `${timeSlots.start}-${timeSlots.end}`)
        .query(insertQuery);

      return res.status(201).json({ message: "Schedule added successfully." });
    }
  } catch (error) {
    console.error("Error handling schedule data:", error);
    res.status(500).json({ error: "An error occurred while processing the schedule." });
  }
});

module.exports = router;
