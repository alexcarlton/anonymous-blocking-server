import request from "supertest";
import { app } from "./app.mjs";

describe("", () => {
  it("should pass", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });
});
