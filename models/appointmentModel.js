import mongoose from 'mongoose';
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  patient: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  status: {
    type: String,
    enum: [
      'booked',  // If Doctor Not Valid This Booking And Date of the booking pass will be decline automatique
      'valid',   // When Doctor Valid This Booking
      'decline', // When Doctor Decline This Booking
      'completed'// When This Booking Completed Between Doctor and Patient
    ],    
    default: 'booked'
  },
  appointmentTime: {
    type: Date,
    require: true
  }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);