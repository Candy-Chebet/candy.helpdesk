const mongoose = require('mongoose');

const FacultyTicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  problem: { type: String, required: true },
  description: { type: String, required: true },
  priorityLevel: { type: String, required: true },
  departmentAssigned: { type: String, required: true },
});

module.exports = mongoose.model('FacultyTicket', FacultyTicketSchema);
