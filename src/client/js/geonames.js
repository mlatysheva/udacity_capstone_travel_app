// What information needs to get adjusted so that instead of entering a zip code, you enter a city? 
// We want to get the latitude, longitude, country, instead of getting the temperature, feeling, and date.
// The weather data array was named differently, what do we need to change the name to?
// The weather data only had 1 object in the array, the geoname api outputs multiple objects. 
// How do we call the first object?

//import { response, request } from "express";

// Global Variables
const button = document.getElementById('submit-button');
let today = new Date().toLocaleDateString();

// Syntacsis for the api request:

const user = 'mlatysheva';
const baseUrl = 'http://api.geonames.org/searchJSON?q='
const addParameters = 'l&maxRows=10&username=';

// Integrate OpenWeatherMap API and receive weather for the zip code entered by the user

const getWeatherData = async (event) => {
  const city = document.getElementById('city').value;
  // const feelings = document.getElementById('feelings').value;
  const entireUrl = (baseUrl + city + addParameters + user);
  const response = await fetch(entireUrl)
  try {
    const data = await response.json();
    console.log(data);
    postData('http://localhost:8081/source-data', { latitude: data.latitude, longitude: data.longitude, country: data.country });
    getData('http://localhost:8081/trip');
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// Get data from the app endpoint as an asyncronous function
// and update dynamically the UI
const getData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  try {
    const userData = await response.json();
    document.getElementById('date').innerHTML = `Today's date is ${userData[0].date}`;
    document.getElementById('city').innerHTML = `Your city is ${userData[0].city}`;
    document.getElementById('temp').innerHTML = `Today's temperature is ${userData[0].temperature} Celcius`;
    document.getElementById('content').innerHTML = `You feel today ${userData[0].userResponse}.`;

  } catch (error) {
    console.log('error', error);
  }
}

// Post data to the app endpoint as an asynchronous function

const postData = async (url = '', data = {}) => {
  //console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
}

// Set the button Generate to listen to a click and call the function to 
// dynamically update the user interface

button.addEventListener('click', getWeatherData);

