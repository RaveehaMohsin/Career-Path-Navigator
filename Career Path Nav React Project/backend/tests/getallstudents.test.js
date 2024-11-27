const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Adjust the path to your Express app
const { expect } = chai;

chai.use(chaiHttp);

describe("GET / (Student Information)", () => {
  const validRole = "Student"; 
  
  it("should return student information for valid students", (done) => {
    chai
      .request(app)
      .get("/getstudents") 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body[0]).to.have.property("userId");
        expect(res.body[0]).to.have.property("firstName");
        expect(res.body[0]).to.have.property("lastName");
        expect(res.body[0]).to.have.property("email");
        expect(res.body[0]).to.have.property("role", validRole);
        done();
      });
  });

});
