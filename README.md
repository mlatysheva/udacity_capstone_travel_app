### Plan Your Trip API

This is a one-page form application that: 
- receives from the user the city, the departure date and the return date, 
- makes API calls to three external APIs and receives weather and location data, 
- calculates how many days the trip is away,
- calculates the length of the trip,
- posts the collected trip data to the server and 
- updates the user interface with the data it returns:
1) from Weatherbit API: the weather forecast (max and min temperature and precipitation index) for the departure date if the trip is no more than 16 days away or
2) from Weatherbit API: the historic weather data (max and min temperature and precipitation index) for the departure date if the trip is more than 16 days way 
3) from Geonames API: the longitude, latitude and the country
4) from Pixabay API: the url of an image for the given city and country

## Configuration

The project uses Webpack and Webpack Dev Server, Express, Node, Sass, Service Workers and Jest.
It is setup with the development and production environments via Webpack.
The development server is running on port 8080 and the production server is running on port 8081.

## Functionality

The project is a three-line form for user to input the city, the departure date and the return date for his/her upcoming trip.
Once the user has inputed the data into the form and clicked "Get info" button, the Travel App makes external API calls to Geonames, Weatherbit and Pixabay APIs by invoking dedicated functions:
1) Geonames: taking the city as the basis, the Travel App calls Geonames API to get the country, longitude and latitude of the distination city;
2) Weatherbit: taking the longitude, latitude, and the departure date, Travel App requests Weatherbit for the weather forecast for the destination city for the departure date.
If the departure date is more than 16 days away, Travel App makes a different call to get historic data instead.
3) Pixabay: taking the city and the country, Travel App requests Pixabay for an url of an image for the destination city.
4) Period before the trip and duration of the trip: taking the departure date, Travel App calculates the period left before the trip.
Taking the departure and return dates, Travel App calculates the duration of the trip.

Travel App collects all the data into the tripData endpoint variable that it sends via the POST method to the local server operating on port 8081. The local server stores all the information about the trip.

Once all the trip information has been gathered in the API endpoint tripData, Travel App dynamically updates the user interface by making changes to the properties of relevant DOM elements.

## Development server and production server

The app is using two modes: development and production.
The development server runs on port 8080 and when the production server is launched, outputs the results from the 
external API to the user interface.
The production server runs on port 8081.

## Additional features

The project uses SASS for styling, service workers to make content available offline and minifies js and styles for the production environment. Besides, the client API can show the content offline but cannot make calls to the external API offline. There are three simple Jest tests added to check some js functionality on the client and server sides.