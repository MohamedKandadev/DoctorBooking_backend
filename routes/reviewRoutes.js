import express from "express";
const router = express.Router();

import { addReview, getDoctorReviews, deleteReview } from '../controllers/reviewController.js';
import { protect, isPatient } from '../middleware/authMiddleware.js'

router.route('/:id')
  .post(protect, isPatient, addReview)
  .get(getDoctorReviews)
  .delete(protect, isPatient, deleteReview)

export default router;
