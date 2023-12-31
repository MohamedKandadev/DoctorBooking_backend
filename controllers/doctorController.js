import asyncHandler from 'express-async-handler';

import Doctor from '../models/doctorModel.js';

export const upDateDoctor = asyncHandler(async(req, res, next) => {
  let { specialties, about, phone, ticketPrice, media } = req.body;
  if(req.doctor){  
    specialties =  specialties || req.doctor.specialties;
    about =  about?.trim() || req.doctor.about;
    phone =  phone?.trim() || req.doctor.phone;
    ticketPrice =  ticketPrice?.trim() || req.doctor.ticketPrice;
    media.facebook =  media.facebook || req.doctor.media.facebook || '';
    media.insta =  media.insta || req.doctor.media.insta || '';
    media.twitter =  media.twitter || req.doctor.media.twitter || '';
    media.website =  media.website || req.doctor.media.website || '';
    await Doctor.findOneAndUpdate(
      {user: req.user._id},
      { 
        specialties, 
        about, 
        phone, 
        ticketPrice, 
        media 
      }
    );
  }else{
    const newDoctor = new Doctor({ user: req.user._id, specialties, about, phone, ticketPrice, media })
    await newDoctor.save();
  }
  res.status(200).json({m:'Update Succes'});
})

export const getDoctorsBySpecialtie = asyncHandler(async(req, res, next) => {
  const {specialtiesId} = req.params;
  const {page, perPage} = req.query;
  const doctors = await Doctor
    .find({specialties: specialtiesId})
    .limit(perPage)
    .skip((page - 1) * perPage)
    .populate({
      path: "specialties",
      select: "-_id title"
    })
    .populate('user')
  const numberDoctors = await Doctor
    .find({specialties: specialtiesId})
    .countDocuments()
  res.status(200).json({doctors, numberDoctors});
})

export const getDoctors = asyncHandler(async(req, res, next) => {
  const {page, perPage} = req.query;
  const doctors = await Doctor
    .find()
    .limit(perPage)
    .skip((page - 1) * perPage)
    .populate({
      path: "specialties",
      select: "-_id title"
    })
    .populate('user')
  const numberDoctors = await Doctor
    .find()
    .countDocuments()

  res.status(200).json({message: 'Load doctor succsfully', doctors, numberDoctors});
})

export const deleteDoctor = asyncHandler(async(req, res, next) => {
  /*
    - Delete Doctor 
    - Delete User With Soft Delete 
      - Delete Doctor Delete From DataBase
  */
})

export const bestDoctors = asyncHandler(async(req, res, next) => {
  const doctors = await Doctor
    .find()
    .limit(3)
    .populate({
      path: "specialties",
      select: "-_id title"
    })
    .populate({
      path: "user",
      select: "firstName lastName photo"
    })

    // .sort(['totalRating', -1])
  res.status(200).json({message: 'Load best doctor succsfully', doctors});
})


