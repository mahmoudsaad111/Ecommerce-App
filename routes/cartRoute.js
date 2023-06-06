const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware=require('../middlewares/authMiddleware')

router.use(authMiddleware.protect);

router
  .route("/")
  .post(cartController.addProductToCart)
  .delete(cartController.clearCart)
  .get(cartController.getCart);

router
  .route("/:productId")
  .put(cartController.updateItemQuantity)
  .delete(cartController.deleteItemFromCart);

module.exports = router;
