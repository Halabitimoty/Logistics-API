const jwt = require("jsonwebtoken");

require("dotenv").config();

const isuserloggedin = (req, res, next) => {
  const authorizationheader = req.headers.authorization;

  if (!authorizationheader) {
    res.status(401).send({ error: "no authorization header." });
    return;
  }

  const [authType, token] = authorizationheader.split(" ");

  if (authType !== "Bearer") {
    return res.status(401).send({
      error: "user unauthorized!",
    });
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  req.decoded = decoded;
  next();
};

module.exports = { isuserloggedin };
