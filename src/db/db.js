const mongoose = require("mongoose");

let isConnected = false;

function connectDB() {
  try {
    if (isConnected) return;
    mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("db is connected.");
  } catch (error) {
    console.log("db is not connected.");
  }
}

module.exports = connectDB;
