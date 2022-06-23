const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parking.controller');

const { getAllParkedVehicles, parkCar, unparkCar, getCarParkingDetails } = parkingController;

router.get('/', getAllParkedVehicles);
router.get('/parkCar', parkCar);
router.put('/unpark', unparkCar);
router.get('/parkingDetails', getCarParkingDetails)

module.exports = router;