const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");

const variables = {
  userId: null,
  token: null,
};

beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe("POST /users", () => {
  test("It should return a message and the newly created user", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        email: "bear@gmail.com",
        password: "bearPassword",
        name: {
          firstName: "Bear",
          lastName: "Polar",
        },
      });

    variables.userId = response.body.user?._id ?? null;

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "User successfully created!",
        user: expect.objectContaining({
          name: expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
          }),
          email: expect.any(String),
        }),
      })
    );
  });
});

describe("POST /login", () => {
  test("It should return a user token", async () => {
    const response = await supertest(app).post("/login").send({
      email: "bear@gmail.com",
      password: "bearPassword",
    });

    variables.token = response.body;

    expect(response.body).toEqual(expect.any(String));
  });
});

describe("GET /users/userId", () => {
  test("It should return a user", async () => {
    const response = await supertest(app)
      .get(`/users/${variables.userId}`)
      .set("Authorization", variables.token);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: expect.objectContaining({
          firstName: "Bear",
          lastName: "Polar",
        }),
        email: expect.any(String),
      })
    );
  });
});

describe("PUT /users/userId", () => {
  test("It should return a message and the newly updated user", async () => {
    const response = await supertest(app)
      .put(`/users/${variables.userId}`)
      .set("Authorization", variables.token)
      .send({
        name: {
          firstName: "Bear (changed)",
          lastName: "Polar",
        },
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "User is successfully updated!",
        user: expect.objectContaining({
          name: expect.objectContaining({
            firstName: "Bear (changed)",
            lastName: "Polar",
          }),
        }),
      })
    );
  });
});

describe("DELETE /users/userId", () => {
  test("It should delete a user", async () => {
    const response = await supertest(app)
      .delete(`/users/${variables.userId}`)
      .set("Authorization", variables.token);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "User is successfully deleted!",
        deletedCount: 1,
      })
    );
  });
});
