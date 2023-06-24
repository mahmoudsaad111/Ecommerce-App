const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { uploadPhoto } = require("../middlewares/uploadUserPhoto")
const userController = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")
const validatorMiddleware=require('../middlewares/validatorMiddleware'); 

//  register routes for user
router.route("/signup").post(validatorMiddleware('signup'),authController.signup)
router.route("/login").post(validatorMiddleware('login'),authController.login)
router.route("/logout").post(authController.logout)

router.route("/forgetPassword").post(validatorMiddleware('forgetPassword'),authController.forgetPassword)
router.route("/resetPassword/:resetToken").post(authController.resetPassword)

router.use(authMiddleware.protect)

router.route("/updatePassword").patch(validatorMiddleware('updatePassword'),authController.updatePassword)
router.route("/me").get(userController.getMe)

router.route("/updateMe").patch(uploadPhoto,validatorMiddleware('updateMe'), userController.updateMe)
router.route("/deleteMe").delete(userController.deleteMe)

module.exports = router
