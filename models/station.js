const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = require('./user')
const OrderSchema = require('./order')

const StationSchema = new Schema({
  address: String,
  userId: UserSchema.id,
  rating: String,
  stationtype: {type: String, enum: ['A', 'B', 'C', 'D'], default: 'A'},
  latitude: Number,
  longitude: Number,
  orders: [OrderSchema]

});

module.exports = UserSchema