const { ObjectId } = require("mongodb");
const MongoDBConnection = require("../connections/mongoDBconnection");
const errors = require("../errors/consts");
const { generateBilling } = require("./billingService");
const { productsPaid } = require("./productService");

/**
 * This file enable to devs add all relate to payment
 *
 */

/**
 *
 * @param {*} userId
 */
exports.paymentCurrentBasket = async (userId) => {
  let mongo;
  try {
    mongo = new MongoDBConnection();
    const database = mongo.currentDatabase();
    const baksetModel = database.collection("baskets");
    let basket = await baksetModel.updateOne(
      {
        userId: new ObjectId(userId),
        status: "CURRENT",
      },
      { $set: { status: "PAID", updatedAt: Date.now() } }
    );
    if (!Boolean(basket.modifiedCount)) {
      throw new Error(errors.PAYMENT_NOT_PROCESSED);
    }
    const basketPaid = await baksetModel.findOne(
      { userId: new ObjectId(userId) },
      { sort: { updatedAt: -1 } }
    );
    await productsPaid(basketPaid.products);
    await generateBilling(basketPaid._id);
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
