const express = require("express");
const router = express.Router();
const connection = require("../../database/mysql"); // Assuming MySQL connection is already established

// Fetch student information by userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT studentId, resumeObjective, technicalSkills, linkedInProfile, 
                   githubProfile, reference, achievmentscertifications, projects
            FROM Student
            WHERE studentId = ?
        `;
        
        // Execute the query using MySQL connection
        connection.query(query, [userId], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "An error occurred while fetching the person's information." });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "Student not found." });
            }

            let projects = result[0].projects || "";
            if (projects) {
                // Split the projects string by semicolon and parse each project
                projects = projects.split(";").map(project => {
                    const [titlePart, descriptionPart] = project.split(", Description: ");
                    const title = titlePart.replace("Title: ", "").trim();
                    const description = descriptionPart ? descriptionPart.trim() : "";
                    return { title, description };
                });
            }

            res.status(200).json({
                ...result[0],
                projects, 
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "An error occurred while fetching the person's information." });
    }
});

module.exports = router;
