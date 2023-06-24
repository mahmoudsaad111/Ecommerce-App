const asyncHandler = require("express-async-handler")
const { getMe, updateMe, deleteMe } = require("../services/userService")

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await getMe(req.user.id)

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  })
})

exports.updateMe = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.filename
  }

  const user = await updateMe(req.body, req.user.id)

  if (user instanceof Error) return next(user)

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  })
})

exports.deleteMe = asyncHandler(async (req, res, next) => {
  await deleteMe(req.user.id)

  res.status(204).json({
    status: "success",
  })
})
