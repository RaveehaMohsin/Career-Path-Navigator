const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get("/:counsellorId", async (req, res) => {
  const { counsellorId } = req.params;

  try {
    const pool = await sql.connect();

    const query = `
      USE CareerPathNavigator;
      SELECT counsellorId, expertise, qualifications, hourlyRate, noOfDaysAvailable AS daysAvailable, availableDays AS selectedDays, timeSlots
      FROM Counsellor
      WHERE counsellorId = @counsellorId
    `;

    const result = await pool
      .request()
      .input("counsellorId", sql.Int, counsellorId)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Counselor not found." });
    }

    const counselorData = result.recordset[0];
    counselorData.selectedDays = counselorData.selectedDays
      ? counselorData.selectedDays.split(",")
      : [];
    counselorData.timeSlots = counselorData.timeSlots
      ? { start: counselorData.timeSlots.split("-")[0], end: counselorData.timeSlots.split("-")[1] }
      : { start: "", end: "" };

    res.status(200).json(counselorData);
  } catch (error) {
    console.error("Error fetching counselor data:", error);
    res.status(500).json({ error: "An error occurred while fetching the counselor data." });
  }
});

module.exports = router;
