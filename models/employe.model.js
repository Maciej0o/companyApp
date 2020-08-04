const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true, ref: 'Department' }
});

module.exports = mongoose.model('Employe', employeSchema);