const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

const app = require("./app")
const dbConnection = require("./config/mongodb")
const logger = require("./config/logger")
const PORT = process.env.PORT

dbConnection

app.listen(PORT, () => {
  logger.info(`app is listening on port ${PORT}`)
})
