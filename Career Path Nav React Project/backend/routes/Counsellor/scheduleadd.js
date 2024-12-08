const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql");

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
    // Check if the counsellor's schedule already exists in the table
    const checkQuery = `
      SELECT COUNT(*) AS count FROM Counsellor WHERE counsellorId = ?
    `;
    
    connection.query(checkQuery, [counsellorId], (err, result) => {
      if (err) {
        console.error("Error checking counsellor data:", err);
        return res.status(500).json({ error: "An error occurred while checking the counsellor." });
      }

      if (result[0].count > 0) {
        // Update the existing schedule
        const updateQuery = `
          UPDATE Counsellor
          SET 
            expertise = ?, 
            qualifications = ?, 
            hourlyRate = ?, 
            noOfDaysAvailable = ?, 
            availableDays = ?, 
            timeSlots = ?
          WHERE counsellorId = ?
        `;

        connection.query(updateQuery, [
          expertise,
          qualifications,
          hourlyRate,
          daysAvailable,
          selectedDays.join(","),
          `${timeSlots.start}-${timeSlots.end}`,
          counsellorId,
        ], (err, result) => {
          if (err) {
            console.error("Error updating counsellor schedule:", err);
            return res.status(500).json({ error: "An error occurred while updating the schedule." });
          }

          return res.status(200).json({ message: "Schedule updated successfully." });
        });
      } else {
        // Insert a new schedule
        const insertQuery = `
          INSERT INTO Counsellor (counsellorId, expertise, qualifications, hourlyRate, noOfDaysAvailable, availableDays, timeSlots)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(insertQuery, [
          counsellorId,
          expertise,
          qualifications,
          hourlyRate,
          daysAvailable,
          selectedDays.join(","),
          `${timeSlots.start}-${timeSlots.end}`,
        ], (err, result) => {
          if (err) {
            console.error("Error inserting new counsellor schedule:", err);
            return res.status(500).json({ error: "An error occurred while adding the schedule." });
          }

          return res.status(201).json({ message: "Schedule added successfully." });
        });
      }
    });
  } catch (error) {
    console.error("Error handling schedule data:", error);
    res.status(500).json({ error: "An error occurred while processing the schedule." });
  }
});

module.exports = router;
