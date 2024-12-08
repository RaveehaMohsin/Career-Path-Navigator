const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming MySQL connection setup

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
                   p.Img,
                   C.counsellorId, 
                   C.expertise, 
                   C.noOfDaysAvailable, 
                   C.availableDays, 
                   C.timeSlots, 
                   C.qualifications, 
                   C.hourlyRate
            FROM Users u
            JOIN Person p ON u.userId = p.userId
            JOIN Counsellor C ON u.userId = C.counsellorId;
        `;
        
        connection.query(query, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching the information." });
            }

            // Check if any data was found
            if (result.length === 0) {
                return res.status(404).json({ message: "No records found." });
            }

            // Respond with the combined data from Users, Person, and Counsellor
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching the information." });
    }
});

module.exports = router;
