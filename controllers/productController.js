const asyncHandler = require("express-async-handler")
const {
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../services/productService")

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await getProduct(req.params.productId)

  if (product instanceof Error) return next(product)

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  })
})

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await getAllProducts(req.query)

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  })
})

exports.createProduct = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.imageCover = req.file.filename
  }
  const product = await createProduct(req.body)

  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  })
})

exports.updateProduct = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.imageCover = req.file.filename
  }

  const product = await updateProduct(req.params.productId, req.body)

  if (product instanceof Error) return next(product)

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  })
})

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await deleteProduct(req.params.productId)

  if (product instanceof Error) return next(product)

  return res.status(200).json({
    status: "success",
    data: null,
  })
})
