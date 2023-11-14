import mongoose from 'mongoose';
const { Schema } = mongoose;

const doctorSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  specialties: {
    type: mongoose.Types.ObjectId,
    ref: 'Specialtie',
    require: true
  },
  about: String,
  phone: String,
  ticketPrice: {
    type: Number,
    require: true
  },
  media: [
    {
      facebook: String
    },
    {
      instagrame: String
    },
    {
      website: String
    }
  ],
  totalRating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);