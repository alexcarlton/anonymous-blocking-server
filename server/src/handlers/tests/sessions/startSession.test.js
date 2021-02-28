import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../../../app.mjs";
import { data } from "../../../database/data.mjs";
import { addSession } from "../../../database/queries/sessions/addSession.mjs";

describe("startSession", () => {
  const userId = "123";

  it("should add a session to the database", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const endDate = "2021-02-27T09:00:00.000+00:00";
    const services = [{ name: "facebook" }, { name: "reddit" }];

    const response = await request(app)
      .post("/session")
      .send({ endDate, services })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);

    expect(data.sessions.byUserId[userId]).toEqual({ endDate, services });
  });

  it("should overwrite any existing session", async () => {
    addSession({
      userId,
      session: {
        endDate: "2021-02-27T11:00:00.000+00:00",
        services: [{ name: "netflix" }],
      },
    });

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const endDate = "2021-02-27T09:00:00.000+00:00";
    const services = [{ name: "facebook" }, { name: "reddit" }];

    const response = await request(app)
      .post("/session")
      .send({ endDate, services })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(data.sessions.byUserId[userId]).toEqual({ endDate, services });
  });

  it("should return 400 if the request is not valid", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const incorrectServices = ["facebook", "netflix"];

    const response = await request(app)
      .post("/session")
      .send({ services: incorrectServices })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
  });

  it("should remove the schedule once the endDate is reached", () => {});
});
