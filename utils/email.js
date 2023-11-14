import asyncHandler from 'express-async-handler';
import nodeMailer from 'nodemailer';
import ejs from 'ejs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const sendEmail = asyncHandler(async(userEmail, subject, appointmentData) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  ejs.renderFile(__dirname + '/emailBooking.ejs',
    {userEmail, subject, appointmentData}, 
    (err, data) => {
      if (err) {
        const error = new Error(err);
        error.statusCode = 401;
        throw error;
      }else{
        var mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: userEmail,
          subject: subject,
          html: data
        };
        transporter.sendMail(mailOptions);
      }
    }
  )
})