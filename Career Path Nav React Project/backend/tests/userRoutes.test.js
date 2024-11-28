const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Path to your Express app
const { expect } = chai;

chai.use(chaiHttp);

describe('User Authentication Routes', () => {
    // Test for addauthuser route
    describe('POST /addauthuser', () => {
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
                    firstName: "Jane",
                    lastName: "Doe",
                    email: `unique${Date.now()}@example.com`, // Use a unique email for every test run
                    role: "user",
                    password: "password123"
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property("message", "User registered successfully");
                    done();
                });
        });

        it("should return an error for duplicate email", (done) => {
            const email = `duplicate${Date.now()}@example.com`;
            chai.request(app)
                .post("/addauthuser")
                .send({
                    firstName: "Jane",
                    lastName: "Doe",
                    email: email,
                    role: "user",
                    password: "password123"
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    chai.request(app)
                        .post("/addauthuser")
                        .send({
                            firstName: "Jane",
                            lastName: "Doe",
                            email: email, // Duplicate email
                            role: "user",
                            password: "password123"
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(400);
                            expect(res.body).to.have.property("error", "Email is already registered.");
                            done();
                        });
                });
        });


        it("should handle SQL injection attempts", (done) => {
            chai.request(app)
                .post("/addauthuser")
                .send({
                    firstName: "Hacker",
                    lastName: "Test",
                    email: "test@example.com' OR '1'='1",
                    role: "user",
                    password: "password123"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    // Test for getauthuser route
    describe('POST /getauthuser', () => {
        it("should authenticate a valid user", (done) => {
            chai.request(app)
                .post("/getauthuser")
                .send({ email: "mohsinraveeha@gmail.com", password: "raveeha123" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.user).to.have.property("email", "mohsinraveeha@gmail.com");
                    done();
                });
        });

        it("should return error for invalid email", (done) => {
            chai.request(app)
                .post("/getauthuser")
                .send({ email: "ra@gmail.com", password: "password123" })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property("error", "Invalid email or password");
                    done();
                });
        });

        it("should return error for invalid password", (done) => {
            chai.request(app)
                .post("/getauthuser")
                .send({ email: "john@example.com", password: "wrongpassword" })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property("error", "Invalid email or password");
                    done();
                });
        });

        it("should return error for missing fields", (done) => {
            chai.request(app)
                .post("/getauthuser")
                .send({ email: "john@example.com" }) // Missing password
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("error", "Email and password are required");
                    done();
                });
        });

        it("should return error for empty request body", (done) => {
            chai.request(app)
                .post("/getauthuser")
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("error", "Email and password are required");
                    done();
                });
        });

        it("should handle SQL injection attempts", (done) => {
            chai.request(app)
                .post("/getauthuser")
                .send({ email: "test@example.com' OR '1'='1", password: "any" })
                .end((err, res) => {
                    expect(res).to.have.status(401); 
                    done();
                });
        });
    });
});
