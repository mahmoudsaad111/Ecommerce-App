const ApiFeatures = require("../utils/apiFeatures")
const User = require("../models/userModel")
const boom = require("@hapi/boom")

exports.getUser = async (userId) => {
  const user = await User.findById(userId)

  if (!user) {
    return boom.notFound("No User with this ID")
  }

  return user
}

exports.getAllusers = async (queryStr) => {
  const features = new ApiFeatures(User.find(), queryStr)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .search()

  const users = await features.query

  return users
}

exports.deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId)

  if (!user) {
    return boom.notFound("No User with this ID")
  }

  return user
}

exports.changeUserRole = async (role, userId) => {
  const user = await User.findByIdAndUpdate(userId,role, {
    runValidators: true,
    new: true,
  })
  
  if (!user) {
    return boom.notFound("No User with this ID")
  }

  return user
}
