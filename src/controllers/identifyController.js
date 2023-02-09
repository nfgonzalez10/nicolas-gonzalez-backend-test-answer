const identifyServices = require("../services/identifyService");
const mongoDBconnection = require("../connections/mongoDBconnection");
const errors = require("../errors/index");

exports.getToken = (_req, res) => {
  const token = identifyServices.generateToken();
  res.json({ token });
};

exports.newUser = async (req, res) => {
  let mongo;
  try {
    const { email, name } = req?.body;
    if (!email || !name) return res.status(403).send("Request params required");
    mongo = new mongoDBconnection();
    const database = mongo.currentDatabase();
    const users = database.collection("users");
    const newUser = await users.insertOne(
      { email, name, createdAt: Date.now() },
      { ordered: true }
    );
    res.status(200).send(newUser.insertedId);
  } catch (error) {
    errors.INTERNAL_SERVER_ERROR(res);
  } finally {
    await mongo?.close();
  }
};
