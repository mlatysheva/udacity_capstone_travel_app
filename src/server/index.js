//import geonames from {geonames};

const dotenv = require('dotenv');
const fetch = require("node-fetch");

dotenv.config();
var path = require('path')
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
//var aylien = require('aylien_textapi')
let tripData = {
  "city": "Paris",
  "country": "France",
  "duration": 1,
  "longitude": 45,
  "latitude": 60,
  "temperature_high": 25,
  "temperature_low": 9,
  "weather_desc": "It will be mostly cloudy throughout the day."
} 
let inputTrip = '';

// set aylien API credentias
// var textapi = new aylien({
//   application_id: process.env.API_ID,
//   application_key: process.env.API_KEY
// });

const app = express()

app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

//console.log(JSON.stringify(mockAPIResponse))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// Listen for requests on the given port
port = 8081
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
//     console.log('app.get test is run here')
// })

app.post('/trip', saveTrip);
 
 function saveTrip (req, res) { 	
  inputTrip = req.body;
  dep_date = inputTrip.date;
  tripData.duration = duration(dep_date);
  tripData.city = inputTrip.city;
  tripData.date = dep_date;
  // console.log('Received the data from the user');
  // console.log(`The req.body is ${inputTrip.city}`); 
  // console.log(`The inputTrip.date is ${Date.parse(inputTrip.date)}`);  
  

  res.send('{\"Status\":\"OK\"}');
}

// Request results from the Alyen API for the text input by the user

app.get('/weather', sendTripInfo);

function sendTripInfo(req, res) {
  console.log('Sending the weather forecast');
  geonames(tripData.city);  
  console.log(tripData)
  res.send(tripData)

}

// Calculate the number of days your trip apart.

function duration(dep_date) {

  // Calculate the number of milliseconds per day
  const milliseconds_day = 1000 * 60 * 60 * 24;

  // Get today's date
  const today = new Date();

  // Convert the daparture date into Date object
  dep_date = new Date(dep_date);

  // Get the format out of the Date object to do math on

  const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const utc2 = Date.UTC(dep_date.getFullYear(), dep_date.getMonth(), dep_date.getDate());

  // Calculate the floor rounded number of days until your trip
  const period = Math.floor((utc2 - utc1) / milliseconds_day);
  
return period;
}

// Get the country, longitude and latitude from Geonames API by entering the city and records these parameters into
// the tripData endpoint

function geonames(city) {
  const user = 'mlatysheva';
  const baseUrl = 'http://api.geonames.org/searchJSON?q='
  const addParameters = '&maxRows=1&username=';
  const entireUrl = (baseUrl + city + addParameters + user);

  const getData = async (entireUrl) => {
      
      try {
          const response = await fetch(entireUrl);
          const data = await response.json();
          tripData.longitude = data.geonames[0].lng;
          tripData.latitude = data.geonames[0].lat;
          tripData.country = data.geonames[0].countryName;        
      } catch (error) {
        console.log("error", error);
        // appropriately handle the error
      }
    };
  getData(entireUrl);
}
//console.log(geonames('London'));

