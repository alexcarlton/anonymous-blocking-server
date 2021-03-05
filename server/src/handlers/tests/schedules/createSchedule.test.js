import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../../app.mjs";
import { data } from "../../../database/data.mjs";

describe("createSchedule", () => {
  const userId = "123";

  it("should add a schedule to the database", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const schedule = {
      name: "Morning Focus",
      type: "repeated",
      services: [{ name: "facebook" }, { name: "reddit" }],
      duration: 120,
      repeats: ["* * 14 * * 1", "* * 14 * * 3"],
    };

    const scheduleId = "1";

    const response = await request(app)
      .post(`/schedules/${scheduleId}`)
      .send(schedule)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(data.schedules.byUserId[userId]).toEqual({
      [scheduleId]: { ...schedule, id: scheduleId },
    });
  });

  it("should return a 400 if the request is not valid", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const schedule = {
      name: "Morning Focus",
      type: "repeated",
      services: "facebook",
      duration: 120,
      repeats: ["* * 14 * * 1", "* * 14 * * 3"],
    };

    const scheduleId = "1";

    const response = await request(app)
      .post(`/schedules/${scheduleId}`)
      .send(schedule)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
  });

  it("should setup the schedule start and end dates (repeated)", () => {});
  it("should setup the schedule start and end dates (one-off)", () => {});
});
