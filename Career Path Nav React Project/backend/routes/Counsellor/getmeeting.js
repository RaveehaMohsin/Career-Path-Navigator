const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Define a route to get all meetings
router.get('/', async (req, res) => {
  try {
    // Connect to the database
    const pool = await sql.connect();

    // SQL query to fetch all meetings
    const query = `
      SELECT meetingId , invoiceId, studentId, counsellorId, MeetingDate, MeetingTime, meetLink
      FROM Meeting
    `;
    
    // Execute the SQL query
    const result = await pool.request().query(query);

    // Respond with the list of meetings
    res.json({
      success: true,
      meetings: result.recordset,  // Recordset contains the result of the query
    });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.json({ success: false, message: 'Failed to retrieve meetings.' });
  }
});

module.exports = router;
