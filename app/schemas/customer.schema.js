const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const customerschema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

customerschema.plugin(paginate);

const customercollection = mongoose.model("customer", customerschema);

module.exports = { customercollection };
