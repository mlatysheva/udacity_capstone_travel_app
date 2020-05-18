const fetch = require('node-fetch');
// const dotenv = require('dotenv');
// dotenv.config();

const path = require('path')
const express = require('express')

//const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')

const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// Listen for requests on the given port
const port = 8081
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

// Initialise the global server endpoint that will store all the data sent from the client app
let tripData = {
  'city': '',
  'country': '',
  'duration': 0,
  'length': 0,
  'longitude': 0,
  'latitude': 0,
  'max_temp': 0,
  'min_temp': 0,
  'weather_desc': '',
  'imageUrl':''
} 


// Set the post method to receive the input data from the user and store it in the inputTrip vatiable
// and update some of the endpoint parameters: city and departure date
app.post('/trip', saveTrip);
 
 function saveTrip (req, res) { 	

  tripData = req.body.tripData;
  console.log(tripData);
  
  res.send('{\"Status\":\"OK\"}');
}

// Send the global tripData variable to the client API 

app.get('/weather', sendTripInfo);

function sendTripInfo(req, res) {
    res.send(tripData)
}

module.exports = app;