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
    const { studentid , institutename, degreetitle, totalmarks, obtainedmarks } = req.body;

    try {
        const pool = await sql.connect();
        const query = `
            UPDATE Background
            SET 
                studentId = @studentId,
                instituteName = @institutename,
                degreeTitle = @degreetitle,
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
