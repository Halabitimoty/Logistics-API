const journey = (req, res, next) => {
  const roleheader = req.headers.authorization;

  if (!roleheader) {
    res.status(401).send({ error: "no role header." });
    return;
  }

  const role = roleheader;

  if (role === "rider") {
    req.role = { role };
    next();
  } else if (role === "customer") {
    req.role = { role };
    next();
  } else {
    res.status(401).send({ error: "Invalid role" });
  }
};

module.exports = { journey };
