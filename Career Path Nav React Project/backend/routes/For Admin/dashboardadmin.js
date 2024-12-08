const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql");

// Route to get the total number of students
router.get('/total-students', async (req, res) => {
    try {
        const query = `
            SELECT COUNT(*) AS totalStudents
            FROM Users
            WHERE role = 'Student';
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching the total number of students." });
            }

            res.status(200).json({ totalStudents: result[0].totalStudents });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching the total number of students." });
    }
});

// Route to get the total number of counselors
router.get('/total-counsellors', async (req, res) => {
    try {
        const query = `
            SELECT COUNT(*) AS totalCounsellors
            FROM Users
            WHERE role = 'Counsellor';
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching the total number of counselors." });
            }

            res.status(200).json({ totalCounsellors: result[0].totalCounsellors });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching the total number of counselors." });
    }
});

// Route to get the total balance
router.get('/total-balance', async (req, res) => {
    try {
        const query = `
            SELECT 
                DATE(timeIssues) AS issueDate,
                SUM(amount) AS totalAmount
            FROM Invoice
            GROUP BY DATE(timeIssues)
            ORDER BY issueDate ASC;
        `;
        
        connection.query(query, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching the total balance data." });
            }

            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching the total balance data." });
    }
});

// Route to get student background
router.get('/student-background', async (req, res) => {
    try {
        const query = `
            SELECT 
                CONCAT(u.firstName, ' ', u.lastName) AS StudentName,
                b.instituteName AS InstituteName,
                b.degreeTitle AS DegreeTitle,
                b.ObtainedMarks AS ObtainedMarks,
                b.TotalMarks AS TotalMarks,
                CAST((b.ObtainedMarks * 100.0 / b.TotalMarks) AS DECIMAL(5, 2)) AS Percentage
            FROM Users u
            JOIN Person p ON u.userId = p.userId
            JOIN Background b ON u.userId = b.studentId
            WHERE u.role = 'Student';
        `;

        connection.query(query, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching student background information." });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "No records found." });
            }

            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching student background information." });
    }
});

module.exports = router;
