const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const User = require("../models/userModel")
const boom = require("@hapi/boom")

exports.protect = asyncHandler(async (req, res, next) => {
  // check if there is no token
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token)
    return next(
      boom.unauthorized("You are not logged in, please login and try again")
    )

  // verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)

  // check if user with this token exsits
  const currentUser = await User.findById(decoded.id)

  if (!currentUser) return next(boom.unauthorized("No user with this token"))

  //Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      boom.unauthorized("User recently changed password! Please log in again.")
    )

  // user is loggedin
  req.user = currentUser
  res.locals.user = currentUser

  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        boom.unauthorized("You do not have permission to perform this action")
      )
    next()
  }
}
