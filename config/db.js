import mongoose from 'mongoose';

const connectDB = _ => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(res => {
      console.log('succ to connect')
    })
    .catch(err=>{
      console.log('failed to connect', err)
    });
} 

export default connectDB;