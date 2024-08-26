const mongoose = require("mongoose")
const Review = require("./reviewModel")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imageCover: {
    type: String,
    required:[true,"Pleaase provide product image-cover"]
  },
  images: [String],
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  averageRatings: {
    type: Number,
    default:0,
  },
  quantity: {
    type: Number,
  },
  sold: {
    type: Number,
    default: 0,
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
  },
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
