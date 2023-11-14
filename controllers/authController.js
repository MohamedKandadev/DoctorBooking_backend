import validator from 'express-validator';
const { validationResult } = validator;
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler'

import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

export const register = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Entre A Valid Data!!');
    error.statusCode = 422;
    throw error;
  }

  const { email, password, firstName, lastName, role } = req.body;
  const photo = req.file?.path.replace("\\", "/");
  const user = await User.findOne({email});
  if(user){
    const error = new Error('User already exists');
    error.statusCode = 401;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = User({email, password: hashedPassword, firstName, lastName, photo, role})
  newUser.save();
  res.status(200).json({message: 'Register succes'})
})

export const login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Entre A Valid Data !!');
    error.statusCode = 422;
    throw error;
  }

  const { email, password} = req.body;
  const user = await User.findOne({email});
  const matchedPassword = user ? await bcrypt.compare(password, user.password) : false;
  if(user && matchedPassword){
    generateToken(res, user._id);
    res.json('Logged in')
  }else{
    const error = new Error('Email Or Password Not Valid !!');
    error.statusCode = 401;
    throw error;
  }
})

export const logout = (req, res, next) => {
  res.cookie('jwt', '', {}, {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({message:  'Log out User', user: req.user})
}
