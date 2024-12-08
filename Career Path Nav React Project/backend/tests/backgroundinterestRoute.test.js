const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Adjust the path to your Express app
const { expect } = chai;

chai.use(chaiHttp);

describe("POST / (Add Degree Record)", () => {
  const uniqueIdStudent = 1; 
  const uniqueId = Date.now(); 
  const testDegreeData = {
    studentid: uniqueIdStudent,
    institutename: `Test University ${uniqueId}`,
    degreelevel: "Bachelor",
    degreetitle: "Computer Science",
    totalmarks: 400,
    obtainedmarks: 350
  };

  it("should add a degree record successfully when all required fields are provided", (done) => {
    chai
      .request(app)
      .post("/addbackground")
      .send(testDegreeData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message", "Record added successfully to Background table");
        done();
      });
  });

  it("should return 400 when required fields are missing", (done) => {
    const missingFieldData = {
      studentid: uniqueIdStudent,
      institutename: "Test University",
      degreelevel: "Bachelor"
      // 'degreetitle', 'totalmarks', 'obtainedmarks' are missing
    };

    chai
      .request(app)
      .post("/addbackground")
      .send(missingFieldData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error", "Missing required fields");
        done();
      });
  });

  it("should return 400 if the degree entry already exists for the student", (done) => {
    // First, insert the same data into the Background table directly to simulate an existing record
    const existingRecordData = {
      studentid: uniqueIdStudent,
      institutename: `Test University ${uniqueId}`,
      degreelevel: "Bachelor",
      degreetitle: "Computer Science",
      totalmarks: 400,
      obtainedmarks: 350
    };

    chai
      .request(app)
      .post("/addbackground")
      .send(existingRecordData)
      .end((err, res) => {
        // Now, make the actual request
        chai
          .request(app)
          .post("/addbackground")
          .send(testDegreeData)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property("error", "This degree entry already exists for the student.");
            done();
          });
      });
  });

});
