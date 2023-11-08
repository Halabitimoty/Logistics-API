const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { loginval } = require("../../schemas/joischema/user.val");
const { usercollection } = require("../../schemas/user.schema");

require("dotenv").config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    await loginval.validateAsync({ username, password });

    const userdetails = await usercollection
      .findOne({ username })
      .maxTimeMS(20000);

    if (!userdetails) {
      return res.status(404).send({
        success: false,
        error: "User not found",
        message: "Login failed",
      });
    }

    const passwordmatch = bcrypt.compareSync(password, userdetails.password);

    if (!passwordmatch) {
      return res.status(400).send({
        success: false,
        error: "Invalid credentials",
        message: "Login failed",
      });
    }

    const { username: user_name, _id } = userdetails;

    const token = jwt.sign(
      {
        username: user_name,
        userid: _id,
      },
      process.env.SECRET
    );

    res.status(200).send({
      success: true,
      message: "login successful",
      userid: _id,
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message || "sign in failed.",
      message: "sign in failed",
    });
  }
};

module.exports = login;
