const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = require('./user')
const OrderSchema = require('./order')

const StationSchema = new Schema({
  userId: { type: UserSchema.id,required: true},
  address: { type: String, required: true},
  rating: { type: String, required: true},
  stationtype: {type: String, enum: ['A', 'B', 'C', 'D'], default: 'A'},
  latitude: {type: Number,required: true},
  longitude: {type: Number,required: true},
  orders: [OrderSchema]

});

module.exports = UserSchema