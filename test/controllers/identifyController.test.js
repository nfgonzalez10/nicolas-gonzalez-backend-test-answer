const request = require("supertest");
const { ObjectId } = require("mongodb");

describe("Identify Controller", () => {
  it("Get token", async () => {
    const response = await request(global.app).get(
      `${global.API_V1}identify/token`
    );
    global.token = JSON.parse(response.text).token;
    expect(response.statusCode).toEqual(200);
  });
  it("Insert new user ~ Failure 403 Missing params", async () => {
    const response = await request(global.app)
      .post(`${global.API_V1}identify/user`)
      .set("Authorization", `Baerer ${global.token}`);
    expect(response.statusCode).toEqual(403);
  });
  it("Insert new user ~ Success 200 New user", async () => {
    const response = await request(global.app)
      .post(`${global.API_V1}identify/user`)
      .send({ email: "tes@gmail.com", name: "Testing name" })
      .set("Authorization", `Baerer ${global.token}`);

    global.USER_ID = JSON.parse(response.text);
    expect(String(new ObjectId(global.USER_ID)) === global.USER_ID).toEqual(
      true
    );
    expect(response.statusCode).toEqual(200);
  });
  it("Insert new user ~ Forbidden 403 New user", async () => {
    const response = await request(global.app)
      .post(`${global.API_V1}identify/user`)
      .send({ email: "tes@gmail.com", name: "Testing name" });

    expect(response.statusCode).toEqual(403);
  });
});
