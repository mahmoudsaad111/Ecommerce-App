const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const { uploadCoverImage } = require("../middlewares/uploadProductImage")
const authMiddleware = require("../middlewares/authMiddleware")
const validatorMiddleware=require('../middlewares/validatorMiddleware') 

router.route("/:productId").get(productController.getProduct)

router.route("/").get(productController.getAllProducts)

router.use(authMiddleware.protect, authMiddleware.restrictTo("admin"))

router
  .route("/:productId")
  .patch(uploadCoverImage,validatorMiddleware("updateProduct"), productController.updateProduct)
  .delete(productController.deleteProduct)

router.route("/").post(uploadCoverImage,validatorMiddleware("createProduct"), productController.createProduct)

module.exports = router
