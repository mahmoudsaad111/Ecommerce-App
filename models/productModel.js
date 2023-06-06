const mongoose = require("mongoose");
const Review = require("./reviewModel");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide the Product name"],
  },
  imageCover: {
    type: String,
    required: [true, "You must provide image cover for the product"],
  },
  images: [String],
 description: {
    type: String,
    required: [true, "You must provide the product description "],
  }, 
  price: {
    type: Number,
    required: [true, "You must provide the Product price"],
  },
  averageRatings: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: [true, "You must provide the Product quantity"],
  },
  sold:{
    type:Number,
    default:0
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
    required: [true, "You must provide the Product category"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
