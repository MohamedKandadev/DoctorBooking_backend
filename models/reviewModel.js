import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  patient: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true
  },
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true
  },
  review: {
    type: String,
    require: true
  }
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);