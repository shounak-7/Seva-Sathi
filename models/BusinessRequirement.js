const mongoose = require('mongoose');

const businessRequirementSchema = new mongoose.Schema(
  {
    requirementId: {
      type: String,
      required: true,
      unique: true,
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
      trim: true,
      index: true
    },
    workersNeeded: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    requiredSkills: {
      type: String,
      default: '',
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      default: 'Bengaluru',
      trim: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    schedule: {
      type: String,
      required: true,
      trim: true
    },
    ratePerWorker: {
      type: Number,
      required: true,
      min: 0
    },
    rateUnit: {
      type: String,
      enum: ['daily', 'hourly', 'monthly'],
      default: 'daily'
    },
    isRecurring: {
      type: Boolean,
      default: false
    },
    recurrenceFrequency: {
      type: String,
      enum: ['none', 'daily', 'weekdays', 'weekly', 'monthly'],
      default: 'none'
    },
    additionalRequirements: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['open', 'matching', 'allocated', 'contracted', 'completed', 'cancelled'],
      default: 'open',
      index: true
    },
    allocatedWorkers: [
      {
        workerId: { type: String, required: true },
        name: { type: String, required: true },
        skill: { type: String, default: '' },
        phone: { type: String, default: '' },
        status: { type: String, enum: ['Active', 'On Call', 'Standby', 'Completed'], default: 'Active' },
        assignedAt: { type: Date, default: Date.now },
        attendanceStatus: { type: String, default: 'Checked In' }
      }
    ],
    contractId: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.BusinessRequirement ||
  mongoose.model('BusinessRequirement', businessRequirementSchema);
