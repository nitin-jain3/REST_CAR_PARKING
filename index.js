const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

const parkingRouter = require('./routes/parking.route');

const app = express();
app.use(morgan('combined'));

const url = process.env.DB_URL;
mongoose.connect(url, { useNewUrlParser: true })
const connection = mongoose.connection;

connection.on('open', () => {
    console.log('database connected...');
})

// Routes Here
app.use('/parking', parkingRouter);

// Starting the server here
app.listen(3000, () => {
    console.log('Server listening on port 3000');
})