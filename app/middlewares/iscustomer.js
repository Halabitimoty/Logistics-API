const customeronly = (req, res, next) => {
  const { role } = req.decoded;

  if (role === "customer") {
    next();
  } else {
    res.status(403).send("you are not a customer");
  }
};

module.exports = { customeronly };
