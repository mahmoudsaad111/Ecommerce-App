const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    select: false,
  },
  passwordConfirm: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  role: {
    type: String,
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
    select:false,
  },
  phone: String,
})

//   encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 12)

  this.passwordConfirm = undefined
  next()
})

// check if password changed
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000
  next()
})

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword)
}

// check if password changed after creating token
userSchema.methods.changedPasswordAfter = function (JWTTime) {
  if (this.passwordChangedAt) {
    const changedPasswordTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )
    return changedPasswordTime > JWTTime
  }
  return false
}

//create reset password token
userSchema.methods.resetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

userSchema.pre(/^find/, function (next) {
  this.find({ active: true })
  next()
})

const User = mongoose.model("User", userSchema)
module.exports = User
