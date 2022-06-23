const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    carNumber: {
        type: String,
        required: true
    },
    isParked: {
        type: Boolean,
        required: true,
        default: true,
    }
});

module.exports = mongoose.model('Parking', parkingSchema);