const joi = require("joi")

exports.createCashOrder = joi.object({
  address: joi.string().required(),
})

exports.createCheckoutSession= joi.object({
  address: joi.string().required(),
})
