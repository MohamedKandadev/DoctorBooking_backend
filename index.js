import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import multer from 'multer';
import path from 'path';
import cron from 'node-cron'

// Function Connection To Data Base
import connectDB from './config/db.js';

// All Routes
import AuthRoutes from './routes/authRoutes.js';
import UserRoutes from './routes/userRoutes.js';
import DoctorRoutes from './routes/doctorRoutes.js';
import specialtieRoutes from './routes/specialtieRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

// Middleware
import { errorHandler } from './middleware/errorMiddleware.js';
// Multer For File Upload (Images)
import { fileFilter, fileStorage } from './utils/multer.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const corsOptions = {
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}

app.get('/', (req, res, next) => {
  res.status(200).json('Good')
})

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  multer({
    storage: fileStorage,
    fileFilter
  }).single('photo'));

// All Middleware Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/doctors', DoctorRoutes);
app.use('/api/specialtie', specialtieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/appointments', appointmentRoutes);

// Middleware Error
app.use(errorHandler)

// var fiveSec = cron.schedule("*/1 * * * * *", function() {
//     console.log("running a task every 5 seconds");
// },false);

// fiveSec.start();

connectDB();
app.listen(port);
