const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = require('./user')
const StationSchema = require('./station')

const OrderSchema = new Schema({
  userId: UserSchema.id,
  stationId: StationSchema.id,
  price: Number,
  appointmentDate: {type: Date, default : Date.now},
  startTime: Date,
  endTime: Date,
  status: {type: String, enum: ['placed', 'approved', 'inProgress', 'finished'], default: 'A'}
});