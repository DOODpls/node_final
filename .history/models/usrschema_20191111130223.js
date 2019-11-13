const mongoose = require('mongoose');
const userschemas = new mongoose.Schema(
  {
    name: {
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
    over_18: {
      type: Boolean,
      default: false
    }
  }
);


const userschema = mongoose.model('users', userschemas);

module.exports = userschema;