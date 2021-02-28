import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../app.mjs";

describe("Auth", () => {
  it("should return 401 if the request is sent with no Auth token", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(401);
  });

  it("should return 401 with a token that cannot be verified", async () => {
    const incorrectToken = jwt.sign({ id: "123" }, "incorrect-jwt-secret-key");

    const response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${incorrectToken}`);

    expect(response.statusCode).toBe(401);
  });

  it("should return 400 if the JWT does not contain an id key", async () => {
    const token = jwt.sign({ randomKey: "123" }, process.env.JWT_SECRET);

    const response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
  });

  it("should return 200 if the request is sent with a token that can be verified", async () => {
    const token = jwt.sign({ id: "123" }, process.env.JWT_SECRET);

    const response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});
