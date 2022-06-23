const parkingModel = require('../models/parking');
const { isCarParkingFull } = require('./parking.helper');

async function getAllParkedVehicles(req, res) {
    const parkedCars = await parkingModel.find({});
    res.send(parkedCars);
}

async function parkCar(req, res) {
    try {
        const { carNumber = '' } = req.query;
        if (!carNumber) {
            return res.send({
                code: 500,
                message: 'Please provide carNumber',
            })
        }
        const isParkingFull = await isCarParkingFull();
        if (isParkingFull) {
            return res.send({
                code: 200,
                message: 'Parking is full',
            })
        }
        const parkingObj = {
            carNumber,
            isParked: true,
        }
        const parkingData = parkingModel(parkingObj);
        const { _id } = await parkingData.save();
        return res.send({
            code: 200,
            location: _id,
        })
    } catch (error) {
        res.send({
            code: 500,
            message: error.message,
        })
    }
}

async function unparkCar(req, res) {
    const { spaceId = '' } = req.query;
    if (!spaceId) {
        return res.send('Please enter spaceId');
    }
    const data = await parkingModel.findByIdAndUpdate({ _id: spaceId }, { isParked: false });
    console.log(data);
    return res.send({
        message: "Car unparked"
    })
}

async function getCarParkingDetails(req, res) {
    const { spaceId = '', plateNumber = '' } = req.query;
    if (!spaceId && !plateNumber) {
        return res.send({
            message: "please enter spaceId or plateNumber"
        })
    }
    const findObj = { isParked: true };
    if (spaceId) {
        findObj._id = spaceId;
    }
    if (plateNumber) {
        findObj.carNumber = plateNumber;
    }
    const carData = await parkingModel.findOne(findObj);
    if (!carData) {
        return res.send({ message: "No car parked with this number" })
    }
    return res.send(carData);
}

module.exports = { getAllParkedVehicles, parkCar, unparkCar, getCarParkingDetails };