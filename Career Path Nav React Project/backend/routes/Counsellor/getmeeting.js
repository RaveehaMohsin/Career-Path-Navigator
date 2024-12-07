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
    SELECT 
      m.meetingId,
      m.invoiceId,
      m.studentId,
      m.counsellorId,
      m.MeetingDate,
      m.MeetingTime,
      m.meetLink,
      s.firstName AS studentFirstName,
      s.lastName AS studentLastName,
      c.firstName AS counsellorFirstName,
      c.lastName AS counsellorLastName
    FROM 
      Meeting m
    Left JOIN 
      Users s ON m.studentId = s.userId
     Left JOIN 
      Users c ON m.counsellorId = c.userId
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
