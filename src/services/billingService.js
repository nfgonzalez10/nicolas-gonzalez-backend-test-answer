const { ObjectId } = require("mongodb");
const MongoDBConnection = require("../connections/mongoDBconnection");
const purchasesService = require("./purchasesService");
const productService = require("./productService");
const errors = require("../errors/consts");

exports.generateBilling = async (basketId) => {
  let mongo;
  try {
    mongo = new MongoDBConnection();
    const database = mongo.currentDatabase();
    const basket = await purchasesService.isBasketForBilling(basketId);
    if (!basket) {
      throw new Error(errors.BILLING_CAN_NOT_BE_GENERATED);
    }
    const billing = await buildBilling(basket);
    const billingModel = database.collection("billing");
    const resutl = await billingModel.insertOne(billing);

    return { _id: resutl.insertedId, ...billing };
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

const buildBilling = async (basket) => {
  const billing = {
    basketId: new ObjectId(basket?._id),
  };
  const [productInformation, coupon] = await Promise.all([
    productService.getProducts(basket.products),
    getDiscount(basket.couponId),
  ]);
  let discount = 0;
  if (coupon) {
    billing.coupon = coupon;
  }
  let totalBilling = 0;
  for (const product of basket.products) {
    const infoProduct = productInformation[product.productId];
    const totalPrice = Number(product.quantity) * Number(infoProduct.price);

    billing[`${infoProduct.name} - ${infoProduct._id}`] = {
      quantity: product.quantity,
      price: Number(infoProduct.price),
      totalPrice,
    };
    totalBilling += totalPrice;
  }
  billing.totalDiscount = (discount * totalBilling) / 100;
  billing.totalBilling = totalBilling;
  billing.totalToPay = totalBilling - billing.totalDiscount;
  return billing;
};

const getDiscount = async (discountId) => {
  let mongo;
  try {
    mongo = new MongoDBConnection();
    const database = mongo.currentDatabase();
    const coupons = database.collection("coupons");
    const couponResponse = await coupons.findOne(
      { _id: new ObjectId(discountId) },
      { projection: { discount: 1 } }
    );
    return couponResponse;
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

exports.getBilling = async (basketId) => {
  if (!basketId) {
    throw new Error(errors.PARAM_REQUIRED);
  }
  let mongo;
  try {
    mongo = new MongoDBConnection();
    const database = mongo.currentDatabase();
    const billingModel = database.collection("billing");
    const resutl = await billingModel.findOne({
      basketId: new ObjectId(basketId),
    });

    return resutl;
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
