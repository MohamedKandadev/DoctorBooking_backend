import express from "express";
const router = express.Router();

import { addSpecialtie } from '../controllers/specialtieController.js';
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(protect, addSpecialtie)

export default router;
