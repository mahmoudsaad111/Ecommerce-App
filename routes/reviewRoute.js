const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/reviewController")
const authMiddleware = require("../middlewares/authMiddleware")
const validatorMiddleware=require('../middlewares/validatorMiddleware'); 

router.use(authMiddleware.protect)
router.route("/").post(validatorMiddleware('createReview'),reviewController.createReview)
router
  .route("/:reviewId")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview)

module.exports = router
