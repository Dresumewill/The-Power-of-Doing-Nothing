/*const request = require("supertest");
const mysql = require("mysql2");
const app = require("./server");*/

/**
 * Mock MySQL
 */
/*jest.mock("mysql2", () => {
  const execute = jest.fn();
  return {
    createConnection: jest.fn(() => ({
      connect: jest.fn(),
      execute
    }))
  };
});

describe("POST /leads", () => {
  let executeMock;

  beforeEach(() => {
    executeMock = mysql.createConnection().execute;
    executeMock.mockReset();
  });

  it("should save a lead successfully", async () => {
    executeMock.mockImplementation((sql, values, cb) => cb(null));

    const res = await request(app)
      .post("/leads")
      .send({
        full_name: "John Doe",
        email: "john@example.com",
        primary_goal: "Improve focus",
        source: "Landing Page"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Lead saved successfully");
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/leads")
      .send({
        email: "john@example.com"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Missing required fields");
  });

  it("should return 409 if email already exists", async () => {
    executeMock.mockImplementation((sql, values, cb) =>
      cb({ code: "ER_DUP_ENTRY" })
    );

    const res = await request(app)
      .post("/leads")
      .send({
        full_name: "John Doe",
        email: "john@example.com",
        primary_goal: "Improve focus"
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Email already exists");
  });

  it("should return 500 on database error", async () => {
    executeMock.mockImplementation((sql, values, cb) =>
      cb(new Error("DB failed"))
    );

    const res = await request(app)
      .post("/leads")
      .send({
        full_name: "John Doe",
        email: "john@example.com",
        primary_goal: "Improve focus"
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Database error");
  });
});*/

const request = require("supertest");

/* Mock mysql2 */
jest.mock("mysql2", () => ({
  createConnection: () => ({
    connect: jest.fn(),
    execute: jest.fn((sql, values, cb) => cb(null))
  })
}));

// Real tests
describe("POST /leads", () => {

  test("returns 201 when lead is valid", async () => {
    const res = await request(app)
      .post("/leads")
      .send({
        full_name: "Ada Obi",
        email: "ada@example.com",
        primary_goal: "Reduce burnout"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Lead saved successfully");
  });

  test("returns 400 when fields are missing", async () => {
    const res = await request(app)
      .post("/leads")
      .send({
        email: "test@example.com"
      });

    expect(res.statusCode).toBe(400);
  });
});

const app = require("./app");

