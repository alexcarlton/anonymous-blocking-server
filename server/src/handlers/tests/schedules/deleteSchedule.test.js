import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../../app.mjs";
import { data } from "../../../database/data.mjs";
import { addSchedule } from "../../../database/queries/schedules/addSchedule.mjs";

describe("deleteSchedule", () => {
  const userId = "123";

  it("should remove a schedule from the database", async () => {
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
      .delete(`/schedules/${scheduleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(data.schedules.byUserId[userId]).toEqual({});
  });

  it("should return a 404 is the schedule is not found", async () => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const scheduleId = "1";

    const response = await request(app)
      .delete(`/schedules/${scheduleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });
});
