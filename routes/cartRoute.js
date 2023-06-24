const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")
const authMiddleware = require("../middlewares/authMiddleware")
const validatorMiddleware=require('../middlewares/validatorMiddleware')

router.use(authMiddleware.protect)

router
  .route("/")
  .post(validatorMiddleware("addProductToCart"),cartController.addProductToCart)
  .delete(cartController.clearCart)
  .get(cartController.getCart)

router
  .route("/:productId")
  .patch(validatorMiddleware("updateItemQuantity"),cartController.updateItemQuantity)
  .delete(cartController.deleteItemFromCart)

module.exports = router
