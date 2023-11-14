import asyncHandler from 'express-async-handler';

import Review from '../models/reviewModel.js';

export const addReview = asyncHandler(async(req, res, next) => {
  const { review } = req.body;
  const { id: doctorId } = req.params;
  const newReview = new Review({
    patient: req.user._id,
    doctor: doctorId,
    review
  })
  await newReview.save();
  res.status(200).json({message: 'Review added successfully'})
})

export const getDoctorReviews = asyncHandler(async(req, res, next) => {
  const { id: doctorId } = req.params;
  const {page, perPage} = req.query;
  const reviews = await Review
    .find({doctor: doctorId})
    .limit(perPage)
    .skip((page - 1) * perPage)
    .populate({
      path: "patient",
      select: "_id firstName lastName photo"
    })
    .populate({
      path: "doctor",
      select: " firstName lastName photo"
    })
  const numberReviews = await Review
    .find({doctor: doctorId})
    .countDocuments()
  res.status(200).json({
    message: 'Reviews doctor fetch successfully',
    numberReviews,
    reviews
  })
})

export const deleteReview = asyncHandler(async(req, res, next) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById(reviewId)
  if(!review){
    const error = new Error("No review Found!!");
    error.statusCode = 401;
    throw error;
  } else if(review.patient.toString() !== req.user._id.toString()) {
    const error = new Error("Not authorized, You can delete just your reviews!!");
    error.statusCode = 401;
    throw error;
  }
  await Review.findByIdAndDelete(reviewId);
  res.status(200).json({message: 'Review deleted successfully'});
})