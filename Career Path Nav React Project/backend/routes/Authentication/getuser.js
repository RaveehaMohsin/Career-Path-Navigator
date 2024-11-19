const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const query = `
            SELECT 
                [userId], [firstName], [lastName], [email], [password], [role]
            FROM [CareerPathNavigator].[dbo].[Users]
            WHERE email = @Email AND password = @Password
        `;
        
        const request = new sql.Request();
        request.input("Email", sql.NVarChar, email);
        request.input("Password", sql.NVarChar, password);
        
        const result = await request.query(query);


        if (!result || !result.recordset || result.recordset.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = result.recordset[0];
        
        res.status(200).json({user});
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "An error occurred while processing the login" });
    }
});

module.exports = router;
