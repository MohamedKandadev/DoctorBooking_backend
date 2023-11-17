import express from "express";
const router = express.Router();

import { addSpecialtie, getSpecialtie } from '../controllers/specialtieController.js';
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(protect, addSpecialtie)
  .get(getSpecialtie)

export default router;
