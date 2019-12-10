// Connect dependencies and libraries
var path = require('path')
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();


// Start up an instance of app
const app = express()

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))


// Initialize routes
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.post('/test', function (req, res) {
    console.log(req);
})


// Setup Server
const port = 8000;

app.listen(port, listening);

function listening(){
    console.log(`Running on localhost: ${port}`);
};