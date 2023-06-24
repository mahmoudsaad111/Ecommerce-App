const joi =require('joi');
const mongoose=require('mongoose');

const isValidObjectId = (value,helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message('Invalid ObjectId');
    }
    return value;
  };

exports.addProductToCart=joi.object({
    productId:joi.custom(isValidObjectId, 'custom validation').required()
})

exports.updateItemQuantity=joi.object({
    quantity:joi.number().min(1),
})