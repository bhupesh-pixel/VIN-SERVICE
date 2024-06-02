const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
  accessProfile: { type: String, enum: ['admin', 'host', 'mechanic', 'deliveryman'] },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
