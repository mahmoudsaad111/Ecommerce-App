const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Review must belong to a product"],
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
})

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" })
  this.populate({ path: "product", select: "name" })
  next()
})
reviewSchema.pre("save", async function (next) {
  const review = this;
  // Dynamically load the Product model to avoid circular dependency
  const Product = mongoose.model("Product");
  const product = await Product.findById(review.product);
    
  if (product) {
    // Update review references
    product.review.push(review._id);

    // Calculate new average rating
    const currentAvgRating = product.averageRatings || 0;
    const currentReviewCount = product.review.length;
    const newRating = review.rating;

    const newAvgRating = (currentAvgRating * (currentReviewCount - 1) + newRating) / currentReviewCount;
    product.averageRatings = newAvgRating;

    await product.save();
  }
  next();
});

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review
