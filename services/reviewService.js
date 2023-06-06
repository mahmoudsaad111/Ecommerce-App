const Review = require("../models/reviewModel");
const boom=require('@hapi/boom'); 

exports.createReview = async (body) => {
  const review = await Review.create(body);

 return review ;
};

exports.getReview = async (reviewId) => {
  const review = await Review.findById(reviewId);

  if (!review)return boom.notFound("No review with this ID"); 

 return review
};

exports.deleteReview = async (reviewId,user) => {
  const review = await Review.findById(reviewId);

  if (!review)return boom.notFound("No review with this ID"); 
  else if (review.user.id != user.id && user.role != "admin")
    return boom.unauthorized("You do not have permission to do this");

  await Review.findByIdAndDelete(review.id);
   
};

exports.updateReview = async (reviewId,user,body) => {
  const review = await Review.findById(reviewId);
  
  if (!review)return boom.notFound("No review with this ID"); 
  else if (review.user.id != user.id && user.role != "admin")
    return boom.unauthorized("You do not have permission to do this");

 const newReview=await Review.findByIdAndUpdate(review.id,body,{
   new:true,
   runValidators:true
 });

 return newReview
};
