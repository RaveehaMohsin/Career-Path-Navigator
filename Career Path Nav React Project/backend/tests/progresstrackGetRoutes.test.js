const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Adjust the path to your Express app
const { expect } = chai;

chai.use(chaiHttp);

describe("Student API Endpoints", () => {
  const studentIdValid = 1; // Replace with a valid student ID in your database
  const studentIdInvalid = 99999; // Replace with an invalid ID for testing
  
  describe("GET /getProgresses/getjobs/:studentId", () => {
    it("should return jobs for a valid student ID", (done) => {
      chai
        .request(app)
        .get(`/getProgresses/getjobs/${studentIdValid}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("jobs");
          expect(res.body.jobs).to.be.an("array");
          done();
        });
    });

    it("should return 404 for an invalid student ID", (done) => {
      chai
        .request(app)
        .get(`/getProgresses/getjobs/${studentIdInvalid}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("message", "No jobs found for this student.");
          done();
        });
    });
  });

  describe("GET /getcourses/:studentId", () => {
    it("should return courses for a valid student ID", (done) => {
      chai
        .request(app)
        .get(`/getProgresses/getcourses/${studentIdValid}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("courses");
          expect(res.body.courses).to.be.an("array");
          done();
        });
    });

    it("should return 404 for an invalid student ID", (done) => {
      chai
        .request(app)
        .get(`/getProgresses/getcourses/${studentIdInvalid}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("message", "No courses found for this student.");
          done();
        });
    });
  });

  describe("GET /getProgresses/getdegrees/:studentId", () => {
    it("should return degrees for a valid student ID", (done) => {
      chai
        .request(app)
        .get(`/getProgresses/getdegrees/${studentIdValid}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("degrees");
          expect(res.body.degrees).to.be.an("array");
          done();
        });
    });

    it("should return 404 for an invalid student ID", (done) => {
      chai
        .request(app)
        .get(`/getProgresses/getdegrees/${studentIdInvalid}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("message", "No degrees found for this student.");
          done();
        });
    });
  });
});

