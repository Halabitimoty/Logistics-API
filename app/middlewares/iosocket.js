const jwt = require("jsonwebtoken");

require("dotenv").config();

const iosocketmiddleware = (token) => {
  const [tokenType, auth] = token.split(" ");

  if (tokenType === "Bearer") {
    const userdetails = jwt.verify(auth, process.env.SECRET);

    return {
      message: "",
      error: null,
      user: userdetails,
    };
  } else {
    return {
      message: "",
      error: "Invalid Token",
      user: null,
    };
  }
};

module.exports = { iosocketmiddleware };
