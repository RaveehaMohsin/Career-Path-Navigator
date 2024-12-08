const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming connection is already made

// Fetch background details
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT *
            FROM Background
            WHERE studentId = ?
        `;
        
        // Execute the query using MySQL connection
        connection.query(query, [userId], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching the user's background." });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "No Background found for the user." });
            }

            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "An error occurred while fetching the user's background." });
    }
});

// Delete background details by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = `
            DELETE FROM Background
            WHERE backgroundId = ?
        `;

        // Execute the query to delete the record
        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while deleting the record." });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "No record found to delete with the given ID." });
            }

            res.status(200).json({ message: "Record successfully deleted." });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "An error occurred while deleting the record." });
    }
});

// Update background details by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { studentid, institutename, degreetitle, degreelevel, totalmarks, obtainedmarks } = req.body;

    try {
        // First, check for duplicate entry (excluding the current record being updated)
        const checkQuery = `
            SELECT COUNT(*) AS count
            FROM Background
            WHERE studentId = ?
            AND instituteName = ?
            AND degreeTitle = ?
            AND degreeLevel = ?
            AND backgroundId != ?
        `;
        
        // Execute the check query for duplicates
        connection.query(checkQuery, [studentid, institutename, degreetitle, degreelevel, id], (err, checkResult) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while checking for duplicates." });
            }

            // If a duplicate record is found, return an error
            if (checkResult[0].count > 0) {
                return res.status(400).json({ error: "This degree entry already exists for the student." });
            }

            // Update the background record if no duplicate is found
            const updateQuery = `
                UPDATE Background
                SET 
                    studentId = ?, 
                    instituteName = ?, 
                    degreeTitle = ?, 
                    degreeLevel = ?, 
                    TotalMarks = ?, 
                    ObtainedMarks = ?
                WHERE backgroundId = ?
            `;

            // Execute the update query
            connection.query(updateQuery, [
                studentid, 
                institutename, 
                degreetitle, 
                degreelevel, 
                totalmarks, 
                obtainedmarks, 
                id
            ], (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: "An error occurred while updating the record." });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "No record found to update with the given ID." });
                }

                res.status(200).json({ message: "Record successfully updated." });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "An error occurred while updating the record." });
    }
});

module.exports = router;
