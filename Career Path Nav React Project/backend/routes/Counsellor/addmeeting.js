const express = require('express');
const router = express.Router();
const connection = require('../../database/mysql');

const generateJitsiLink = (roomName) => {
  const jitsiUrl = `https://meet.jit.si/${roomName}`;
  return jitsiUrl;
};

router.post('/', async (req, res) => {
  const { invoiceId, studentId, counsellorId, meetingDate, meetingTime } = req.body;
  console.log(invoiceId)

  try {
    // Generate a unique room name (e.g., combining studentId and counsellorId)
    const roomName = `counseling-${studentId}-${counsellorId}-${Date.now()}`;

    // Generate the meeting link using Jitsi
    const meetingLink = generateJitsiLink(roomName);

    // SQL query to insert the meeting details into the database
    const query = `
      INSERT INTO Meeting (invoiceId, studentId, counsellorId, MeetingDate, MeetingTime, meetLink)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    // Use the connection pool to execute the query
    connection.query(query, [invoiceId, studentId, counsellorId, meetingDate, meetingTime, meetingLink], (error, results) => {
      if (error) {
        console.error('Error inserting meeting details:', error);
        return res.json({ success: false, message: 'Failed to create meeting link.' });
      }

      // Respond with success and the generated meeting link
      res.json({
        success: true,
        meetingLink,
      });
    });
  } catch (error) {
    console.error('Error creating meeting link:', error);
    res.json({ success: false, message: 'Failed to create meeting link.' });
  }
});

module.exports = router;
