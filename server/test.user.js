const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");

describe("app", () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect("mongodb://localhost:27017/budgetify");
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /test", () => {
    it("should return newly created user object!", async () => {
      const response = await supertest(app).post("/users");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Hello World!");
      expect(response.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });
});
