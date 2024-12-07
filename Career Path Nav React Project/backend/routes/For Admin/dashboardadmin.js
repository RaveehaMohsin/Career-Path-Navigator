const express = require("express");
const router = express.Router();
const sql = require("mssql");

// Route to get the total number of students
router.get('/total-students', async (req, res) => {
    try {
        const pool = await sql.connect();
        const query = `
            SELECT COUNT(*) AS totalStudents
            FROM [CareerPathNavigator].[dbo].[Users]
            WHERE role = 'Student';
        `;

        const result = await pool.request().query(query);

        res.status(200).json({ totalStudents: result.recordset[0].totalStudents });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching the total number of students." });
    }
});

// Route to get the total number of counselors
router.get('/total-counsellors', async (req, res) => {
    try {
        const pool = await sql.connect();
        const query = `
            SELECT COUNT(*) AS totalCounsellors
            FROM [CareerPathNavigator].[dbo].[Users]
            WHERE role = 'Counsellor';
        `;

        const result = await pool.request().query(query);

        res.status(200).json({ totalCounsellors: result.recordset[0].totalCounsellors });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching the total number of counselors." });
    }
});

router.get('/total-balance', async (req, res) => {
    try {
        const pool = await sql.connect();
        const query = `
            SELECT 
                CAST([timeIssues] AS DATE) AS issueDate,
                SUM([amount]) AS totalAmount
            FROM [CareerPathNavigator].[dbo].[Invoice]
            GROUP BY CAST([timeIssues] AS DATE)
            ORDER BY issueDate ASC;
        `;
        
        const result = await pool.request().query(query);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching the total balance data." });
    }
});

router.get('/monthly-stats', async (req, res) => {
    try {
        const pool = await sql.connect();

        // Query for Monthly Revenue
        const revenueQuery = `
            SELECT 
                YEAR([timeIssues]) AS year, 
                MONTH([timeIssues]) AS month, 
                SUM([amount]) AS totalRevenue
            FROM [CareerPathNavigator].[dbo].[Invoice]
            GROUP BY YEAR([timeIssues]), MONTH([timeIssues])
            ORDER BY year, month;
        `;

        // Query for Monthly Meetings Held
        const meetingsQuery = `
            SELECT 
                YEAR([MeetingDate]) AS year, 
                MONTH([MeetingDate]) AS month, 
                COUNT([meetingId]) AS totalMeetings
            FROM [CareerPathNavigator].[dbo].[Meeting]
            GROUP BY YEAR([MeetingDate]), MONTH([MeetingDate])
            ORDER BY year, month;
        `;

        // Execute queries
        const revenueResult = await pool.request().query(revenueQuery);
        const meetingsResult = await pool.request().query(meetingsQuery);

        // Format data for frontend
        const revenueData = revenueResult.recordset.map(row => ({
            month: `${row.year}-${row.month}`,
            totalRevenue: row.totalRevenue,
        }));

        const meetingsData = meetingsResult.recordset.map(row => ({
            month: `${row.year}-${row.month}`,
            totalMeetings: row.totalMeetings,
        }));

        // Send both datasets separately in the response
        res.json({
            revenueData,
            meetingsData
        });
    } catch (error) {
        console.error('Error fetching monthly stats:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/degree-status', async (req, res) => {
    try {
        const pool = await sql.connect();

        // Query to get the count of degrees based on their status
        const query = `
            SELECT 
                [status],
                COUNT([degreeId]) AS degreeCount
            FROM [CareerPathNavigator].[dbo].[Degree]
            GROUP BY [status];
        `;

        const result = await pool.request().query(query);

        // Map status codes to meaningful descriptions
        const statusMapping = {
            2: "Completed",
            1: "Enrolled",
            0: "Applied",
            "-1": "Wishlist",
            "-2": "Not Eligible"
        };

        // Transform data to include status description
        const transformedData = result.recordset.map(item => ({
            statusCode: item.status,
            statusDescription: statusMapping[item.status] || "Unknown",
            degreeCount: item.degreeCount
        }));

        // Prepare data for the chart
        const barchartData = transformedData.map(item => item.degreeCount);
        const barChartLabels = transformedData.map((item, index) => index + 1); // Optional: You can customize the X-axis labels here
        const barChartStatus = transformedData.reduce((acc, item) => {
            acc[`p${item.statusCode}`] = `${item.statusCode}. ${item.statusDescription}`;
            return acc;
        }, {});

        const barChartTitle = "Degree Status Distribution";

        // Return the chart data
        res.status(200).json({
            barchartData,
            barChartLabels,
            barChartStatus,
            barChartTitle
        });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching degree statuses." });
    }
});


router.get('/student-background', async (req, res) => {
    try {
        const pool = await sql.connect();

        const query = `
            SELECT 
                u.firstName + ' ' + u.lastName AS [StudentName],
                b.instituteName AS [InstituteName],
                b.degreeTitle AS [DegreeTitle],
                b.ObtainedMarks AS [ObtainedMarks],
                b.TotalMarks AS [TotalMarks],
                CAST((b.ObtainedMarks * 100.0 / b.TotalMarks) AS DECIMAL(5, 2)) AS [Percentage]
            FROM [CareerPathNavigator].[dbo].[Users] u
            JOIN [CareerPathNavigator].[dbo].[Person] p
                ON u.userId = p.userId
            JOIN [CareerPathNavigator].[dbo].[Background] b
                ON u.userId = b.studentId
            WHERE u.role = 'Student';
        `;

        const result = await pool.request().query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No records found." });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while fetching student background information." });
    }
});



module.exports = router;
