const mongoose = require('../config/db');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  books: {
    type: Array
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
