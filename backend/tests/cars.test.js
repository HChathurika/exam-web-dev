const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

let token;

describe("Car API", () => {
  beforeAll(async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({
        name: "Car User",
        email: "caruser@example.com",
        password: "StrongPass123!",
        role: "user",
        githubUsername: "cargit",
        phoneNumber: "1234567890",
        bio: "Car test user",
      });

    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should create a car (protected route)", async () => {
    const res = await request(app)
      .post("/api/cars")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Corolla",
        vin: "VIN123456",
        year: 2022,
        condition: "Excellent",
        location: "Garage B2",
        availability: {
          isAvailable: true,
        },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.make).toBe("Toyota");
  });

  test("should get all cars (public route)", async () => {
    const res = await request(app).get("/api/cars");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
