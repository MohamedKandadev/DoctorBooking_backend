import asyncHandler from 'express-async-handler';

import Specialtie from '../models/specialtieModel.js';

export const addSpecialtie = asyncHandler(async(req, res, next) => {
  const { title } = req.body;
  const spec = new Specialtie({title});
  await spec.save();
  res.status(200).json({message: 'Add New Specialtie Success'});
});