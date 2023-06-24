const boom = require("@hapi/boom")
const ApiFeatures = require("../utils/apiFeatures")
const User = require("../models/userModel")

exports.getMe = async (id) => {
  const user = await User.findById(id)

  return user
}

exports.updateMe = async (body, userId) => {

  const newUser = await User.findByIdAndUpdate(userId, body, {
    new: true,
    runValidators: true,
  })

  return newUser
}

exports.deleteMe = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, {
    active: false,
  })
}
