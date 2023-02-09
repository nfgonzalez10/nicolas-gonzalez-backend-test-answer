const express = require("express");
const router = express.Router();
const authVerification = require("./authVerification");
const purchasesController = require("../controllers/purchasesController");

router.put(
  "/users/:userId/products/:productId",
  authVerification.middleVerification,
  (req, res) =>
    authVerification.execControllerAndSendErrors(
      req,
      res,
      purchasesController.addProductPurchases
    )
);

router.put(
  "/baskets/:basketId/coupon/:couponId",
  authVerification.middleVerification,
  (req, res) =>
    authVerification.execControllerAndSendErrors(
      req,
      res,
      purchasesController.addCouponToPurchase
    )
);


module.exports = router;
