### Plan Your Trip API

This is a one-page application that receives the city and the date to which and when the user is planning to travel and 
returns the weather forecast for the destination date and updates the picture with the photo of the destination city.

This API uses the following external APIs to get information:

Geonames: to receive the longitude and latitude based on the destination city;
Weatherbit: to receive the forecast based on the longitude and latitude;
Pixabay: to receive the photo url based on the city and country.

## Configuration

The project uses Webpack and Webpack Dev Server, Express, Node, Sass, Service Workers and Jest.
It is setup with the development and production environments via Webpack.
The development server is running on port 8080 and the production server is running on port 8081.

## Functionality

The project is a two-line form for user to put the city and departure date.
Once the user has inputed the data into the form and clicked "Get info" button, the API sends the data via the POST method to the local server operating on port 8081. The local server stores all the information for the trip in the global variable tripData, which is the app endpoint.
Having received the user input, the local server makes the following requests to the external API:
1) Geonames: taking the city as the basis, the server requests Geonames for the country, longitude and latitude of the distination city;
2) Weatherbit: taking the longitude and latitude, the server requests Weatherbit for the weather forecast for the destination city for the departure date.
3) Pixabay: taking the city and the country, the server requests Pixabay for an url of an image for the destination city.
4) Period before the trip: taking the departure date, the server calculates the period left before the trip.

Once all the trip information has been gathered in the API endpoint tripData, the server sends it back, via the GET request, to the client function, formHandler, which dynamically updates the user interface by making changes to the properties of relevant DOM elements.

## Development server and production server

The app is using two modes: development and production.
The development server runs on port 8080 and when the production server is launched, outputs the results from the 
external API to the user interface.
The production server runs on port 8081.

## Additional features

The project uses SASS for styling and minifies js and styles for the production environment.
Besides, the client API can show the content offline but cannot make calls to the external API offline.