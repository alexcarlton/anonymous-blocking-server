import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../../app.mjs";
import { data, resetData } from "../../../database/data.mjs";
import { addSchedule } from "../../../database/queries/schedules/addSchedule.mjs";

describe("createSchedule", () => {
  beforeEach(() => {
    resetData();
  });

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

    const scheduleFromDb = data.schedules.byUserId[userId][scheduleId];

    expect(scheduleFromDb.id).toEqual(scheduleId);
    expect(scheduleFromDb.isActive).toEqual(false);
    expect(Array.isArray(scheduleFromDb.jobs)).toBe(true);

    expect(scheduleFromDb.name).toEqual(schedule.name);
    expect(scheduleFromDb.type).toEqual(schedule.type);
    expect(scheduleFromDb.services).toEqual(schedule.services);
    expect(scheduleFromDb.duration).toEqual(schedule.duration);
    expect(scheduleFromDb.repeats).toEqual(schedule.repeats);
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

  it("should return a 409 if a schedule already exists with the sent id", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const schedule = {
      name: "Morning Focus",
      type: "repeated",
      services: [{ name: "facebook" }, { name: "reddit" }],
      duration: 120,
      repeats: ["* * 14 * * 1", "* * 14 * * 3"],
    };

    const scheduleId = "1";

    addSchedule({ userId, schedule: { ...schedule, id: scheduleId } });

    const response = await request(app)
      .post(`/schedules/${scheduleId}`)
      .send(schedule)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(409);
  });
});
