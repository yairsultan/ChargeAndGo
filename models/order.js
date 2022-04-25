const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = require('./user')
const StationSchema = require('./station')

const OrderSchema = new Schema({
  userId: {type: UserSchema.id,required: true},
  stationId: {type: StationSchema.id,required: true},
  price:  {type: Number,required: true},
  appointmentDate: {type: Date, default : Date.now},
  startTime: {type:Date,required: true},
  endTime: {type:Date,required: true},
  status: {type: String, enum: ['placed', 'approved', 'inProgress', 'finished'], default: 'placed',required: true},
});