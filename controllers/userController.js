import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import fs from 'fs';

import User from '../models/userModel.js';
import mongoose from 'mongoose';

export const currentUser = asyncHandler(async(req, res, next) =>{
  // Load Info User Authentication 
  res.status(200).json({message: 'Load User Successfully', user: req.user})
})

export const upDateUser = asyncHandler(async(req, res, next) => {
  console.log(req.body)
  let { password, firstName, lastName } = req.body;
  password =  password ? bcrypt.hash(password, 12) : req.user.password;
  firstName =  firstName?.trim() || req.user.firstName;
  lastName =  lastName?.trim() || req.user.lastName;
  let photo = req.user.photo;
  if(req.file){
    if(photo) clearImage(photo);
    photo = req.file.path.replace("\\", "/");
  }
  await User.findOneAndUpdate(
    {_id: req.user._id}, 
    { password, firstName, lastName, photo }
  );
  if(req.user.role === 'doctor') {
    next();
  }
  res.status(200).json('Update Succes');
})

export const deleteUser = asyncHandler(async(req, res, next) =>{
  /*
    - Delete User (Patient Or Doctor)
    - Delete User With Soft Delete 
    - Delete Without Delete From DataBase
  */
})

export const getUsers = asyncHandler(async(req, res, next) =>{
  // Get All Users
  // const {  } from 
  const users = await User.find({role: 'patient'});
  res.status(200).json({message: 'Load Users Successfully', users})
})

export const getUser = asyncHandler(async(req, res, next) =>{
  // Get One User By Id
  const {userId} = req.params;
  const users = await User.findOne({_id: userId});
  res.status(200).json({message: 'Load User Successfully', users})
})








const clearImage = filePath => {
  fs.unlink(filePath, err=>console.log(err));
}

