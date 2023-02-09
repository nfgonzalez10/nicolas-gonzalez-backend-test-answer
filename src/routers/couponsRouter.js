const express = require("express");
const router = express.Router();
const authVerification = require("./authVerification");
const couponsController = require("../controllers/couponsController");

router.post("", authVerification.middleVerification, (req, res) =>
  authVerification.execControllerAndSendErrors(
    req,
    res,
    couponsController.addCoupon
  )
);

module.exports = router;
