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
    min: 1,
    max: 5,
    required: [true, "you must rate the product"],
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

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review
