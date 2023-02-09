const identifyServices = require("../services/identifyService");

exports.getToken = (_req, res) => {
  const token = identifyServices.generateToken();
  res.json({ token });
};
