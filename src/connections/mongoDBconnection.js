const { MongoClient } = require("mongodb");
const URI =
  "mongodb+srv://nfgonzalez10:PWDu8mrA27NuFkiW@cluster0.yjdif5h.mongodb.net/?retryWrites=true&w=majority" ??
  "mongodb://localhost:27017";
class MongoDBConnection {
  #client;
  static #database;
  constructor() {
    this.#client = new MongoClient(URI);
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
