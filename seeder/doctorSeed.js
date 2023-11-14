import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
dotenv.config();

import connectDb from '../config/db.js';
import Doctor from '../models/doctorModel.js';

let Doctors = [
  {
    user: "65510c053e3bddacf8455845",
    specialties: "65514c72e7d38208587a3e93",
    about: 'My name is mohamed kandad im a doctor',
    phone: '0695208671',
    ticketPrice: 50,
    media: [
      {
        facebook: '@Doctor_Mohamed'
      }
    ]
  },
  {
    user: "65510c053e3bddacf8455846",
    specialties: "65514c72e7d38208587a3e93",
    about: 'My name is mohamed kandad im a doctor',
    // phone: '0695208671',
    ticketPrice: 20,
    media: [
      {
        instagrame: '@Doctor_Mohamed'
      }
    ]
  },
]

const addDoctors = asyncHandler(async _ => {
  await Doctor.insertMany(Doctors);
})


connectDb();
addDoctors()