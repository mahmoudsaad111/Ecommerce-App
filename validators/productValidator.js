const joi = require("joi")

exports.createProduct = joi.object({
  name: joi.string().required(),
  price: joi.number().min(1).required(),
  category: joi.string().required(),
  quantity: joi.number().min(1).required(),
  description: joi.string().required(),
})

exports.updateProduct = joi.object({
  name: joi.string(),
  price: joi.number().min(1),
  category: joi.string(),
  quantity: joi.number().min(1),
  description: joi.string(),
})
