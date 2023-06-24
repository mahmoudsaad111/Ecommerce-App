const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "order must belong to a user"],
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      price: Number,
    },
  ],
  address: {
    type: String,
  },
  taxPrice: {
    type: Number,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: [true, "You must give total price for the order"],
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card"],
    default: "cash",
  },
  deliverd: {
    type: Boolean,
    default: false,
  },
  deliverdAt: Date,
  paidAt: {
    type: Date,
  },
})

orderSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "user",
    select: "name photo phone email",
  }).populate({
    path: "cartItems.product",
    select: "name imageCover",
  })
  next()
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
