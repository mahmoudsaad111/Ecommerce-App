const Product = require("../models/productModel")
const ApiFeatures = require("../utils/apiFeatures")
const boom = require("@hapi/boom")

exports.getProduct = async (productId) => {
  const product = await Product.findById(productId).populate("review")

  if (!product) return boom.notFound("No product with this ID")

  return product
}

exports.getAllProducts = async (queryStr) => {
  const features = new ApiFeatures(Product.find(), queryStr)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .search()
  const products = await features.query

  return products
}

exports.createProduct = async (body) => {
  const product = await Product.create(body)

  return product
}

exports.updateProduct = async (productId, body) => {
  const newProduct = await Product.findByIdAndUpdate(productId, body, {
    runValidators: true,
    new: true,
  })

  if (!newProduct) return boom.notFound("No product with this ID")

  return newProduct
}

exports.deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId)

  if (!product) return boom.notFound("No product with this ID")
}
