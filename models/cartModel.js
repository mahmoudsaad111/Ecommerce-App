const mongoose = require("mongoose");
const product=require('./productModel'); 

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:[true,"cart must belong to a user"]
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  ],
  totalQuantity: {
    type: Number,
    default: 0,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


cartSchema.pre(/^find/,function(next){
 this.populate({
  path:"items.product",
  select:"name"
 })
 next();  
}); 



const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
