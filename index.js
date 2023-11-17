import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import multer from 'multer';
import path from 'path';
import cron from 'node-cron'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  origin: 'http://127.0.0.1:5173/',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials: true
}

app.get('/', (req, res, next) => {
  res.status(200).json('Good')
})
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', false);
//   next();
// });

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  multer({
    storage: fileStorage,
    fileFilter
  }).single('photo'));
app.use('/images', express.static(path.join(__dirname, 'images')));

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
