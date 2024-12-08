const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming MySQL connection setup

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                i.invoiceId, 
                i.amount, 
                i.timeIssues,
                m.meetingId, 
                m.studentId, 
                m.counsellorId, 
                m.MeetingTime, 
                m.MeetingDate, 
                m.meetLink
            FROM 
                Invoice i
            INNER JOIN 
                Meeting m
            ON 
                i.invoiceId = m.invoiceId;
        `;
        
        connection.query(query, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching data." });
            }

            // Check if any data was found
            if (result.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }

            // Respond with the joined data
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

module.exports = router;
