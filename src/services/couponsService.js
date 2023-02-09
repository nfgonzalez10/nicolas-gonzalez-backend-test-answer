const { ObjectId } = require("mongodb");
const crypto = require("crypto");
const MongoDBConnection = require("../connections/mongoDBconnection");

exports.generateCoupon = () => {
  const newCoupon = {
    _id: new ObjectId(),
    code: crypto.randomUUID(),
    createdAt: Date.now(),
    from: Date.now(),
    until: Date.now() + 2.628 * Math.pow(10, 9),
    discount: Math.floor(Math.random() * 100),
  };
  return newCoupon;
};

exports.saveCoupon = async (newCoupon) => {
  let mongo;
  try {
    mongo = new MongoDBConnection();
    const database = mongo.currentDatabase();
    const coupons = database.collection("coupons");
    const couponResult = await coupons.insertOne(newCoupon);
    return couponResult.insertedId;
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

exports.verifyCoupon = async (code) => {
  let mongo;
  try {
    mongo = new MongoDBConnection();
    const database = mongo.currentDatabase();
    const coupons = database.collection("coupons");
    const couponResult = await coupons.findOne({ code });
    return couponResult &&
      couponResult.until > Date.now() &&
      couponResult.from < Date.now() &&
      !couponResult?.applied
      ? couponResult._id
      : false;
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

exports.couponApplied = async (couponId) => {
  let mongo;
  try {
    mongo = new MongoDBConnection();
    const database = mongo.currentDatabase();
    const coupons = database.collection("coupons");
    const couponResult = await coupons.updateOne(
      { _id: new ObjectId(couponId) },
      { $set: { applied: true } }
    );
    return Boolean(couponResult.modifiedCount);
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
