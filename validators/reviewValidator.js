const joi = require("joi")
const mongoose = require("mongoose")

const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId")
  }
  return value
}

exports.createReview = joi.object({
  rating: joi.number().min(1).max(5).required(),
  product: joi.custom(isValidObjectId, "custom validation").required(),
  comment: joi.string(),
})

exports.updateReview = joi.object({
  rating: joi.number().min(1).max(5),
  comment: joi.string(),
})
