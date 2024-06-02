const User = require('../models/User');
const Vehicle = require('../models/Vehicle');

const mongoService = {
  getAllUsers: async () => {
    try {
      return await User.find();
    } catch (error) {
      throw new Error('Error fetching users');
    }
  },

  getUserById: async (userId) => {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw new Error('Error fetching user');
    }
  },
  getUserByUsername: async (username) => {
    try {
      return await User.findOne({username:new RegExp(username, "i")});
    } catch (error) {
      throw new Error('Error fetching user by username');
    }
  },
  addUser: async (userData) => {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error('Error adding user');
    }
  },

  updateUser: async (userId, newData) => {
    try {
      return await User.findByIdAndUpdate(userId, newData, { new: true });
    } catch (error) {
      throw new Error('Error updating user');
    }
  },

  deleteUser: async (userId) => {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error('Error deleting user');
    }
  },

  getAllVehicles: async () => {
    try {
      return await Vehicle.find();
    } catch (error) {
      throw new Error('Error fetching vehicles');
    }
  },

  getVehicleByVin: async (vin) => {
    try {
      return await Vehicle.findOne({ vin });
    } catch (error) {
      throw new Error('Error fetching vehicle');
    }
  },

  addVehicle: async (vehicleData) => {
    try {
      const newVehicle = new Vehicle(vehicleData);
      return await newVehicle.save();
    } catch (error) {
      throw new Error('Error adding vehicle');
    }
  },

  updateVehicle: async (vin, newData) => {
    try {
      return await Vehicle.findOneAndUpdate({ vin }, newData, { new: true });
    } catch (error) {
      throw new Error('Error updating vehicle');
    }
  },

  deleteVehicle: async (vin) => {
    try {
      return await Vehicle.findOneAndDelete({ vin });
    } catch (error) {
      throw new Error('Error deleting vehicle');
    }
  }
};

module.exports = mongoService;
