const express = require("express");
const router = express.Router();
const sql = require("mssql");

// Fetch background details
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const pool = await sql.connect();
        const query = `
            SELECT *
            FROM Background
            WHERE studentId = @userId
        `;
        
        const result = await pool
            .request()
            .input("userId", sql.Int, userId)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No Background found for the user." });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching the user's background." });
    }
});

// Delete background details by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await sql.connect();
        const query = `
            DELETE FROM Background
            WHERE backgroundId = @id
        `;

        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "No record found to delete with the given ID." });
        }

        res.status(200).json({ message: "Record successfully deleted." });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while deleting the record." });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { studentid, institutename, degreetitle, degreelevel, totalmarks, obtainedmarks } = req.body;

    try {
        const pool = await sql.connect();

        // First, check for duplicate entry (excluding the current record being updated)
        const checkQuery = `
            SELECT COUNT(*) AS count
            FROM Background
            WHERE studentId = @studentId
            AND instituteName = @instituteName
            AND degreeTitle = @degreeTitle
            AND degreeLevel = @degreeLevel
            AND backgroundId != @id
        `;
        
        const checkResult = await pool
            .request()
            .input("studentId", sql.Int, studentid)
            .input("instituteName", sql.VarChar(100), institutename)
            .input("degreeTitle", sql.VarChar(100), degreetitle)
            .input("degreeLevel", sql.VarChar(100), degreelevel)
            .input("id", sql.Int, id)
            .query(checkQuery);

        // If a duplicate record is found, return an error
        if (checkResult.recordset[0].count > 0) {
            return res.status(400).json({ error: "This degree entry already exists for the student." });
        }

        // Update the background record if no duplicate is found
        const query = `
            UPDATE Background
            SET 
                studentId = @studentId,
                instituteName = @instituteName,
                degreeTitle = @degreeTitle,
                degreeLevel = @degreeLevel,
                TotalMarks = @totalmarks,
                ObtainedMarks = @obtainedmarks
            WHERE backgroundId = @id
        `;

        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .input("studentId", sql.Int, studentid)
            .input("instituteName", sql.VarChar(100), institutename)
            .input("degreeTitle", sql.VarChar(100), degreetitle)
            .input("degreeLevel", sql.VarChar(100), degreelevel)
            .input("totalMarks", sql.Float, totalmarks)
            .input("obtainedMarks", sql.Float, obtainedmarks)
            .query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "No record found to update with the given ID." });
        }

        res.status(200).json({ message: "Record successfully updated." });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while updating the record." });
    }
});

module.exports = router;
