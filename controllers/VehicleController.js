const mongoService = require('../services/mongoService');

const VehicleController = {
  getAllVehicles: async (req, res) => {
    // Implementation to fetch all vehicles using mongoService
    try {
      const vehicles = await mongoService.getAllVehicles();
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getVehicleByVin: async (req, res) => {
    // Implementation to fetch a vehicle by VIN using mongoService
    try {
      const vehicle = await mongoService.getVehicleByVin(req.params.vin);
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addVehicle: async (req, res) => {
    // Implementation to add a new vehicle using mongoService
    try {
      const newVehicle = await mongoService.addVehicle(req.body);
      res.status(201).json(newVehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateVehicle: async (req, res) => {
    // Implementation to update a vehicle using mongoService
    try {
      const updatedVehicle = await mongoService.updateVehicle(req.params.vin, req.body);
      res.status(200).json(updatedVehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteVehicle: async (req, res) => {
    // Implementation to delete a vehicle using mongoService
    try {
      const deletedVehicle = await mongoService.deleteVehicle(req.params.vin);
      res.status(200).json(deletedVehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = VehicleController;
