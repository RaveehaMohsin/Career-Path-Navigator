const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const pool = await sql.connect(); 
        const query = `
            SELECT category, created_at
            FROM Interest
            WHERE studentId = @userId
        `;
        
        const result = await pool
            .request()
            .input("userId", sql.Int, userId) 
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No interests found for the user." });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching the user's interests." });
    }
});

module.exports = router;
