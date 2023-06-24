const stripe = require("stripe")(process.env.STRIP_SECRET_KEY)
const User = require("../models/userModel")
const Product = require("../models/productModel")
const Cart = require("../models/cartModel")
const Order = require("../models/orderModel")
const ApiFeatures = require("../utils/apiFeatures")
const logger = require("../config/logger")
const boom = require("@hapi/boom")

const updateAfterOrder = async (order, cart) => {
  const updates = cart.items.map((item) => ({
    updateOne: {
      filter: { _id: item.product },
      update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
    },
  }))
  await Product.bulkWrite(updates, {})

  //  Clear cart depend on cartId
  await Cart.findByIdAndDelete(cart.id)
}

const createCardOrder = async (session) => {
  const cartId = session.client_reference_id
  const address = session.metadata.address

  const user = await User.findOne({ email: session.customer_email })
  const cart = await Cart.findById(cartId)

  const totalPrice = cart.totalCost

  const order = await Order.create({
    user: user._id,
    cartItems: cart.items,
    address,
    totalPrice,
    paymentMethod: "card",
    payedAt: Date.now(),
  })

  if (order) {
    await updateAfterOrder(order, cart)
  }
}

exports.createCashOrder = async (cartId, userId, body) => {
  const { address } = body

  const cart = await Cart.findById(cartId)

  if (!cart) return boom.notFound("No Cart with this ID")

  // calculate total price of the order
  const taxPrice = 0
  const shippingPrice = 0
  const totalPrice = cart.totalCost + taxPrice + shippingPrice

  const order = await Order.create({
    user: userId,
    cartItems: cart.items,
    address,
    totalPrice,
    paidAt: Date.now(),
  })

  await updateAfterOrder(order, cart)

  // Populate user and product data
  await order.populate({
    path: "user",
    select: "name photo phone email",
  })

  await order.populate({
    path: "cartItems.product",
    select: "name imageCover",
  })
  logger.info(
    `An order has been requested : ${order.user.email}, ${order.totalPrice} `
  )
  return order
}

exports.getOrder = async (orderId, user) => {
  const order = await Order.findById(orderId)
  if (!order || (order.user != user.id && user.role != "admin")) {
    return boom.notFound("No order with this ID")
  }
  return order
}

exports.getAllOrders = async (queryStr, user) => {
  let filterObj = {}
  if (user.role === "user") {
    filterObj = { user: user.id }
  }
  const features = new ApiFeatures(Order.find(filterObj), queryStr)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .search()

  const orders = await features.query

  return orders
}

exports.createCheckoutSession = async (body, cartId, user) => {
  const { address } = body

  const cart = await Cart.findById(cartId)

  if (!cart) {
    return boom.notFound("No cart with this ID")
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.SERVER_URL}/api/v1/order}`,
    cancel_url: `${process.env.SERVER_URL}/api/v1/cart}`,
    customer_email: user.email,
    client_reference_id: cartId,
    line_items: cart.items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
        metadata: address,
      }
    }),
  })

  return session
}

exports.checkoutWebhook = async (headers, rawBody) => {
  const sig = headers["stripe-signature"]
  let event

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return new boom(`Webhook Error: ${err.message}`, 400)
  }

  if (event.type === "checkout.session.completed") {
    createCardOrder(event.data.object)
    logger.info(`An order has been requested using stripe Payment `)
  }
}
