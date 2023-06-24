const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController")
const authMiddleware = require("../middlewares/authMiddleware")
const validatorMiddleware=require('../middlewares/validatorMiddleware')

// for test stripe webhook
router.route("/webhook").post(orderController.checkoutWebhook)

router.use(authMiddleware.protect)

router
  .route("/:orderId")
  .get(orderController.getOrder)
  
router
  .route("/:cartId")
  .post(validatorMiddleware('createCashOrder'),authMiddleware.restrictTo("admin"), orderController.createCashOrder)

router.route("/").get(orderController.getAllOrders)

router
  .route("/checkout-session/:cartId")
  .post(validatorMiddleware('createCheckoutSession'),orderController.createCheckoutSession)

module.exports = router
