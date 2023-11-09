const mongoose = require("mongoose");

const connectedusershema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const connectedusercollection = mongoose.model(
  "connecteduser",
  connectedusershema
);

module.exports = { connectedusercollection };
