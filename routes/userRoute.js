const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { uploadPhoto } = require("../middlewares/uploadUserPhoto");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

//  register routes for user
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);

router.route("/forgetPassword").post(authController.forgetPassword);
router.route("/resetPassword/:resetToken").post(authController.resetPassword);

router.use(authMiddleware.protect);

router.route("/updatePassword").patch(authController.updatePassword);
router.route("/me").get(userController.getMe);

router.route("/updateMe").patch(uploadPhoto, userController.updateMe);
router.route("/deleteMe").delete(userController.deleteMe);

module.exports = router;
