//import geonames from {geonames};

const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

var path = require('path')

const express = require('express')

//const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')

const cors = require('cors')

// Initialise the global server endpoint that will store all the data to be sent to the client app
let tripData = {
  'city': '',
  'country': '',
  'duration': 0,
  'longitude': 0,
  'latitude': 0,
  'max_temp': 0,
  'min_temp': 0,
  'weather_desc': '',
  'imageUrl':''
} 
// Initialise the variable that will store the input data received from the user
let inputTrip = '';

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
port = 8081
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

// Set the post method to receive the input data from the user and store it in the inputTrip vatiable
// and update some of the endpoint parameters: city and departure date
app.post('/trip', saveTrip);
 
 function saveTrip (req, res) { 	
  inputTrip = req.body.userData;
  console.log(inputTrip);
  dep_date = inputTrip.date;
  tripData.duration = duration(dep_date);
  tripData.city = inputTrip.city;
  tripData.date = dep_date;
  
  res.send('{\"Status\":\"OK\"}');
}

// Send the trip information to the client API by calling several external API functions

app.get('/weather', sendTripInfo);

function sendTripInfo(req, res) {
  console.log('Sending the weather forecast');
  // Call the geonames function to receive the longitude, latitude and country for the given city
  geonames(tripData.city);
  console.log(`After running geonames the tripData is: ${tripData}`);
  // Call the weatherbit function to receive the maximum and minimum temperature and the precipitation index
  // for the given coordinates
  weatherbit(tripData.longitude,tripData.latitude,tripData.duration);
  console.log(tripData);
  pixabay(tripData.city, tripData.country);
  res.send(tripData)
  //res.send(tripData)

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

// Get the country, longitude and latitude from Geonames API by entering the city and record these parameters into
// the tripData endpoint

function geonames(city) {
  
  const user = process.env.USERNAME;
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

// Take the longitude, latitude and the period until the trip get the maximum and minimum temperature and update
// the tripData endpoint with this new information

function weatherbit(lng,lat,duration) {
  const Key = process.env.KEY;
  //const Key = '90151fcc483c4a0e8d89cec631ff5381';
  const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
  const lonlatURL = '&lat=' + lat + '&lon=' + lng + '&days=' + duration + '&key=';
  const entireUrl = baseURL + lonlatURL + Key;

  const getWeather = async ( url = '')=>{
      // console.log(data)
        const response = await fetch(url);
  
        try {
          const body = await response.json();
          //console.log(body);
          tripData.max_temp = body.data[duration-1].max_temp;
          tripData.min_temp = body.data[duration-1].min_temp; 
          tripData.weather_desc = body.data[duration-1].precip;
          return tripData;
        }catch(error) {
        console.log("error", error);
        // appropriately handle the error
        }
    }
  getWeather(entireUrl);
}

// Take the name of the city and country, find a photo of the city and display it in the user travel app via the url

function pixabay (city, country) {
  const key = process.env.KEYPIX;
  //const key = '16563560-96393db758b1386eb9e57f9fa'

  //'https://pixabay.com/api/?key=16563560-96393db758b1386eb9e57f9fa&q=yellow+flowers&image_type=photo'

  const baseURL = 'https://pixabay.com/api/?key=';
  const parametersURL = '&q='+ city + '+' + country +'&image_type=photo&orientation=horizontal&category=places&per_page=3';
  const entireUrl = baseURL + key + parametersURL;

  const getPhoto = async ( url = '')=>{
    // console.log(data)
      const response = await fetch(url);

      try {
        const body = await response.json();
        //console.log(body);
        tripData.imageUrl = body.hits[0].webformatURL;
        console.log(tripData.imageUrl);
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }
getPhoto(entireUrl);
}

