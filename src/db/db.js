const mongoose = require("mongoose");

function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("db is connected.");
  } catch (error) {
    console.log("db is not connected.");
  }
}

module.exports = connectDB;
