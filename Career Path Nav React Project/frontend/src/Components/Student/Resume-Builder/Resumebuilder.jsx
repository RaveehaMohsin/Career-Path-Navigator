import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF library
import "./resumebuilder.css";
import Upperheader from "../../UpperHeader/upperheader";
import Swal from "sweetalert2";

export default function Resumebuilder() {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const userId = userData.user.userId;

  const [formData, setFormData] = useState({
    studentId: "",
    resumeObjective: "",
    technicalSkills: "",
    linkedInProfile: "",
    githubProfile: "",
    reference: "",
    achievements: "",
    projects: [{ title: "", description: "" }],
  });

  const [personInfo, setPersonInfo] = useState({});
  const [educationInfo, setEducationInfo] = useState([]);

  useEffect(() => {
    fetchResumeData();
    fetchPersonData();
    fetchEducationData();
  }, []);

  const fetchResumeData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/getstudentresume/${userId}`
      );
      const data = await response.json();

      if (data && response.ok) {
        setFormData({
          studentId: data.studentId,
          resumeObjective: data.resumeObjective || "",
          technicalSkills: data.technicalSkills || "",
          linkedInProfile: data.linkedInProfile || "",
          githubProfile: data.githubProfile || "",
          reference: data.reference || "",
          achievements: data.achievmentscertifications || "",
          projects:
            data.projects && Array.isArray(data.projects)
              ? data.projects
              : [{ title: "", description: "" }],
        });
      } else {
        console.log("No resume data found for this student.");
      }
    } catch (error) {
      console.error("Error fetching resume data:", error);
    }
  };

  const fetchPersonData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/getperson/${userId}`);
      const data = await response.json();
      if (data && response.ok) {
        setPersonInfo(data);
      }
    } catch (error) {
      console.error("Error fetching person data:", error);
    }
  };

  const fetchEducationData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/getbackground/${userId}`
      );
      const data = await response.json();
      if (data && response.ok) {
        setEducationInfo(data);
      }
    } catch (error) {
      console.error("Error fetching education data:", error);
    }
  };

  const handleGenerateResume = async (e) => {
    e.preventDefault();

    try {
      const formattedProjects = formData.projects
        .map(
          (project) =>
            `Title: ${project.title} , Description: ${project.description}`
        )
        .join("; ");

      const response = await fetch("http://localhost:4000/addstudentresume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: userId,
          resumeObjective: formData.resumeObjective,
          technicalSkills: formData.technicalSkills,
          linkedInProfile: formData.linkedInProfile,
          githubProfile: formData.githubProfile,
          reference: formData.reference,
          achievements: formData.achievements,
          projects: formattedProjects,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Resume PDF Generated.",
          confirmButtonText: "OK",
        });
      } else {
        const error = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text:  "An unexpected error occurred.",
        });
      }
    } catch (error) {
      console.error("Error generating resume:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:  "An unexpected error occurred.",
      });
    }

    // Create PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      format: "a4",
      unit: "mm",
    });

    // Set margins and line height
    const marginX = 14;
    const marginY = 20;
    const lineHeight = 8;
    let yOffset = marginY;
    const pageHeight = doc.internal.pageSize.height;

    // Helper function to check if we need to add a new page
    const checkPageOverflow = (additionalHeight) => {
      if (yOffset + additionalHeight > pageHeight - marginY) {
        doc.addPage();
        yOffset = marginY;
      }
    };

    // Add name in the center
    doc.setFontSize(18);
    const nameWidth = doc.getTextWidth(username);
    doc.text(username, (210 - nameWidth) / 2, yOffset);
    yOffset += 10;

    // Add contact info
    doc.setFontSize(10);
    doc.setFont("normal");
    doc.text(
      `+${personInfo.PhoneNo} | ${userData.user.email} | ${formData.linkedInProfile} | ${formData.githubProfile}`,
      marginX,
      yOffset
    );
    yOffset += 10;

    // City and Country info
    doc.setFontSize(12);
    doc.setFont("normal");
    const nameWidth1 = doc.getTextWidth(
      `${personInfo.City} | ${personInfo.Country}`
    );
    doc.text(
      `${personInfo.City} | ${personInfo.Country}`,
      (210 - nameWidth1) / 2,
      yOffset
    );
    yOffset += 10;

    // Resume Objective Section
    checkPageOverflow(30); // Check for potential overflow before adding content
    doc.setFontSize(16);
    doc.setFont("bold");
    doc.text("Resume Objective:", marginX, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    doc.setFont("normal");
    doc.text(formData.resumeObjective, marginX, yOffset, {
      maxWidth: 180,
      align: "left",
    });
    yOffset += 20;

    // Education Section
    checkPageOverflow(30);
    doc.setFontSize(16);
    doc.setFont("bold");
    doc.text("Education:", marginX, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    doc.setFont("normal");
    educationInfo.forEach((edu) => {
      checkPageOverflow(20);
      doc.text(
        `${edu.instituteName} - ${edu.degreeTitle} (${edu.degreeLevel})`,
        marginX,
        yOffset
      );
      doc.text(
        `Total Marks: ${edu.TotalMarks}, Obtained Marks: ${edu.ObtainedMarks}`,
        marginX,
        yOffset + lineHeight
      );
      yOffset += 20;
    });

    // Projects Section
    checkPageOverflow(30);
    doc.setFontSize(16);
    doc.setFont("bold");
    doc.text("Projects:", marginX, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    doc.setFont("normal");

    formData.projects.forEach((project) => {
      checkPageOverflow(20);

      // Add the project title
      doc.setFont("bold");
      doc.text(`Title: ${project.title}`, marginX, yOffset);

      // Add the project description with text wrapping and calculate text height
      doc.setFont("normal");
      const descriptionLines = doc.splitTextToSize(project.description, 180); // Wrap text to fit maxWidth of 180
      const descriptionHeight = descriptionLines.length * lineHeight; // Calculate height of the wrapped text
      doc.text(descriptionLines, marginX, yOffset + lineHeight);

      // Update yOffset dynamically
      yOffset += descriptionHeight + 5; // Add 10 for spacing between projects
    });

    // Achievements & Certifications Section
    checkPageOverflow(30);
    doc.setFontSize(16);
    doc.setFont("bold");
    doc.text("Achievements & Certifications:", marginX, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    doc.setFont("normal");
    doc.text(formData.achievements, marginX, yOffset, {
      maxWidth: 180,
      align: "left",
    });
    yOffset += 20;

    // Technical Skills Section
    checkPageOverflow(30);
    doc.setFontSize(16);
    doc.setFont("bold");
    doc.text("Technical Skills:", marginX, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    doc.setFont("normal");
    doc.text(formData.technicalSkills, marginX, yOffset, {
      maxWidth: 180,
      align: "left",
    });
    yOffset += 20;

    // References Section
    checkPageOverflow(30);
    doc.setFontSize(16);
    doc.setFont("bold");
    doc.text("References:", marginX, yOffset);
    yOffset += 10;
    doc.setFontSize(12);
    doc.setFont("normal");
    doc.text(formData.reference, marginX, yOffset, {
      maxWidth: 180,
      align: "left",
    });

    // Save PDF
    doc.save("resume.pdf");
  };

  return (
    <div>
      <Upperheader title="Resume Builder" name={username} />
      <div className="resume-builder-container">
        <h2 className="resume-title">Build your Resume</h2>
        <form className="resume-form-container" onSubmit={handleGenerateResume}>
          {/* Form fields */}
          <label className="resume-label">
            Resume Objective:
            <textarea
              className="resume-textarea"
              name="resumeObjective"
              value={formData.resumeObjective}
              onChange={(e) =>
                setFormData({ ...formData, resumeObjective: e.target.value })
              }
              placeholder="Write your objective here..."
              required
            />
          </label>

          <label className="resume-label">
            Technical Skills (Comma Separated):
            <input
              className="resume-input"
              type="text"
              name="technicalSkills"
              value={formData.technicalSkills}
              onChange={(e) =>
                setFormData({ ...formData, technicalSkills: e.target.value })
              }
              placeholder="e.g., JavaScript, React, SQL"
              required
            />
          </label>

          <label className="resume-label">
            LinkedIn Profile:
            <input
              className="resume-input"
              type="url"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={(e) =>
                setFormData({ ...formData, linkedInProfile: e.target.value })
              }
              placeholder="Enter your LinkedIn URL"
            />
          </label>

          <label className="resume-label">
            GitHub Profile:
            <input
              className="resume-input"
              type="url"
              name="githubProfile"
              value={formData.githubProfile}
              onChange={(e) =>
                setFormData({ ...formData, githubProfile: e.target.value })
              }
              placeholder="Enter your GitHub URL"
            />
          </label>

          <label className="resume-label">
            Reference:
            <textarea
              className="resume-textarea"
              name="reference"
              value={formData.reference}
              onChange={(e) =>
                setFormData({ ...formData, reference: e.target.value })
              }
              placeholder="Enter reference details..."
            />
          </label>

          <label className="resume-label">
            Achievements & Certifications(Comma Separated):
            <textarea
              className="resume-textarea"
              name="achievements"
              value={formData.achievements}
              onChange={(e) =>
                setFormData({ ...formData, achievements: e.target.value })
              }
              placeholder="e.g., Certified in AWS, Completed React Bootcamp"
            />
          </label>

          <div className="resume-projects-section">
            <h3 className="resume-header">Projects</h3>
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="resume-project"
                style={{ position: "relative", padding: "10px" }}
              >
                {/* Cross Button */}
                <button
                  onClick={() => {
                    const updatedProjects = formData.projects.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, projects: updatedProjects });
                  }}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "none",
                    border: "none",
                    fontSize: "16px",
                    color: "#ff5c5c",
                    cursor: "pointer",
                  }}
                  title="Remove Project"
                >
                  ✖
                </button>

                <label className="resume-label">
                  Project Title:
                  <input
                    className="resume-input"
                    type="text"
                    value={project.title}
                    onChange={(e) => {
                      const updatedProjects = [...formData.projects];
                      updatedProjects[index].title = e.target.value;
                      setFormData({ ...formData, projects: updatedProjects });
                    }}
                    placeholder="Project Title"
                  />
                </label>

                <label className="resume-label">
                  Project Description:
                  <textarea
                    className="resume-textarea"
                    value={project.description}
                    onChange={(e) => {
                      const updatedProjects = [...formData.projects];
                      updatedProjects[index].description = e.target.value;
                      setFormData({ ...formData, projects: updatedProjects });
                    }}
                    placeholder="Project Description"
                  />
                </label>
              </div>
            ))}

            <button
              type="button"
              className="resume-add-project-button"
              onClick={() =>
                setFormData({
                  ...formData,
                  projects: [
                    ...formData.projects,
                    { title: "", description: "" },
                  ],
                })
              }
            >
              + Add Another Project
            </button>
          </div>

          <button type="submit" className="resume-generate-button">
            Generate Resume PDF
          </button>
        </form>
      </div>
    </div>
  );
}
