const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: {
      type: String,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    address: [
      {
        fullName: { type: String },
        phone: { type: String },
        street: { type: String },
        city: { type: String },
        zip: { type: Number },
        addressType: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
