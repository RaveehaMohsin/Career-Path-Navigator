const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const { firstName, lastName, email, role, password } = req.body;

    // Validate input fields
    if (!firstName || !lastName || !email || !role || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        // Check if the email already exists in the database
        const checkEmailQuery = `
            SELECT COUNT(*) AS count
            FROM [CareerPathNavigator].[dbo].[Users]
            WHERE email = @Email
        `;

        const emailCheckResult = await sql.query(
            checkEmailQuery.replace("@Email", `'${email}'`) // Use parameterized queries if possible for security
        );

        const emailExists = emailCheckResult.recordset[0].count > 0;

        if (emailExists) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Insert the new user
        const insertQuery = `
            INSERT INTO [CareerPathNavigator].[dbo].[Users] 
            (firstName, lastName, email, role, password)
            VALUES ('${firstName}', '${lastName}', '${email}', '${role}', '${password}')
        `;

        await sql.query(insertQuery);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;


