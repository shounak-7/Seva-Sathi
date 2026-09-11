const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    contractId: {
      type: String,
      default: null,
      index: true
    },
    requirementId: {
      type: String,
      default: null,
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
    serviceTitle: {
      type: String,
      required: true,
      trim: true
    },
    breakdown: {
      workerCount: { type: Number, required: true },
      ratePerDay: { type: Number, required: true },
      totalDays: { type: Number, required: true },
      subtotal: { type: Number, required: true },
      cooperativeFee: { type: Number, default: 0 },
      totalAmount: { type: Number, required: true }
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending',
      index: true
    },
    paidAt: {
      type: Date,
      default: null
    },
    paymentMethod: {
      type: String,
      default: 'Corporate Escrow (Demo Mode)'
    },
    transactionId: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
