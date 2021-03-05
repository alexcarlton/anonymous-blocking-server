import jwt from "jsonwebtoken";
import request from "supertest";
import { addSession } from "../../../database/queries/sessions/addSession.mjs";
import { app } from "../../../app.mjs";
import { data } from "../../../database/data.mjs";

const userId = "123";

describe("stopSession", () => {
  it("should remove the session from the database", async () => {
    addSession({
      userId,
      session: {
        endDate: "2021-02-27T11:00:00.000+00:00",
        services: [{ name: "netflix" }],
      },
    });

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    const response = await request(app)
      .delete("/session")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(data.sessions.byUserId[userId]).toEqual(null);
  });
});
