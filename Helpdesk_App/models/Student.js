const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required: true },
    problem: { type: String, required: true },
    description: { type: String, required: true },
    priorityLevel: { type: String, required: true },
    departmentAssigned: { type: String, required: true},
});

module.exports = mongoose.model("student-tickets", studentSchema);

  //students