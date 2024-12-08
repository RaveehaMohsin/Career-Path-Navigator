const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming MySQL connection setup

// Route to get students
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT u.userId, 
                   u.firstName, 
                   u.lastName, 
                   u.email, 
                   u.password, 
                   u.role, 
                   p.Gender, 
                   p.PhoneNo, 
                   p.CNIC, 
                   p.DOB, 
                   p.Address, 
                   p.City, 
                   p.Country, 
                   p.Img
            FROM Users u
            JOIN Person p
                ON u.userId = p.userId
            WHERE u.role = 'Student'
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching student information." });
            }

            // Check if any student data was found
            if (result.length === 0) {
                return res.status(404).json({ message: "No students found." });
            }

            // Respond with the student data
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching student information." });
    }
});

// Route to get students for counselors
router.get('/getstudentsforcounsellors', async (req, res) => {
    try {
        const query = `
            SELECT u.userId, 
                   u.firstName, 
                   u.lastName, 
                   u.email, 
                   u.password, 
                   u.role, 
                   p.Gender, 
                   p.PhoneNo, 
                   p.CNIC, 
                   p.DOB, 
                   p.Address, 
                   p.City, 
                   p.Country, 
                   p.Img,
                   m.meetingId,
                   m.invoiceId,
                   m.studentId,
                   m.counsellorId,
                   m.MeetingTime,
                   m.MeetingDate,
                   m.meetLink
            FROM Users u
            JOIN Person p
                ON u.userId = p.userId
            JOIN Meeting m
                ON u.userId = m.studentId
            WHERE u.role = 'Student'
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching student and meeting information." });
            }

            // Check if any student data was found
            if (result.length === 0) {
                return res.status(404).json({ message: "No students found." });
            }

            // Respond with the student and meeting data
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching student and meeting information." });
    }
});

module.exports = router;
