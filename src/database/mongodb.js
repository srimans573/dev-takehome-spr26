require("dotenv").config();
const mongoose = require("mongoose");
const { validSchema } = require("./schema");

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// connection to mongodb
async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(uri, { dbName: dbName });
}

//collection name = "requests"
const Request =
  mongoose.models.Request || mongoose.model("Request", validSchema, "requests");

module.exports = { connectDB, Request };
