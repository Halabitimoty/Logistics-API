const rideronly = (req, res, next) => {
  const { role } = req.decoded;

  if (role === "rider") {
    next();
  } else {
    res.status(403).send("you are not a rider");
  }
};

module.exports = { rideronly };
