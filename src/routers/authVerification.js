const identifyService = require("../services/identifyService");

exports.middleVerification = (req, res, next) => {
  try {
    const bearerHeader = req.headers?.authorization;
    if (bearerHeader) {
      const token = bearerHeader?.split(" ")?.pop();
      const verification = identifyService.verifyToken(token);
      console.log(
        "🚀 ~ file: authVerification.js:8 ~ verification",
        verification
      );
      next();
    }
  } catch (error) {
    console.log("🚀 ~ file: authVerification.js:17 ~ error", error);
    res.sendStatus(403);
  }
};
