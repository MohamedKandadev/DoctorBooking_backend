import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import connectDb from '../config/db.js';
import Specialtie from '../models/specialtieModel.js';

let specialties = [
  {
    title: 'optician',
  },
  {
    title: 'cardiologists',
  },
  {
    title: 'hematologists',
  }
]

const addSpecialties = asyncHandler(async _ => {
  await Specialtie.insertMany(specialties);
})


connectDb();
addSpecialties();