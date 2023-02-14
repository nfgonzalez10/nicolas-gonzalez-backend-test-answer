const constants = require("./consts");

exports.INTERNAL_SERVER_ERROR = (res) => res.sendStatus(500);

exports.ERRORS = {
  [constants.PARAM_REQUIRED]: {
    statusCode: 403,
    message: constants.PARAM_REQUIRED,
  },
  [constants.PRODUCT_NOT_ENABLE]: {
    statusCode: 404,
    message: constants.PRODUCT_NOT_ENABLE,
  },
  [constants.CUPON_NOT_APPLIED]: {
    statusCode: 403,
    message: constants.CUPON_NOT_APPLIED,
  },
  [constants.PAYMENT_NOT_PROCESSED]: {
    statusCode: 406,
    message: constants.PAYMENT_NOT_PROCESSED,
  },
  [constants.AUTH_FAILLED]: {
    statusCode: 403,
    message: constants.AUTH_FAILLED,
  },
  [constants.INVALID_COUPON]: {
    statusCode: 403,
    message: constants.INVALID_COUPON,
  },
};
