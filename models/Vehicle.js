const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vin: { type: String, required: true, unique: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: false },
  owner: { type: String, required: true },
  estimation: { type: Number, required: true },
  status: { type: String, enum: ['IN CENTER', 'IN PROGRESS', 'SERVICE DONE', 'DELIVERED'], default: 'IN CENTER' },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
