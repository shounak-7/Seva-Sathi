const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema(
  {
    contractId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    requirementId: {
      type: String,
      required: true,
      index: true
    },
    businessId: {
      type: String,
      required: true,
      index: true
    },
    businessName: {
      type: String,
      required: true,
      trim: true
    },
    serviceCategory: {
      type: String,
      required: true,
      trim: true
    },
    workerCount: {
      type: Number,
      required: true,
      min: 1
    },
    assignedWorkers: [
      {
        workerId: { type: String, required: true },
        name: { type: String, required: true },
        skill: { type: String, default: '' },
        phone: { type: String, default: '' },
        status: { type: String, enum: ['Active', 'On Call', 'Standby', 'Completed'], default: 'Active' },
        attendanceStatus: { type: String, default: 'Checked In' }
      }
    ],
    duration: {
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
      totalDays: { type: Number, default: 30 }
    },
    schedule: {
      type: String,
      required: true
    },
    ratePerWorker: {
      type: Number,
      required: true
    },
    rateUnit: {
      type: String,
      default: 'daily'
    },
    totalEstimatedAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'cancelled'],
      default: 'active',
      index: true
    },
    terms: {
      type: String,
      default: 'Cooperative Fair Workmanship & Direct Worker Protection Agreement. Overtime billed pro-rata.'
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.Contract || mongoose.model('Contract', contractSchema);
