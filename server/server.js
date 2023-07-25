// Imported required packages
const dotenv = require('dotenv');
const express = require('express'),
 path = require('path'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 mongoose = require('mongoose');

// Load environment variables from the .env file, where the MONGO_URL is configured
dotenv.config();

const { MONGO_URL } = process.env;

if (!MONGO_URL) {
  console.error("No MONGO_URL environment variable has been defined in config.env");
  process.exit(1);
}

const dbName = process.env.DBNAME
// MongoDB Databse url
// let dbName = "employeeDetails";
// var mongoDB = "mongodb+srv://allAccess:AaBbCcXxYyZz12345@cluster0.k82k8qn.mongodb.net/" + dbName;

// Created express server
const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb Database
// connectToDatabase(MONGO_URL)
//     .then(() => {
//         const app = express();
//         app.use(cors());
//         app.use("/employees", employeeRouter);

//         // start the Express server
//         // app.listen(5200, () => {
//         //     console.log(`Server running at http://localhost:5200...`);
//         // });

//     })
//     .catch(error => console.error(error));


mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
 () => { console.log('Database is connected:', dbName) },
 err => { console.log('There is problem while connecting database ' + err) }
);

// All the express routes
const employeeRoutes = require('./_routes/Employee.Route');

// Conver incoming data to JSON format
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled CORS
app.use(cors());
app.options('*', cors());

// Setup for the server port number
const port = process.env.PORT || 5000;

// Routes Configuration
app.use('/employees', employeeRoutes);

// Staring our express server
const server = app.listen(port, function () {
 console.log('Server listening on port: ' + port);
});
