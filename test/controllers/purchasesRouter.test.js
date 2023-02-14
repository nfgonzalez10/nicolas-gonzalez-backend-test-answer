const request = require("supertest");

describe("Product test controller", () => {
  beforeAll(async () => {
    const responseToken = await request(global.app).get(
      `${global.API_V1}identify/token`
    );
    global.token = JSON.parse(responseToken.text).token;
    const responseUser = await request(global.app)
      .post(`${global.API_V1}identify/user`)
      .send({ email: "tes@gmail.com", name: "Testing name" })
      .set("Authorization", `Baerer ${global.token}`);

    global.USER_ID = JSON.parse(responseUser.text);
    let products = await request(global.app)
      .get(`${global.API_V1}products`)
      .set("Authorization", `Baerer ${global.token}`);

    global.products = JSON.parse(products.text);
  });
  it("Insert a new product in basket for user", async () => {
    const product =
      global.products[Math.floor(Math.random() * global.products.length)];

    const response = await request(global.app)
      .put(
        `${global.API_V1}purchases/users/${global.USER_ID}/products/${product?._id}`
      )
      .set("Authorization", `Baerer ${global.token}`)
      .send({ quantity: Math.floor(Math.random() * Number(product.quantity)) });
    global.basketId = JSON.parse(response.text)._id;
    expect(response.statusCode).toEqual(200);
  });

  it("Insert new products in basket for user", async () => {
    for (let index = 0; index < 3; index++) {
      const product =
        global.products[Math.floor(Math.random() * global.products.length)];

      const response = await request(global.app)
        .put(
          `${global.API_V1}purchases/users/${global.USER_ID}/products/${product?._id}`
        )
        .set("Authorization", `Baerer ${global.token}`)
        .send({
          quantity: Math.floor(Math.random() * Number(product.quantity)),
        });

      expect(response.statusCode).toEqual(200);
    }
  });

  it("Coupon not valid ~ Failled 403", async () => {
    const response = await request(global.app)
      .put(`${global.API_V1}purchases/baskets/${global.basketId}/coupon/ajsjs`)
      .set("Authorization", `Baerer ${global.token}`);

    expect(response.statusCode).toEqual(403);
  });

  it("Coupon valid ~ Success 200", async () => {
    const couponResponse = await request(global.app)
      .post(`${global.API_V1}coupons/`)
      .set("Authorization", `Baerer ${global.token}`);
    global.coupon = JSON.parse(couponResponse.text).code;
    const response = await request(global.app)
      .put(
        `${global.API_V1}purchases/baskets/${global.basketId}/coupon/${global.coupon}`
      )
      .set("Authorization", `Baerer ${global.token}`);

    expect(response.statusCode).toEqual(200);
  });
});
