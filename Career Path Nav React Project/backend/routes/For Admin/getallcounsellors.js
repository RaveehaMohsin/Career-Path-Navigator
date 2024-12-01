const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get('/', async (req, res) => {
    try {
        const pool = await sql.connect();
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
                   C.counsellorId, 
                   C.expertise, 
                   C.noOfDaysAvailable, 
                   C.availableDays, 
                   C.timeSlots, 
                   C.qualifications, 
                   C.hourlyRate
            FROM [CareerPathNavigator].[dbo].[Users] u
            JOIN [CareerPathNavigator].[dbo].[Person] p
                ON u.userId = p.userId
            JOIN [CareerPathNavigator].[dbo].[Counsellor] C
                ON u.userId = C.counsellorId;  
        `;
        
        const result = await pool.request().query(query);

        // Check if any data was found
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No records found." });
        }

        // Respond with the combined data from Users, Person, and Counsellor
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching the information." });
    }
});

module.exports = router;
