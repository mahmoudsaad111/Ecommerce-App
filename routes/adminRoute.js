const express = require("express")
const router = express.Router()
const { uploadPhoto } = require("../middlewares/uploadUserPhoto")
const adminController = require("../controllers/adminController")
const authMiddleware = require("../middlewares/authMiddleware")

router.use(authMiddleware.protect)

router.use(authMiddleware.restrictTo("admin"))

router
  .route("/")
  .get(adminController.getAllusers)
  .post(uploadPhoto, adminController.createUser)

router
  .route("/:userId")
  .get(adminController.getUser)
  .patch(uploadPhoto, adminController.updateUser)
  .delete(adminController.deleteUser)

module.exports = router
