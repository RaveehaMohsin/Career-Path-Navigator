const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Path to your Express app
const { expect } = chai;

chai.use(chaiHttp);

describe('User Routes', () => {
    it("should show missing field", (done) => {
        chai.request(app)
            .post("/addauthuser")
            .send({
                firstName: "John",
                email: "john@example.com",
                role: "user",
                password: "password123"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it("should create a new user", (done) => {
        chai.request(app)
            .post("/addauthuser")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                role: "user",
                password: "password123"
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property("message", "User registered successfully");
                done();
            });
    });
    
});
