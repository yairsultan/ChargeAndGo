const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  password: { type: String, required: true},
  email: {type: String, required: true},
  phone: { type: String, required: true},
});

var User = mongoose.model('user', UserSchema);

module.exports = User