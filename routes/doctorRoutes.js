import express from "express";
const router = express.Router();

import { 
  upDateDoctor, 
  getDoctorsBySpecialtie, 
  bestDoctors, 
  getDoctors 
} from '../controllers/doctorController.js';
import { upDateUser } from '../controllers/userController.js';
import { protect, isDoctor } from '../middleware/authMiddleware.js'

router.route('/')
  .put(protect, isDoctor, upDateUser, upDateDoctor)
  .get(getDoctors)
router.get('/specialtie/:specialtiesId', getDoctorsBySpecialtie)
router.get('/best', bestDoctors)

export default router;
