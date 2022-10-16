const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const userSchema = new Schema(
  {
    firstName: requiredString,
    lastName: requiredString,
    email: requiredString,
    password: requiredString,
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/dj50j2x97/image/upload/v1665922005/150_whwxod.jpg',
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
