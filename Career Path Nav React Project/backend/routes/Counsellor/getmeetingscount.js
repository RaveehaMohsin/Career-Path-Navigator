const express = require("express");
const connection = require("../../database/mysql"); // Assuming your MySQL connection is set up here
const router = express.Router();

router.get("/", async (req, res) => {
  const { year, month, counsellorId } = req.query;

  // Validate input
  if (!year || !month) {
    return res.status(400).json({ error: "Year and month are required" });
  }

  try {
    // Start building the query
    let query = `
      SELECT 
        DATE_FORMAT(MeetingDate, '%Y-%m-%d') AS MeetingDate, 
        COUNT(*) AS MeetingCount
      FROM 
        Meeting
      WHERE 
        YEAR(MeetingDate) = ? AND MONTH(MeetingDate) = ?
    `;

    // If counsellorId is provided, add it to the WHERE clause
    const queryParams = [year, month];
    if (counsellorId) {
      query += " AND counsellorId = ?";
      queryParams.push(counsellorId);
    }

    query += `
      GROUP BY 
        DATE_FORMAT(MeetingDate, '%Y-%m-%d')
    `;

    // Execute the query using the mysql connection
    connection.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error fetching meeting counts:", err);
        return res.status(500).json({ error: "An error occurred while fetching meeting counts" });
      }

      // Transform results into an object
      const counts = {};
      results.forEach((row) => {
        counts[row.MeetingDate] = row.MeetingCount;
      });

      res.json({ counts });
    });

  } catch (error) {
    console.error("Error fetching meeting counts:", error);
    res.status(500).json({ error: "An error occurred while fetching meeting counts" });
  }
});

module.exports = router;
