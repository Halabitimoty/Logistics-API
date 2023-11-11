const Joi = require("joi");

const registerval = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().min(3).max(50).required(),
  password: Joi.string().min(6).max(40).required(),
  role: Joi.string().allow("rider", "customer").required(),
});

const loginval = Joi.object({
  email: Joi.string().email().min(3).max(50).required(),
  password: Joi.string().min(6).max(40).required(),
});

const serviceval = Joi.object({
  address: Joi.string().min(6).max(60).required(),
  destaddress: Joi.string().min(6).max(60).required(),
  itemweight: Joi.number().required(),
  shippingcost: Joi.number().required(),
  shippingrequest: Joi.string()
    .allow("pending", "in-transit", "delivered")
    .required(),
});

const shippingval = Joi.object({
  shippingrequest: Joi.string()
    .allow("pending", "in-transit", "delivered")
    .required(),
});
module.exports = { registerval, loginval, serviceval, shippingval };
