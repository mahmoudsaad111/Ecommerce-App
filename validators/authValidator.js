const joi = require("joi")


exports.signup = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .message("Password is not valid")
    .required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: true,
    })
    .message("Email is not valid")
    .required(),
  passwordConfirm: joi
    .valid(joi.ref("password"))
    .messages({ "any.only": "Password and Password confirm are not the same" }),
})

exports.login = joi.object({
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .message("Password is not valid")
    .required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: true,
    })
    .message("Email is not valid")
    .required(),
})

exports.forgetPassword = joi.object({
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: true,
    })
    .message("Email is not valid")
    .required(),
})

exports.updatePassword = joi.object({
  currentPassword: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .message("Password is not valid")
    .required(),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .message("Password is not valid")
    .required(),
  passwordConfirm: joi
    .valid(joi.ref("password"))
    .messages({ "any.only": "Password and Password confirm are not the same" }),
})
