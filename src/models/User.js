const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const userSchema = new Schema(
  {
    firstName: {
      ...requiredString,
      trim: true,
    },
    lastName: {
      ...requiredString,
      trim: true,
    },
    email: {
      ...requiredString, unique: true, lowercase: true, trim: true,
    },
    password: requiredString,
    avatar: {
      url: {
        type: String,
        trim: true,
        default:
          'https://res.cloudinary.com/dj50j2x97/image/upload/v1665922005/150_whwxod.jpg',
      },
      id: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true },
);

// Password hash middleware.

// eslint-disable-next-line consistent-return
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    // eslint-disable-next-line no-shadow
    return bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      return next();
    });
  });
});

// Helper method for validating user's password.

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb,
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
