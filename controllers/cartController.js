const asyncHandler = require("express-async-handler")
const {
  addProductToCart,
  getCart,
  clearCart,
  updateItemQuantity,
  deleteItemFromCart,
} = require("../services/cartService")

exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const cart = await addProductToCart(req.body, req.user)

  if (cart instanceof Error) return next(cart)

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  })
})

exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await getCart(req.user)

  if (cart instanceof Error) return next(cart)

  res.status(200).json({
    status: "sucess",
    data: {
      cart,
    },
  })
})

exports.clearCart = asyncHandler(async (req, res, next) => {
  await clearCart(req.user)
  res.status(204).send()
})

exports.deleteItemFromCart = asyncHandler(async (req, res, next) => {
  const cart = await deleteItemFromCart(req.params.productId, req.user)

  if (cart instanceof Error) return next(cart)

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  })
})

exports.updateItemQuantity = asyncHandler(async (req, res, next) => {
  const cart = await updateItemQuantity(
    req.body,
    req.params.productId,
    req.user
  )

  if (cart instanceof Error) return next(cart)

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  })
})
