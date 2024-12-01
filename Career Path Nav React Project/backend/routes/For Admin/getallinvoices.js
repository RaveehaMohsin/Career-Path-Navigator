const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get('/', async (req, res) => {
    try {
        const pool = await sql.connect();
        const query = `
            SELECT 
                i.[invoiceId], 
                i.[amount], 
                i.[timeIssues],
                m.[meetingId], 
                m.[studentId], 
                m.[counsellorId], 
                m.[MeetingTime], 
                m.[MeetingDate], 
                m.[meetLink]
            FROM 
                [CareerPathNavigator].[dbo].[Invoice] i
            INNER JOIN 
                [CareerPathNavigator].[dbo].[Meeting] m
            ON 
                i.[invoiceId] = m.[invoiceId]
        `;
        
        const result = await pool.request().query(query);

        // Check if any data was found
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No data found." });
        }

        // Respond with the joined data
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

module.exports = router;
