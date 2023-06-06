const boom=require('@hapi/boom');
const ApiFeatures = require("../utils/apiFeatures");
const User = require("../models/userModel");

// function to filter object from unwanted fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = async (id) => {
  const user = await User.findById(id);

  return user;
};

exports.updateMe = async (body, userId) => {

  if (body.password || body.passwordConfirm)
  return boom.methodNotAllowed("This route not for updating password, please use /updatePassword instead");

  const filteredBody = filterObj(body, "name", "email", "phone");

  // add photo name to filtered body  if user update his photo
  if (body.file) {
    filteredBody.photo = body.file.filename;
  }

  const newUser = await User.findByIdAndUpdate(userId, filteredBody, {
    new: true,
    runValidators: true,
  });

  return newUser;
};

exports.deleteMe = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, {
    active: false,
  });
  
};

