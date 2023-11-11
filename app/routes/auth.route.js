const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth/auth.controller");
const {
  getusershippings,
  getridershippings,
} = require("../controllers/shippings/usershippings");

const {
  rideronly,
  customeronly,
  isuserloggedin,
  journey,
} = require("../middlewares/middleware");

router.post("/login", login);
router.post("/register", journey, register);
router.get("/usershippings", isuserloggedin, getusershippings);
router.get("/ridersshippings", isuserloggedin, getridershippings);

module.exports = router;
