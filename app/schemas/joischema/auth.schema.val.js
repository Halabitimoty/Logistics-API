const Joi = require("joi");

const register = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().min(3).max(50).required(),
  password: Joi.string().min(6).max(40).required(),
});

const login = Joi.object({
  email: Joi.string().email().min(3).max(50).required(),
  password: Joi.string().min(6).max(40).required(),
});

module.exports = { register, login };
