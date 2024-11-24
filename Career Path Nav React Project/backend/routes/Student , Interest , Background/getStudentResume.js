const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const pool = await sql.connect();
      const query = `
        SELECT [studentId], [resumeObjective], [technicalSkills], [linkedInProfile],
               [githubProfile], [reference], [achievmentscertifications], [projects]
        FROM [CareerPathNavigator].[dbo].[Student]
        WHERE studentId = @userId
      `;
      
      const result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .query(query);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Student not found." });
      }
  
      let projects = result.recordset[0].projects || "";
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
        ...result.recordset[0],
        projects, 
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "An error occurred while fetching the person's information." });
    }
  });
  

module.exports = router;
