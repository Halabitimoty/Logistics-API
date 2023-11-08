const bcrypt = require("bcrypt");

require("dotenv").config();

const { ridercollection } = require("../../schemas/rider.schema");
const { customercollection } = require("../../schemas/customer.schema");
const { registerval } = require("../../schemas/joischema/auth.schema.val");

const register = async (req, res) => {
  try {
    let isUserPresent;
    const { fullname, email, password } = req.body;
    const { role } = req.header;

    await registerval.validateAsync({ fullname, email, password, role });

    if (role === "rider") {
      isUserPresent = await ridercollection.findOne({ email }).maxTimeMS(20000);
    } else if (role === "customer") {
      isUserPresent = await customercollection
        .findOne({ email })
        .maxTimeMS(20000);
    } else {
      return res.status(409).send({
        success: false,
        error: "user not found",
        message: "invalid role.",
      });
    }

    if (isUserPresent) {
      return res.status(409).send({
        success: false,
        error: "user already exists",
        message: "sign up failed.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);

    if (role === "rider") {
      await ridercollection.create({ fullname, email, password });
    } else if (role === "customer") {
      await customercollection.create({ fullname, email, password });
    } else {
      return res.status(409).send({
        success: false,
        error: "sign up failed.",
        message: "sign up failed.",
      });
    }

    res.status(201).send({
      success: true,
      message: "sign up successfull.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message || "sign up failed.",
      message: "sign up failed",
    });
  }
};

module.exports = register;
