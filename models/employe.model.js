const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String }
});

module.exports = mongoose.model('Employe', employeSchema);