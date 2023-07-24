// Imported required packages
const express = require('express'),
 path = require('path'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 mongoose = require('mongoose');

// MongoDB Databse url
let dbName = "employeeDetails";
var mongoDB = 'mongodb://127.0.0.1:27017/' + dbName;

// Created express server
const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
 () => { console.log('Database is connected:', dbName) },
 err => { console.log('There is problem while connecting database ' + err) }
);

// All the express routes
const employeeRoutes = require('./_routes/Employee.Route');

// Conver incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 5000;

// Routes Configuration
app.use('/employees', employeeRoutes);

// Staring our express server
const server = app.listen(port, function () {
 console.log('Server listening on port: ' + port);
});
