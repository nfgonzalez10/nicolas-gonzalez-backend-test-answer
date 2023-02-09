const identifyService = require("../services/identifyService");
const errors = require("../errors/index");
const consts = require("../errors/consts");

exports.middleVerification = (req, res, next) => {
  try {
    const bearerHeader = req.headers?.authorization;
    if (bearerHeader) {
      const token = bearerHeader?.split(" ")?.pop();
      identifyService.verifyToken(token);
      next();
    }
  } catch (error) {
    console.log("🚀 ~ file: authVerification.js:17 ~ error", error);
    res.sendStatus(403);
  }
};

exports.execControllerAndSendErrors = async (req, res, controllerCallBack) => {
  try {
    await controllerCallBack(req, res);
  } catch (errorLog) {
    console.log("🚀 ~ file: authVerification.js:27 ~ errorLog", errorLog);
    const handleError = errors.ERRORS[errorLog?.message] ?? {
      statusCode: 500,
      message: consts.INTERNAL_SERVER_ERROR,
    };
    res.status(handleError.statusCode).send(handleError.message);
  }
};
