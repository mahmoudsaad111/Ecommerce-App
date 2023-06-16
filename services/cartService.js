const Cart = require("../models/cartModel")
const Product = require("../models/productModel")
const boom = require("@hapi/boom")

// Function to update cart and return total price of the cart
const calcTotalCartPrice = (cart) => {
  let totalPrice = 0
  let totalQuantity = 0
  cart.items.forEach((item) => {
    totalPrice += item.quantity * item.price
    totalQuantity += item.quantity
  })
  cart.totalCost = totalPrice
  cart.totalQuantity = totalQuantity
  return totalPrice
}

// Function to find index of product in cart if it exists
const ProductInCart = (cart, productId) => {
  const productIndex = cart.items.findIndex(
    (item) => item.product.id.toString() === productId
  )
  return productIndex
}

exports.addProductToCart = async (body, user) => {
  const { productId } = body
  const product = await Product.findById(productId)

  if (!product) return boom.notFound("No product with this ID")

  let cart = await Cart.findOne({ user: user.id })

  if (!cart) {
    cart = await Cart.create({ user: user.id })
  }

  const productIndex = ProductInCart(cart, productId)

  if (productIndex > -1) {
    cart.items[productIndex].quantity += 1
  } else {
    cart.items.push({ product: productId, quantity: 1, price: product.price })
  }

  //  update cart
  const totalPric = calcTotalCartPrice(cart)

  cart = await cart.save()

  // this to populate product name after save
  await cart.populate({
    path: "items.product",
    select: "name",
  })

  return cart
}

exports.getCart = async (user) => {
  const cart = await Cart.findOne({ user: user.id })

  if (!cart) return boom.notFound("Cart not found")

  return cart
}

exports.clearCart = async (user) => {
  await Cart.findOneAndDelete({ user: user.id })
}

exports.deleteItemFromCart = async (productId, user) => {
  // $pull operator removes from an existing array all instances of a value or values that match a specified condition
  const cart = await Cart.findOneAndUpdate(
    { user: user.id },
    { $pull: { items: { product: productId } } },
    { new: true, runValidators: true }
  )

  if (!cart) return boom.notFound("Cart is already empty")

  //update user cart
  calcTotalCartPrice(cart)
  await cart.save()

  return cart
}

exports.updateItemQuantity = async (body, productId, user) => {
  const { quantity } = body

  const cart = await Cart.findOne({ user: user.id })

  if (!cart) return boom.notFound("Cart is already empty")

  const productIndex = ProductInCart(cart, productId)

  if (productIndex > -1) {
    cart.items[productIndex].quantity = quantity
  } else {
    return boom.notFound("No product in the Cart with this ID")
  }

  calcTotalCartPrice(cart)
  await cart.save()

  return cart
}
