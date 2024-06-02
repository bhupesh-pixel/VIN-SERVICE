const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/VehicleController');

router.get('/', VehicleController.getAllVehicles);
router.get('/:vin', VehicleController.getVehicleByVin);
router.post('/', VehicleController.addVehicle);
router.put('/:vin', VehicleController.updateVehicle);
router.delete('/:vin', VehicleController.deleteVehicle);

module.exports = router;
