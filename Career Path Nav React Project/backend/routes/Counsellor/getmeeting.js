const express = require('express');
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming your MySQL connection is set up here

// Define a route to get all meetings
router.get('/', async (req, res) => {
  try {
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
      LEFT JOIN 
        Users s ON m.studentId = s.userId
      LEFT JOIN 
        Users c ON m.counsellorId = c.userId
    `;
    
    // Execute the SQL query using the MySQL connection
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching meetings:', err);
        return res.json({ success: false, message: 'Failed to retrieve meetings.' });
      }

      // Respond with the list of meetings
      res.json({
        success: true,
        meetings: results,  // `results` contains the result of the query
      });
    });
    
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.json({ success: false, message: 'Failed to retrieve meetings.' });
  }
});

module.exports = router;
