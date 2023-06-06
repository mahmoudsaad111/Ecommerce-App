const asyncHandler=require('express-async-handler'); 
const {signToken,login,forgetPassword,updatePassword,resetPassword,signup}=require('../services/authService')


const createSendToken = (user, statuscode, req, res) => {
  const token = signToken(user._id);

  // set jwt cookie with expire date
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // remove user password
  user.password = undefined;

  res.status(statuscode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup =asyncHandler(async (req, res) => {
  const user=await signup(req.body);
  createSendToken(user, 201, req, res);
});

exports.login = asyncHandler(async (req, res, next) => {

  const user=await login(req.body); 
  
  if(user instanceof Error)return next(user); 

  createSendToken(user, 200, req, res);
});

exports.forgetPassword = asyncHandler(async (req, res, next) => {
 const result=await forgetPassword(req.body.email); 

 if(result instanceof Error)return next(result);
 
  res.status(200).json({
      status: "success",
      message: "message send successfully",
    });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
   const user=await resetPassword(req.params.resetToken,req.body);

   if(user instanceof Error)return next(user);

  createSendToken(user, 200, req, res);
});

exports.updatePassword = asyncHandler(async (req, res, next) => {

  const user=await updatePassword(req.user.id,req.body);
 
  if(user instanceof Error)return next(user);

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).send("success");
};
