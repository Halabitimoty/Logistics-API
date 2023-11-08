const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["rider", "customer"],
      required: true,
    },
  },
  { timestamps: true }
);

const usercollection = mongoose.Collection("user", userschema);

module.exports = { usercollection };
