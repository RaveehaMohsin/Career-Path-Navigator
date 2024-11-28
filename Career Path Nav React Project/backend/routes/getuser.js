const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const pool = await sql.connect();
        const query = `
            USE CareerPathNavigator;
            SELECT 
                userId,
                firstName,
                lastName,
                email,
                password,
                role
            FROM 
                [CareerPathNavigator].[dbo].[Users]
            WHERE 
                userId = @userId;
        `;
        
        const result = await pool
            .request()
            .input("userId", sql.Int, userId) 
            .query(query);

        // Check if the user exists
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        // Respond with the person's details
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching the person's information." });
    }
});

module.exports = router;
