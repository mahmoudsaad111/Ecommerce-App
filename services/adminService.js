const ApiFeatures = require("../utils/apiFeatures");
const User = require("../models/userModel");
const boom=require('@hapi/boom'); 

exports.getUser = async (userId) => {
    const user = await User.findById(userId);
  
    if (!user) {
      return boom.notFound("No User with this ID"); 
    }
  
    return user;
  };
  
exports.getAllusers = async (queryStr, next) => {
    const features = new ApiFeatures(User.find(), queryStr)
      .filter()
      .sort()
      .paginate()
      .limitFields()
      .search();

    const users = await features.query;

    return users;
  };
  
exports.createUser = async (body, next) => {
    const user = await User.create(body);
    return user;
  };
  
exports.deleteUser = async (userId, next) => {
    const user = await User.findByIdAndDelete(userId);
  
    if (!user) {
      return boom.notFound("No User with this ID"); 
    }
  
    return user;
  };
  
exports.updateUser = async (body,userId, next) => {
    const user = await User.findByIdAndUpdate(userId, body, {
      runValidators: true,
      new: true,
    });
  
    if (!user) {
      return boom.notFound("No User with this ID"); 
    }
  
    return user;
  };
  