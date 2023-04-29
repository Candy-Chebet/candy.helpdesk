// models/Evaluation.js

const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  satisfactionRating: { type: Number, required: true },
  issueResolved: { type: Boolean, required: true },
  timelyResolution: { type: Boolean, required: true },
  comments: { type: String }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);