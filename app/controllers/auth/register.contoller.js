const bcrypt = require("bcrypt");

require("dotenv").config();

const { usercollection } = require("../../schemas/user.schema");
const { registerval } = require("../../schemas/joischema/auth.schema.val");

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const { role } = req.role;

    await registerval.validateAsync({
      fullname,
      email,
      password,
      role,
    });

    const isUserPresent = await usercollection
      .findOne({ email })
      .maxTimeMS(20000);

    if (isUserPresent) {
      return res.status(409).send({
        success: false,
        error: "email already exists",
        message: "sign up failed.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);

    await usercollection.create({
      fullname,
      email,
      hashedpassword,
      role: role.toLowerCase(),
    });

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
