// const { MongoClient } = require("mongodb");
let { client } = require("../connections/mongodb_conn");
const debug = require("debug")("app:sessionRepository");

async function loadDB() {
  let db;

  try {
    // const client = await client.connect('mongodb://localhost:27017/');
    client = await client.connect(); // No need to close this connection as MongoClient is using connection pooling
    db = client.db("globomantics");
    debug("Returned globomantics DB object from Mongo server ...", db);
  } catch (error) {
    debug("Error thrown while cnnecting to db", error);
  }

  return db;
}

module.exports = loadDB;
