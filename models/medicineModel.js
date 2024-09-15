// models/medicineModel.js
const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // Cached data will expire after 1 hour
});

module.exports = mongoose.model('Medicine', MedicineSchema);