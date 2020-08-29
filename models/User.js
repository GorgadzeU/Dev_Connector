const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// generate auth token
UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(payload, config.get('jwtSecret'), {
    expiresIn: 360000,
  });

  await user.save();

  return token;
};

//hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(8);

    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

module.exports = User = mongoose.model('user', UserSchema);
