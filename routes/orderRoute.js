const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware=require('../middlewares/authMiddleware');

// for test stripe webhook 
router.route("/webhook").post(orderController.checkoutWebhook);

router.use(authMiddleware.protect);

router.route("/:orderId").get(orderController.getOrder).put(orderController.updateOrderToDelivered);
router
  .route("/:cartId")
  .post(authMiddleware.restrictTo("admin"), orderController.createCashOrder);
router
  .route("/")
  .get( orderController.getAllOrders);
router
  .route("/checkout-session/:cartId")
  .get(orderController.createCheckoutSession);

module.exports = router;
