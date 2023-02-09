const express = require("express");
const router = express.Router();
const authVerification = require("./authVerification");
const paymentController = require("../controllers/paymentController");

router.post("/users/:userId", authVerification.middleVerification, (req, res) =>
  authVerification.execControllerAndSendErrors(
    req,
    res,
    paymentController.makePayment
  )
);

module.exports = router;
