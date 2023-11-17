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
    require: true,
    default: 0
  },
  media: {
    facebook: {
      type: String,
      require: true,
      default: ''
    },
    insta: {
      type: String,
      require: true,
      default: ''
    },
    twitter: {
      type: String,
      require: true,
      default: ''
    },
    website: {
      type: String,
      require: true,
      default: ''
    }
  },
  //   {
  //     platform: {
  //       type: String,
  //       default: 'facebook'
  //     },
  //     link: {
  //       type: String,
  //       default: ''
  //     }
  //   },
  //   {
  //     platform: {
  //       default: 'insta'
  //     },
  //     link: {
  //       type: String,
  //       default: ''
  //     }
  //   },
  //   {
  //     platform: {
  //       default: 'twitter'
  //     },
  //     link: {
  //       type: String,
  //       default: ''
  //     }
  //   },
  //   {
  //     platform: {
  //       default: 'website'
  //     },
  //     link: {
  //       type: String,
  //       default: ''
  //     }
  //   },
  // ],
  totalRating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);