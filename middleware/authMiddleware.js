import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  }else{
    const error = new Error('Not authorized, Invalid token')
    error.statusCode = 401
    throw error;
  }
})

export const isDoctor = asyncHandler(async (req, res, next) => {
  if(req.user.role === 'doctor'){
    req.doctor = await Doctor.findOne({user: req.user._id});
    next();
  }else{
    const error = new Error('Not authorized for this actions')
    error.statusCode = 401
    throw error;
  }
})

export const isPatient = asyncHandler(async (req, res, next) => {
  if(req.user.role === 'patient'){
    next();
  }else{
    const error = new Error('Not authorized for this actions')
    error.statusCode = 401
    throw error;
  }
})