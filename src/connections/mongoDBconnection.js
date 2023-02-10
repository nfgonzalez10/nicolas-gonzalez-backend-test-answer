const { MongoClient } = require("mongodb");
const URI = process.env.ME_CONFIG_MONGODB_URL;

class MongoDBConnection {
  #client;
  static #database;
  constructor() {
    this.#client = new MongoClient(URI);
    this.open();
  }
  open() {
    try {
      MongoDBConnection.#database = this.#client.db("meridian_group");
    } catch (error) {
      console.log(
        "🚀 ~ file: mongoDBconnection.js:13 ~ MongoDBConnection ~ connection ~ error",
        error
      );
      throw new Error("Erro open connection DB");
    }
  }

  currentDatabase() {
    return MongoDBConnection.#database;
  }
  close() {
    return this.#client.close();
  }
}

module.exports = MongoDBConnection;
