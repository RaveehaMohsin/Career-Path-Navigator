const express = require("express");
const sql = require("mssql");
const router = express.Router();

router.get("/", async (req, res) => {
  const { year, month, counsellorId } = req.query;

  // Validate input
  if (!year || !month) {
    return res.status(400).json({ error: "Year and month are required" });
  }

  try {
    const pool = await sql.connect();

    // Start building the query
    let query = `
      SELECT 
        CONVERT(varchar, MeetingDate, 23) AS MeetingDate, 
        COUNT(*) AS MeetingCount
      FROM 
        Meeting
      WHERE 
        YEAR(MeetingDate) = @Year AND MONTH(MeetingDate) = @Month
    `;

    // If counsellorId is provided, add it to the WHERE clause
    if (counsellorId) {
      query += " AND counsellorId = @CounsellorId";
    }

    query += `
      GROUP BY 
        CONVERT(varchar, MeetingDate, 23)
    `;

    // Execute the query
    const result = await pool
      .request()
      .input("Year", sql.Int, year)
      .input("Month", sql.Int, month);

    // Add counsellorId parameter if it was passed
    if (counsellorId) {
      result.input("CounsellorId", sql.Int, counsellorId);
    }

    const queryResult = await result.query(query);

    // Transform results into an object
    const counts = {};
    queryResult.recordset.forEach((row) => {
      counts[row.MeetingDate] = row.MeetingCount;
    });

    res.json({ counts });
  } catch (error) {
    console.error("Error fetching meeting counts:", error);
    res.status(500).json({ error: "An error occurred while fetching meeting counts" });
  }
});

module.exports = router;
