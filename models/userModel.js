import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  photo: String,
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    required: true,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },  
}, { timestamps: true }) 


// Soft Delete
const User =  mongoose.model('User', userSchema);
userSchema.methods.softDeleteById = async userId => {
  // const user = userSchema.find({ id: userId})
  console.log('-------------======', 'user')
}
export default User;