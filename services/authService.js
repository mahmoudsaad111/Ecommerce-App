const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const Email = require("../utils/email")
const crypto = require("crypto")
const { hash } = require("bcrypt")
const boom = require("@hapi/boom")

exports.signToken = (id) => {
  // generate token by user ID
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE,
  })
}

exports.signup = async ({ name, email, password, passwordConfirm }) => {
  const user = await User.create({ name, password, passwordConfirm, email })

  await new Email(user, process.env.SERVER_URL).sendWelcome()

  return user
}

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    return boom.badRequest("Please enter email and password")
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user || !(await user.correctPassword(password, user.password))) {
    return boom.badRequest("Invalid email or password")
  }

  return user
}

exports.forgetPassword = async (email) => {
  // validate input email
  const user = await User.findOne({ email })
  if (!user) {
    return boom.badRequest("No user with this email")
  }

  //create password reset token
  const resetToken = user.resetPasswordToken()
  const newUser = await user.save({ validateBeforeSave: false })

  // send reset token url to the email
  try {
    const ResetTokenUrl = `${process.env.SERVER_URL}/api/v1/user/resetPassword/${resetToken}`
    await new Email(user, ResetTokenUrl).sendPasswordReset()
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    return boom.badImplementation(
      "There was an error sending the email, Please try again later"
    )
  }
}

exports.resetPassword = async (resetToken, { password, passwordConfirm }) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  // find user with this token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() },
  })

  if (!user) {
    return boom.badRequest("Token is invalid or has expired")
  }

  //  update user password

  user.password = password
  user.passwordConfirm = passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined

  await user.save()

  return user
}

exports.updatePassword = async (
  userId,
  { currentPassword, password, passwordConfirm }
) => {
  const user = await User.findById(userId).select("password")

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return boom.badRequest("Current password is wrong, Please try again")
  }

  // update password
  user.password = password
  user.passwordConfirm = passwordConfirm
  await user.save()

  return user
}
