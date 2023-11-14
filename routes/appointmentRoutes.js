import express from "express";
const router = express.Router();

import { makeAppointment, updateStatusAppointment, appointmentsUser} from '../controllers/appointmentController.js';
import { protect, isPatient } from '../middleware/authMiddleware.js'

router.route('/')
  .post(protect,isPatient, makeAppointment)
  .get(protect, appointmentsUser)
router.route('/:appointmentId')
  .put(protect, updateStatusAppointment)

export default router;
