const mongoose = require("mongoose");

const serviceshema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    riderId: {
      type: mongoose.Types.ObjectId,
      ref: "rider",
      default: null,
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
      enum: ["pending", "submitted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const servicecollection = mongoose.model("service", serviceshema);

module.exports = { servicecollection };
