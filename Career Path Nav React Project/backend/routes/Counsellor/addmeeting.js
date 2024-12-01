const express = require('express');
const router = express.Router();
const sql = require('mssql');


const generateJitsiLink = (roomName) => {
  const jitsiUrl = `https://meet.jit.si/${roomName}`;
  return jitsiUrl;
};

router.post('/', async (req, res) => {
  const { invoiceId, studentId, counsellorId, meetingDate, meetingTime } = req.body;

  try {

    // Generate a unique room name (e.g., combining studentId and counsellorId)
    const roomName = `counseling-${studentId}-${counsellorId}-${Date.now()}`;

    // Generate the meeting link using Jitsi
    const meetingLink = generateJitsiLink(roomName);

    // Connect to the database
    const pool = await sql.connect();

    // SQL query to insert the meeting details into the database
    const query = `
      INSERT INTO Meeting (invoiceId, studentId, counsellorId, MeetingDate, MeetingTime, meetLink)
      VALUES (@InvoiceId, @studentId, @counsellorId, @meetingDate, @meetingTime, @meetingLink)
    `;
    
    // Execute the SQL query
    await pool
      .request()
      .input('InvoiceId', sql.VarChar(255), invoiceId)
      .input('studentId', sql.Int, studentId)
      .input('counsellorId', sql.Int, counsellorId)
      .input('meetingDate', sql.Date, meetingDate)
      .input('meetingTime', sql.VarChar(255), meetingTime)
      .input('meetingLink', sql.VarChar(255), meetingLink)
      .query(query);

    // Respond with success and the generated meeting link
    res.json({
      success: true,
      meetingLink,
    });
  } catch (error) {
    console.error('Error creating meeting link:', error);
    res.json({ success: false, message: 'Failed to create meeting link.' });
  }
});

module.exports = router;
