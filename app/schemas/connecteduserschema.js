const mongoose = require("mongoose");

const connectedusershema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
});

const connectedusercollection = mongoose.model(
  "connecteduser",
  connectedusershema
);

module.exports = { connectedusercollection };
