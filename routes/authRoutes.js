import express from "express";
const router = express.Router();

import validator from 'express-validator';
const { check } = validator;

import { register, login, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'


router.post('/register',
  [
    check('email', 'Your email is not valid').not().isEmpty().isEmail(),
    check('password', 'Your password is not valid').not().isEmpty(),
    check('firstName', 'Your first name is not valid').not().isEmpty(),
    check('lastName', 'Your last name is not valid').not().isEmpty(),
    check('role', 'Your role is not valid').not().isEmpty(),
  ], 
register);
router.post('/',
  [
    check('email', 'Your email is not valid').not().isEmpty().isEmail(),
    check('password', 'Your password is not valid').not().isEmpty()
  ], 
login);
router.get('/logout', protect, logout);

export default router;
