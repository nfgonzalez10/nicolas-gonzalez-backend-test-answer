const { default: expect } = require("expect");
const {
  generateToken,
  verifyToken,
} = require("../../src/services/identifyService");

describe("Identify Services", () => {
  it("Generate Toke", () => {
    const token = generateToken();
    const verified = verifyToken(token);
    console.log(
      "🚀 ~ file: identifySerivices.test.js:11 ~ it ~ verified",
      verified
    );
    expect(verified.user.userEmail).toEqual("example@gmail.com");
  });
});
