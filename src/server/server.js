// Connect dependencies and libraries
var path = require("path")
const cors = require("cors");
const express = require("express");
const request = require('supertest');
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();


//Variables
let allTrips = [];

// Start up an instance of app
const app = express()

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"))


// Initialize routes
app.get("/", function (req, res) { 
    path.join(__dirname, '/dist/index.html');
})

//add new trip in allTrips array
app.post("/addTrip", addTrip);

function addTrip(req, res) {
    
    allTrips.push({
        id: req.body.trip.id,
        city: req.body.trip.city,
        country: req.body.trip.country,
        latitude: req.body.trip.latitude,
        longitude: req.body.trip.longitude,
        startDate: req.body.trip.startDate,
        endDate: req.body.trip.endDate,
        images: req.body.trip.images,
        forecast:  req.body.trip.forecast
    })

    res.send(allTrips);
}


// Delete selected trip
app.post("/deleteTrip", deleteTrip);

function deleteTrip(req, res) {
    
    allTrips.forEach((trip, index) => {
        if (trip.id == req.body.id) {
            allTrips.splice(index, 1);
        }
    });
}


//get all trips
app.get("/getTrips", getTrips);

function getTrips(req, res) {
    res.send(allTrips);
}


// Setup Server
const port = 8000;

app.listen(port, listening);

function listening(){
    console.log(`Running on localhost: ${port}`);
};


// Express server test
app.get('/test', (req, res) => {
    res.status(200).send('Hello World!')
})

module.exports = app