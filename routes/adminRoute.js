const express = require("express")
const router = express.Router()
const { uploadPhoto } = require("../middlewares/uploadUserPhoto")
const adminController = require("../controllers/adminController")
const authMiddleware = require("../middlewares/authMiddleware")
const validatorMiddleware=require('../middlewares/validatorMiddleware')

router.use(authMiddleware.protect)

router.use(authMiddleware.restrictTo("admin"))

router
  .route("/")
  .get(adminController.getAllusers)

router
  .route("/:userId")
  .get(adminController.getUser)
  .patch(validatorMiddleware('changeUserRole'), adminController.changeUserRole)
  .delete(adminController.deleteUser)

module.exports = router
