import express from "express";
const router = express.Router();

import { 
  upDateUser,
  deleteUser,
  getUsers,
  getUser, 
  currentUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
  .put(protect, upDateUser)
  .get(protect, getUsers)
router.get('/me', protect, currentUser)
router.route('/:userId')
  .delete(protect, deleteUser)
  .get(protect, getUser)


export default router;
