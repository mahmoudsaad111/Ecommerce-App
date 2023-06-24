const boom = require("@hapi/boom")
const logger = require("../config/logger")

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0]

  const message = `Duplicate field value: ${value}. Please use another value!`
  return new boom.badRequest(message)
}

const handleJWTError = () => {
  return new boom.unauthorized("Invalid token. Please log in again!")
}

const handleJWTExpiredError = () => {
  return new boom.unauthorized("Your token has expired! Please log in again.")
}

module.exports = (err, req, res, next) => {
  if (err.code === 11000) err = handleDuplicateFieldsDB(err)
  else if (err.name === "JsonWebTokenError") err = handleJWTError()
  else if (err.name === "TokenExpiredError") err = handleJWTExpiredError()

  if (err.isBoom) {
    return res.status(err.output.statusCode).json({
      error: err.output.payload.error,
      message: err.message,
    })
  } else {
    logger.error(err)

    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    })
  }
}
