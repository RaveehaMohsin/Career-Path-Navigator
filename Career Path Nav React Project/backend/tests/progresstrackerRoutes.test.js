const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); 
const { expect } = chai;

chai.use(chaiHttp);

describe("API Tests for Adding Data", () => {
  const uniqueIdStudent = 1; 
  const uniqueId = Date.now(); 

  // Test cases for the 'addJob' route
  describe("POST /addJob", () => {
    it("should add a job successfully", (done) => {
      chai
        .request(app)
        .post("/addJob")
        .send({
          studentId: uniqueIdStudent,
          jobTitle: `Software Developer ${uniqueId}`,
          company: "TechCorp",
          locationJob: "New York",
          salaryRange: "70,000-90,000",
          employmentType: "Full-Time",
          jobDescription: "Develop and maintain software applications.",
          educationLevelRequired: "Bachelor's Degree",
          requiredSkills: "JavaScript, React, Node.js",
          status: "Active",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("message", "Job details successfully added.");
          done();
        });
    });

    it("should return an error for duplicate job entry", (done) => {
      chai
        .request(app)
        .post("/addJob")
        .send({
          studentId: uniqueIdStudent,
          jobTitle: `Software Developer ${uniqueId}`,
          company: "TechCorp",
          locationJob: "New York",
          salaryRange: "70,000-90,000",
          employmentType: "Full-Time",
          jobDescription: "Develop and maintain software applications.",
          educationLevelRequired: "Bachelor's Degree",
          requiredSkills: "JavaScript, React, Node.js",
          status: "Active",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error", "Job entry already exists for this student.");
          done();
        });
    });

    it("should return an error for missing required fields", (done) => {
      chai
        .request(app)
        .post("/addJob")
        .send({
          studentId: uniqueIdStudent,
          jobTitle: `Software Developer ${uniqueId}`,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          done();
        });
    });
  });

  // Test cases for the 'addDegree' route
  describe("POST /addDegree", () => {
    it("should add a degree successfully", (done) => {
      chai
        .request(app)
        .post("/addDegree")
        .send({
          studentId: uniqueIdStudent,
          degreeTitle: `Bachelor of Computer Science ${uniqueId}`,
          institution: "State University",
          locationInstitute: "California",
          duration: "4 years",
          modeOfStudy: "On-campus",
          curriculumOverview: "Comprehensive curriculum in computer science.",
          careerOpportunities: "Software Engineer, Data Scientist",
          salaryProspects: "$60,000-$80,000",
          status: "Active",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("message", "Degree details successfully added.");
          done();
        });
    });

    it("should return an error for duplicate degree entry", (done) => {
      chai
        .request(app)
        .post("/addDegree")
        .send({
          studentId: uniqueIdStudent,
          degreeTitle: `Bachelor of Computer Science ${uniqueId}`,
          institution: "State University",
          locationInstitute: "California",
          duration: "4 years",
          modeOfStudy: "On-campus",
          curriculumOverview: "Comprehensive curriculum in computer science.",
          careerOpportunities: "Software Engineer, Data Scientist",
          salaryProspects: "$60,000-$80,000",
          status: "Active",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error", "Degree entry already exists for this student.");
          done();
        });
    });

    it("should return an error for missing required fields", (done) => {
      chai
        .request(app)
        .post("/addDegree")
        .send({
          studentId: uniqueIdStudent,
          degreeTitle: `Bachelor of Computer Science ${uniqueId}`,
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("error");
          done();
        });
    });
  });

  // Test cases for the 'addCourse' route
  describe("POST /addCourse", () => {
    it("should add a course successfully", (done) => {
      chai
        .request(app)
        .post("/addCourse")
        .send({
          studentId: uniqueIdStudent,
          courseTitle: `Data Science 101 ${uniqueId}`,
          providerSource: "Coursera",
          durationCourse: "6 weeks",
          courseLevel: "Beginner",
          prerequisites: "Basic programming knowledge",
          skillsCovered: "Python, Data Analysis, Machine Learning",
          courseFees: "$300",
          certification: "Yes",
          status: "Active",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("message", "Course details successfully added.");
          done();
        });
    });

    it("should return an error for duplicate course entry", (done) => {
      chai
        .request(app)
        .post("/addCourse")
        .send({
          studentId: uniqueIdStudent,
          courseTitle: `Data Science 101 ${uniqueId}`,
          providerSource: "Coursera",
          durationCourse: "6 weeks",
          courseLevel: "Beginner",
          prerequisites: "Basic programming knowledge",
          skillsCovered: "Python, Data Analysis, Machine Learning",
          courseFees: "$300",
          certification: "Yes",
          status: "Active",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error", "Course entry already exists for this student.");
          done();
        });
    });

    it("should return an error for missing required fields", (done) => {
      chai
        .request(app)
        .post("/addCourse")
        .send({
          studentId: uniqueIdStudent,
          courseTitle: `Data Science 101 ${uniqueId}`,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          done();
        });
    });
  });
});


