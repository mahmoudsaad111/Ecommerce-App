const asyncHandler = require("express-async-handler")
const {
  getUser,
  getAllusers,
  deleteUser,
  changeUserRole,
} = require("../services/adminService")

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await getUser(req.params.userId)
  if (user instanceof Error) return next(user);
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

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await deleteUser(req.params.userId)

  res.status(204).json({
    status: "success",
    data: null,
  })
})

exports.changeUserRole = asyncHandler(async (req, res, next) => {

  const user = await changeUserRole(req.body.role, req.params.userId)
 
  if(user instanceof Error)return next(user); 

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  })
})
