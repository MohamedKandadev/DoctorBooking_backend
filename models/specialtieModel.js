import mongoose from 'mongoose';
const { Schema } = mongoose;

const specialtieSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
}, { timestamps: true }) 

const specialtie = mongoose.model('Specialtie', specialtieSchema);
export default specialtie;