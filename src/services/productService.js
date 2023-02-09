const { ObjectId } = require("mongodb");

const mongoDBconnection = require("../connections/mongoDBconnection");
const errors = require("../errors/consts");

exports.verifyQuantity = async (quantity, productId) => {
  if (!productId) throw new ReferenceError(errors.PARAM_REQUIRED);
  let mongo;
  try {
    mongo = new mongoDBconnection();
    const database = mongo.currentDatabase();
    const products = database.collection("products");
    const currentProduct = await products.findOne(
      { _id: new ObjectId(productId) },
      { projection: { quantity: 1 } }
    );

    return currentProduct?.quantity >= quantity;
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

/**
 *
 * @param {Array} productsId
 */
exports.getProducts = async (productsId) => {
  productsId = productsId?.map((product) => new ObjectId(product.productId));
  let mongo;
  try {
    mongo = new mongoDBconnection();
    const database = mongo.currentDatabase();
    const productsModel = database.collection("products");
    const products = productsModel.find({ _id: { $in: productsId } });
    let result = {};
    await products.forEach((product) => {
      result[product._id] = product;
    });
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

/**
 *
 * @param {Array} products
 */
exports.productsPaid = async (products) => {
  for (const product of products) {
    await this.updateProduct(product.quantity, product.productId);
  }
};

/**
 *
 * @param {Array} productsId
 */
exports.updateProduct = async (quantity, productId) => {
  let mongo;
  try {
    mongo = new mongoDBconnection();
    const database = mongo.currentDatabase();
    const products = database.collection("products");
    return products.updateOne(
      { _id: new ObjectId(productId) },
      { $inc: { quantity: -quantity } }
    );
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
