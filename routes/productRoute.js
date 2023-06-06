const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {uploadCoverImage} = require("../middlewares/uploadProductImage");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/:productId").get(productController.getProduct);

router.route("/").get(productController.getAllProducts);

router.use(authMiddleware.protect, authMiddleware.restrictTo("admin"));

router
  .route("/:productId")
  .patch(uploadCoverImage,productController.updateProduct)
  .delete(productController.deleteProduct);
  
router.route("/").post(uploadCoverImage,productController.createProduct);

module.exports = router;
