import asyncHandler from 'express-async-handler';

import Appointment from '../models/appointmentModel.js';
import { sendEmail } from '../utils/email.js';

export const makeAppointment = asyncHandler(async(req, res, next) => {
  // Make New Appointment Between The Current User Authorization And Some Doctor
  let { doctorId, description, appointmentTime } = req.body;
  appointmentTime = new Date(appointmentTime);
  const currentDate = new Date();
  const isValidYear = appointmentTime.getFullYear() >= currentDate.getFullYear();
  const isValidMonth = appointmentTime.getMonth() >= currentDate.getMonth() ;
  const isValidDay = appointmentTime.getDate() > currentDate.getDate() ;
  const appointmentHour = appointmentTime.getHours();
  if( !isValidYear || !isValidMonth || !isValidDay ){
    const error = new Error("Please choose valid date and time");
    error.statusCode = 401;
    throw error;
  }else if(appointmentHour < 9 || appointmentHour> 16){
    const error = new Error("Please choose Hour between 9 and 4");
    error.statusCode = 401;
    throw error;
  }
  const existingAppointment = await Appointment
    .findOne({ doctor: doctorId, appointmentTime });
  if(existingAppointment){
    const error = new Error("Already booked appointment for this time, pleas choose other time!!");
    error.statusCode = 401;
    throw error;
  }
  const newAppointment = new Appointment({
    patient: req.user._id,
    doctor: doctorId,
    appointmentTime,
    description
  })
  await newAppointment.save();
  const appointmentData = {
    name: `${req.user.firstName} ${req.user.lastName}`,
    date: `${appointmentTime.getMonth() + 1}-${appointmentTime.getDate()}-${appointmentTime.getFullYear()}`,
    time: `${appointmentTime.getHours() - 1}:00AM`
  }
  sendEmail('kandad.dev@gmail.com', 'New Booking', appointmentData)
  res.status(200).json(`Successfully Make Appointment`);
});

export const updateStatusAppointment =  asyncHandler(async(req, res, next) => {
  const { appointmentId } = req.params;
  const { status } = req.body;
  const appointment = await Appointment.findById(appointmentId);
  if(!appointment){
    const error = new Error("No appointment found");
    error.statusCode = 401;
    throw error;
  }else if(appointment.status !== 'booked'){
    const error = new Error("You Can't Change Status Of This Appointment");
    error.statusCode = 401;
    throw error;
  }
  await Appointment.findByIdAndUpdate(appointmentId, {status});
  res.status(200).json('Update Status Successful');
})

export const appointmentsUser = asyncHandler(async(req, res, next) => {
  const {page, perPage} = req.query;
  let findCondition;
  if(req.user.role === 'doctor'){
    findCondition = {doctor: req.user._id}
  }else if(req.user.role === 'patient'){
    findCondition = {patient: req.user._id}
  }
  const appointments = await Appointment
    .find(findCondition)
    .populate({
      path: req.user.role === 'doctor'? "patient": 'doctor',
      select: "_id firstName lastName photo"
    })
    .limit(perPage)
    .skip((page - 1) * perPage)
  const numberAppointment = await Appointment
    .find(findCondition)
    .countDocuments()
  res.json({message: 'Fetch appointments', appointments, numberAppointment})
})