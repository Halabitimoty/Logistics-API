const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth/auth.controller");

const {
  rideronly,
  customeronly,
  isuserloggedin,
  journey,
} = require("../middlewares/middleware");

router.post("/login", login);
router.post("/register", journey, register);

module.exports = router;
