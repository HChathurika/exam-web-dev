const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("User API", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("signup works with strong password", async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({
        name: "Signup User",
        email: "signupuser@example.com",
        password: "StrongPass123!",
        role: "user",
        githubUsername: "signupgit",
        phoneNumber: "1234567890",
        bio: "Signup test",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("login works with correct credentials", async () => {
    // ensure user exists
    await request(app)
      .post("/api/users/signup")
      .send({
        name: "Login User",
        email: "loginuser@example.com",
        password: "StrongPass123!",
        role: "user",
        githubUsername: "logingit",
        phoneNumber: "1234567890",
        bio: "Login test",
      });

    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "loginuser@example.com",
        password: "StrongPass123!",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("signup fails with weak password", async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({
        name: "Weak User",
        email: "weakuser@example.com",
        password: "123",
        role: "user",
        githubUsername: "weakgit",
        phoneNumber: "1234567890",
        bio: "Weak password",
      });

    expect(res.statusCode).toBe(400);
  });
});
