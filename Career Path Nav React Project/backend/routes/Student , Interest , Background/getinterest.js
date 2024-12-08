const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming connection is already made

// Fetch user interests by userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT category, created_at
            FROM Interest
            WHERE studentId = ?
        `;
        
        // Execute the query using MySQL connection
        connection.query(query, [userId], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching the user's interests." });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "No interests found for the user." });
            }

            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "An error occurred while fetching the user's interests." });
    }
});

module.exports = router;
