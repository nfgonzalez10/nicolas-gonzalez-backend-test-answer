const mongoDBconnection = require("../connections/mongoDBconnection");
const productService = require("./productService");
const errors = require("../errors/consts");
const { ObjectId } = require("mongodb");
const { verifyCoupon, couponApplied } = require("./couponsService");

/**
 *
 * @param {ObjectId} productId
 * @param {Array} products
 */
const findProductInBasket = (productId, products) => {
  return products?.findIndex((product) => {
    return product.productId === productId;
  });
};

exports.addNewProductsToBasket = async ({ userId, productId, quantity }) => {
  if (!userId || !productId) throw new ReferenceError(errors.PARAM_REQUIRED);
  let mongo;
  const isEnableProduct = await productService.verifyQuantity(
    quantity,
    productId
  );
  if (!isEnableProduct) throw new ReferenceError(errors.PRODUCT_NOT_ENABLE);
  const basket = await this.currentBasket(userId);
  let indexProduct = findProductInBasket(productId, basket.products);
  let product = null;
  if (indexProduct > -1) {
    product = basket?.products[indexProduct];
    basket?.products?.splice(indexProduct, 1);
  }
  product = {
    productId,
    quantity: product?.quantity ? product.quantity + quantity : quantity,
  };
  basket.products?.push(product);
  try {
    mongo = new mongoDBconnection();
    const database = mongo.currentDatabase();
    const baksetModel = database.collection("baskets");
    await baksetModel.updateOne(
      { _id: new ObjectId(basket?._id) },
      { $set: { products: basket.products, updatedAt: Date.now() } }
    );
    return basket;
  } catch (error) {
    console.log(
      "🚀 ~ file: purchasesService.js:16 ~ exports.addNewProductsToBasket= ~ error",
      error
    );
  } finally {
    await mongo.close();
  }
};

exports.currentBasket = async (userId) => {
  let mongo;
  try {
    mongo = new mongoDBconnection();
    const database = mongo.currentDatabase();
    const baksetModel = database.collection("baskets");
    let basket = await baksetModel.findOne({
      userId: new ObjectId(userId),
      status: "CURRENT",
    });
    if (!basket) {
      basket = {
        userId: new ObjectId(userId),
        createdAt: Date.now(),
        products: [],
        status: "CURRENT",
      };
      const result = await baksetModel.insertOne(basket);
      basket._id = result?.insertedId;
    }
    return basket;
  } catch (error) {
    console.log(
      "🚀 ~ file: purchasesService.js:29 ~ exports.currentBasket= ~ error",
      error
    );
    throw error;
  } finally {
    await mongo?.close();
  }
};

exports.addCouponToBakset = async (code, basketId) => {
  if (!basketId || !code) throw new ReferenceError(errors.PARAM_REQUIRED);
  const isValidCoupon = await verifyCoupon(code);
  if (!isValidCoupon) throw new ReferenceError(errors.INVALID_COUPON);
  let mongo;
  try {
    mongo = new mongoDBconnection();
    const database = mongo.currentDatabase();
    const baksetModel = database.collection("baskets");
    let basket = await baksetModel.updateOne(
      {
        _id: new ObjectId(basketId),
        status: "CURRENT",
      },
      { $set: { couponId: new ObjectId(isValidCoupon) } }
    );
    let result = false;
    if (Boolean(basket?.modifiedCount)) {
      result = await couponApplied(isValidCoupon);
    }
    if (!result) {
      throw new Error(errors.CUPON_NOT_APPLIED);
    }
    return result;
  } catch (error) {
    console.log(
      "🚀 ~ file: purchasesService.js:29 ~ exports.currentBasket= ~ error",
      error
    );
    throw error;
  } finally {
    await mongo?.close();
  }
};

exports.isBasketForBilling = async (basketId) => {
  let mongo;
  try {
    mongo = new mongoDBconnection();
    const database = mongo.currentDatabase();
    const baksetModel = database.collection("baskets");
    let basket = await baksetModel.findOne({
      _id: new ObjectId(basketId),
      status: "PAID",
    });
    if (!Boolean(basket)) {
      throw new Error(errors.BILLING_CAN_NOT_BE_GENERATED);
    }
    return basket;
  } catch (error) {
    console.log(
      "🚀 ~ file: purchasesService.js:29 ~ exports.currentBasket= ~ error",
      error
    );
    throw error;
  } finally {
    await mongo?.close();
  }
};
