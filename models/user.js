const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  password: { type: String, required: true, minlength: 8},
  email: {type: String, required: true},
  phone: { type: String, required: true, minlength: 10, maxlength: 10},
});

const User = mongoose.model('user', UserSchema);

module.exports = User