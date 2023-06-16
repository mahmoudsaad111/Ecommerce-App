const asyncHandler = require("express-async-handler")
const {
  getUser,
  getAllusers,
  createUser,
  deleteUser,
  updateUser,
} = require("../services/adminService")

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await getUser(req.params.userId)
  if (user instanceof Error) return next(0)
  res.status(200).json({
    status: "success",
    data: { user },
  })
})

exports.getAllusers = asyncHandler(async (req, res, next) => {
  const users = await getAllusers(req.query)
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  })
})

exports.createUser = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.filename
  }
  const user = await createUser(req.body)
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  })
})

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await deleteUser(req.params.userId)

  res.status(204).json({
    status: "success",
    data: null,
  })
})

exports.updateUser = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.filename
  }

  const user = await updateUser(req.body, req.params.userId)

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  })
})
