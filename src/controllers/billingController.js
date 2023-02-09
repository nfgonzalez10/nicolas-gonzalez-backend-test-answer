const { getBilling } = require("../services/billingService");

exports.getBilling = async (req, res) => {
  const bill = await getBilling(req.params.basketId);
  res.status(200).json(bill);
};
