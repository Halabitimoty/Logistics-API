const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const serviceshema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    riderId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      default: null,
    },
    socketId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    destaddress: {
      type: String,
      required: true,
    },
    itemweight: {
      type: Number,
      required: true,
    },
    shippingcost: {
      type: Number,
      default: 1000,
    },
    shippingrequest: {
      type: String,
      enum: ["pending", "in-transit", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

serviceshema.plugin(paginate);

const servicecollection = mongoose.model("service", serviceshema);

module.exports = { servicecollection };
