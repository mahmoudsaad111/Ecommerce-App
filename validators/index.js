const {
  signup,
  login,
  forgetPassword,
  updatePassword,
} = require("./authValidator")
const { updateMe } = require("./userValidator")
const { changeUserRole } = require("./adminValidator")
const { addProductToCart, updateItemQuantity } = require("./cartValidator")
const { createReview, updateReview } = require("./reviewValidator")
const { createProduct, updateProduct } = require("./productValidator")
const { createCashOrder, createCheckoutSession } = require("./orderValidator")
module.exports = {
  signup,
  login,
  forgetPassword,
  updatePassword,
  updateMe,
  changeUserRole,
  addProductToCart,
  updateItemQuantity,
  createReview,
  updateReview,
  createProduct,
  updateProduct,
  createCashOrder,
  createCheckoutSession,
}
