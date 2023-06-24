const joi = require("joi")

exports.changeUserRole = joi.object({
  role:joi.string().valid('admin','user').messages({"any.only":"role is not valid"})
})
