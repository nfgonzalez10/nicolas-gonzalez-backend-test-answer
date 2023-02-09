const mongoDBconnection = require("../connections/mongoDBconnection");
const errors = require("../errors/index");

/**
 * @description This method is consider only for test cases
 *
 */
exports.insertTestProducts = async (_req, res) => {
  const mongo = new mongoDBconnection();
  try {
    const docs = [
      { name: "Galletas", price: 1.2, quantity: 20 },
      { name: "Rice", price: 9.2, quantity: 10 },
      { name: "Bread", price: 1.2, quantity: 20 },
    ];
    const database = mongo.currentDatabase();
    const products = database.collection("products");
    const result = await products.insertMany(docs, { ordered: true });
    console.log(
      "🚀 ~ file: productsController.js:18 ~ exports.insertTestProducts= ~ result",
      result.insertedCount
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(
      "🚀 ~ file: productsController.js:24 ~ exports.insertTestProducts= ~ error",
      error
    );
    errors.INTERNAL_SERVER_ERROR(res);
  } finally {
    await mongo.close();
  }
};

exports.getAllProducts = async (_req, res) => {
  let mongo;
  try {
    mongo = new mongoDBconnection();
    const database = mongo.currentDatabase();
    const products = database.collection("products");
    const cursor = products.find();
    let result = [];
    await cursor.forEach((product) => result.push(product));
    res.send(result);
  } catch (error) {
    console.log(
      "🚀 ~ file: productsController.js:24 ~ exports.insertTestProducts= ~ error",
      error
    );
    errors.INTERNAL_SERVER_ERROR(res);
  } finally {
    await mongo.close();
  }
};
