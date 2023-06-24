const joi = require("joi")

exports.updateMe=joi.object({
    name: joi.string().alphanum().min(3).max(30),
    email:  joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: true,
    })
    .message("Email is not valid"),
   phone:joi.string().min(6),
  })
  