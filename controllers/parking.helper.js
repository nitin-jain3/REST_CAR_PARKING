const parkingModel = require('../models/parking');
const sizeOfParking = process.env.parkingSize;

async function isCarParkingFull() {
    const findObj = {
        isParked: true,
    }
    const count = await parkingModel.count(findObj);
    console.log(count)
    if (count >= sizeOfParking) {
        return true;
    }
    return false;
}

module.exports = { isCarParkingFull };