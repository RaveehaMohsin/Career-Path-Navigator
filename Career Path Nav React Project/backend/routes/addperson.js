const express = require("express");
const router = express.Router();
const sql = require("mssql");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/personImages"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); 
    },
});

var upload = multer({ storage }); 

router.post("/", upload.single("profileImage"), async (req, res) => {
    const {
        userId,
        gender,
        phoneNo,
        cnic,
        dob,
        address,
        city,
        country,
    } = req.body;

    // img will come from multer
    const img = req.file ? `/personImages/${req.file.filename}` : null; // Store the file path if file exists
    

    try {
        // Establish a new connection if not global
        const pool = await sql.connect();

        // Check if the user already exists
        const checkQuery = `USE CareerPathNavigator; SELECT COUNT(*) AS count FROM Person WHERE userId = @userId`;
        const checkResult = await pool
            .request()
            .input("userId", sql.Int, userId)
            .query(checkQuery);

        const userExists = checkResult.recordset[0].count > 0;

        if (userExists) {
            // Update the existing record
            const updateQuery = `
            USE CareerPathNavigator;
                UPDATE Person
                SET Gender = @gender,
                    PhoneNo = @phoneNo,
                    CNIC = @cnic,
                    DOB = @dob,
                    Address = @address,
                    City = @city,
                    Country = @country,
                    Img = @img
                WHERE userId = @userId
            `;
            await pool
                .request()
                .input("userId", sql.Int, userId)
                .input("gender", sql.VarChar(10), gender)
                .input("phoneNo", sql.VarChar(30), phoneNo)
                .input("cnic", sql.VarChar(50), cnic)
                .input("dob", sql.Date, dob)
                .input("address", sql.VarChar(255), address)
                .input("city", sql.VarChar(50), city)
                .input("country", sql.VarChar(50), country)
                .input("img", sql.VarChar(sql.MAX), img)
                .query(updateQuery);

            res.status(200).json({ message: "User information updated successfully." });
        } else {
            // Insert a new record
            const insertQuery = `
                USE CareerPathNavigator;
                INSERT INTO Person (userId, Gender, PhoneNo, CNIC, DOB, Address, City, Country, Img)
                VALUES (@userId, @gender, @phoneNo, @cnic, @dob, @address, @city, @country, @img)
            `;
            await pool
                .request()
                .input("userId", sql.Int, userId)
                .input("gender", sql.VarChar(10), gender)
                .input("phoneNo", sql.VarChar(30), phoneNo)
                .input("cnic", sql.VarChar(50), cnic)
                .input("dob", sql.Date, dob)
                .input("address", sql.VarChar(255), address)
                .input("city", sql.VarChar(50), city)
                .input("country", sql.VarChar(50), country)
                .input("img", sql.VarChar(sql.MAX), img)
                .query(insertQuery);

            res.status(201).json({ message: "User information added successfully." });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

module.exports = router;
