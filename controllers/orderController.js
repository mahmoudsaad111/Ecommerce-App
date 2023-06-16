const asyncHandler = require("express-async-handler")
const {
  createCashOrder,
  createCheckoutSession,
  getAllOrders,
  getOrder,
  updateOrderToDelivered,
  checkoutWebhook,
} = require("../services/orderService")

exports.createCashOrder = asyncHandler(async (req, res, next) => {
  const order = await createCashOrder(req.params.cartId, req.user.id, req.body)

  if (order instanceof Error) return next(order)

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  })
})

exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await getOrder(req.params.orderId, req.user)

  if (order instanceof Error) return next(order)

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  })
})

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await getAllOrders(req.query, req.user)

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  })
})

exports.createCheckoutSession = asyncHandler(async (req, res, next) => {
  const session = await createCheckoutSession(
    req.body,
    req.params.cartId,
    req.user
  )

  if (session instanceof Error) return next(session)

  res.status(200).json({
    status: "success",
    data: {
      session,
    },
  })
})

exports.checkoutWebhook = asyncHandler(async (req, res, next) => {
  await checkoutWebhook(req.headers.req.rawBody)

  res.status(200).end()
})

exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await updateOrderToDelivered(req.params.orderiId)

  if (order instanceof Error) return next(order)

  res.status(200).json({ status: "success", data: { order } })
})
