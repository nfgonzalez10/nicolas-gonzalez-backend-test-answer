const couponsService = require("../services/couponsService");

exports.addCoupon = async (_req, res) => {
  const coupon = couponsService.generateCoupon();
  const resultCoupon = await couponsService.saveCoupon(coupon);
  res.status(200).send({ _id: resultCoupon, ...coupon });
};
