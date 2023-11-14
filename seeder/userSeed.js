import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import connectDb from '../config/db.js';
import User from '../models/userModel.js';

let users = [
  {
    email: 'doctor@gmail.com',
    password: 'Doctor@@123',
    firstName: 'Doctor',
    lastName: 'Doctor',
    role: 'doctor'
  },
  {
    email: 'doctor2@gmail.com',
    password: 'Doctor@@123',
    firstName: 'Doctor',
    lastName: 'Doctor',
    role: 'doctor'
  },
  {
    email: 'patient@gmail.com',
    password: 'Patient@@123',
    firstName: 'Patient',
    lastName: 'Patient',
    role: 'patient'
  }
]

const hashedUsers = users.map(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password,12);
  user.password = hashedPassword;
  return user;
});

const addUsers = asyncHandler(async _ => {
  users = await Promise.all(hashedUsers)
  await User.insertMany(users);
})


connectDb();
addUsers();