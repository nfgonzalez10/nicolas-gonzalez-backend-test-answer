const paymentService = require("../services/paymentService");

exports.makePayment = async (req, res) => {
  await paymentService.paymentCurrentBasket(req.params.userId);
  res.sendStatus(200);
};
