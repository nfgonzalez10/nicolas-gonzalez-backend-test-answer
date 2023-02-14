const request = require("supertest");

describe("Product test controller", () => {
  beforeAll(async () => {
    const response = await request(global.app).get(
      `${global.API_V1}identify/token`
    );
    global.token = JSON.parse(response.text).token;
  });
  it("Insert new products ~ Failure 403 Missing params", async () => {
    const response = await request(global.app).post(`${global.API_V1}products`);
    expect(response.statusCode).toEqual(403);
  });

  it("Insert new products ~ Success 200", async () => {
    const response = await request(global.app)
      .post(`${global.API_V1}products`)
      .set("Authorization", `Baerer ${global.token}`);

    expect(response.statusCode).toEqual(200);
  });

  it("Get products ~ Success 200", async () => {
    const response = await request(global.app)
      .get(`${global.API_V1}products`)
      .set("Authorization", `Baerer ${global.token}`);

    expect(response.statusCode).toEqual(200);
  });
});
