const express = require("express");
const router = express.Router();
const authVerification = require("./authVerification");
const billingController = require("../controllers/billingController");

router.get(
  "/baskets/:basketId",
  authVerification.middleVerification,
  (req, res) =>
    authVerification.execControllerAndSendErrors(
      req,
      res,
      billingController.getBilling
    )
);

module.exports = router;
