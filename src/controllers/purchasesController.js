const purchasesServices = require("../services/purchasesService");

exports.addProductPurchases = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  const quantity = req.body.quantity ?? 0;
  const basket = await purchasesServices.addNewProductsToBasket({
    userId,
    productId,
    quantity,
  });
  res.status(200).send(basket);
};

exports.addCouponToPurchase = async (req, res) => {
  const basketId = req.params.basketId;
  const coupon = req.params.couponId;
  const result = await purchasesServices.addCouponToBakset(coupon, basketId);
  res.sendStatus(200);
};
