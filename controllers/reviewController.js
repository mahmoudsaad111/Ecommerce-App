const asyncHandler=require('express-async-handler')
const {createReview,getReview,updateReview,deleteReview}=require('../services/reviewService'); 

exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.user=req.user.id; 
  const review = await createReview(req.body);

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await getReview(req.params.reviewId);

  if (review instanceof Error)return next(review); 

  return res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const result=await deleteReview(req.params.reviewId,req.user);

  if(result instanceof Error)return next(result); 

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  const review = await updateReview(req.params.reviewId,req.user,req.body);

  if (review instanceof Error)return next(review); 

  return res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
