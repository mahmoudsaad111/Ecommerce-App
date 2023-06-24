const joi = require("joi")
const boom = require("@hapi/boom")
const fs = require("fs")
const validators = require("../validators")
const { error } = require("winston")
const logger = require("../config/logger")

module.exports = function (validator) {
  return async (req, res, next) => {
    try {
      const validated = await validators[validator].validateAsync(req.body, {
        abortEarly: false,
      })
      req.body = validated
      next()
    } catch (err) {
      if (req.file) {
        await fs.unlink(req.file.path, (err) => {
          if (err) logger.error(err)
        })
      }
      const errMessgage = err.details.map((el) => el.message).join(", ")
      return next(new boom.badRequest(`Validation Error :${errMessgage}`))
    }
  }
}
