import mongoose from 'mongoose';

const QueueSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientId: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    default: 3, // 1: High, 2: Medium, 3: Normal
  },
  status: {
    type: String,
    enum: ['waiting', 'in-progress', 'completed', 'cancelled'],
    default: 'waiting'
  },
  estimatedWaitTime: {
    type: Number, // in minutes
    required: true
  },
  checkInTime: {
    type: Date,
    default: Date.now
  }
});

export const Queue = mongoose.model('Queue', QueueSchema);