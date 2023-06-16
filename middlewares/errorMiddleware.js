const boom = require("@hapi/boom")
const logger = require("../config/logger")

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)

  const message = `Invalid input data. ${errors.join(". ")}`
  return new boom.badRequest(message)
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0]

  const message = `Duplicate field value: ${value}. Please use another value!`
  return new boom.badRequest(message)
}

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new boom.badRequest(message)
}

const handleJWTError = () => {
  return new boom.unauthorized("Invalid token. Please log in again!")
}

const handleJWTExpiredError = () => {
  return new boom.unauthorized("Your token has expired! Please log in again.")
}

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
  })
}

const sendErrorProd = (err, req, res) => {
  if (err.isBoom) {
    return res.status(err.output.statusCode).json({
      status: err.error,
      message: err.message,
    })
  }

  // unknown errors
  console.error("ERROR :", err)
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  })
}

module.exports = (err, req, res, next) => {
  logger.error(`${err.type}: ${err.message}`)

  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res)
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err)
    if (err.code === 11000) err = handleDuplicateFieldsDB(err)
    if (err.name === "ValidationError") err = handleValidationErrorDB(err)
    if (err.name === "JsonWebTokenError") err = handleJWTError()
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError()

    sendErrorProd(err, req, res)
  }
}
