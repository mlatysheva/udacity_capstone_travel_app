// Receive the city and date input by the user and run check functions to see if the data is valid
// Invoke the main app function that will collect all data from APIs and send the data to the server
async function handleSubmit(event) {
    event.preventDefault()

    // Save the input city into a variable
    let city = document.getElementById('city').value
    console.log(`The city is ${city}`);
    let dep_date = document.getElementById('date').value;
    console.log(`The departure date is ${dep_date}.`);
    let return_date = document.getElementById('return-date').value;
    //let today = new Date().toLocaleDateString();
    let today = new Date();
    console.log(`Today's date is ${today}`);
    
    // Check if the input city is not an empty string
    Client.checkInput(city);
    
    // Check if the departure date is more than 16 days away
    Client.checkDate(today, dep_date);

    // Check if the return date is more than the departure date - valid
    Client.checkTripLength(dep_date, return_date);

    console.log("Form Submitted");  
    let userData = await Client.travelApp(city, dep_date, return_date);
    console.log(userData);     
}

// Run main function that will collect data from external APIs, store the data in the app endpoint tripData
// and send the tripData to the server and
// update the user interface with the data received from the APIs

const travelApp = async (city, dep_date, return_date) => {
    // Invoke the function to calculate how many days before the trip
    //let today = new Date().toLocaleDateString();
    let today = new Date();
    console.log(`Today is ${today} and dep_date is ${dep_date}`);

    // Calculate how many days the departure date is apart from today
    let duration = await Client.duration(today, dep_date);

    // Calculate the duration of the trip and check if the return date is more than the departure date
    let length = await Client.duration(dep_date, return_date);
    
    console.log(`Days before the trip: ${duration}.`);
    console.log(`The length of the trip is ${length} days.`)
    //Client.checkDate(date)

    // Invoke the function to get the coordinates and country for the given city
    let location = await Client.geonames(city);
    console.log(`The location is ${location}`);

    // Invoke the function to get the url of the image of the city
    let image = await Client.pixabay(city, location.country);

    // Invoke the function to get the max and min temperature and the precipitation index for the given 
    // coordinates and date

    let weather = await Client.temperature(location.longitude, location.latitude, duration, dep_date);

    // Initialise the app endpoint variable that stores all the trip data

    const tripData = {
        'city': city,
        'country': location.country,
        'duration': duration,
        'length': length,
        'longitude': location.longitude,
        'latitude': location.latitude,
        'max_temp': weather.max_temp,
        'min_temp': weather.min_temp,
        'weather_desc': weather.precip,
        'imageUrl': image,
      }
      console.log(`The tripData is ${tripData}`); 

    // Use the method POST to send the tripData to the server to store  
    await postTrip('http://localhost:8081/trip', { tripData })
    // .then(getWeather('http://localhost:8081/weather'))

    // Update the user interface dynamically with the data collected from external APIs

    document.getElementById('city-country').innerHTML = `${tripData.city}, ${tripData.country} is`;
    document.getElementById('duration').innerHTML = `${tripData.duration} days away.`;
    document.getElementById('temperature').innerHTML = `High is: ${tripData.max_temp}, Low is: ${tripData.min_temp}`;
    document.getElementById('weather').innerHTML = `The precipitation index is ${tripData.weather_desc}.`;
    document.getElementById('city-image').src = tripData.imageUrl;
    document.getElementById('trip-length').innerHTML = `Your trip will be ${tripData.length} days long.`;
    return tripData;
}

// Define the POST method to send the API endpoint variable to the server
const postTrip = async (url = '', data = {}) => {
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

// Define the GET method to receive information from the server endpoint

const getWeather = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        const userData = await response.json();
        console.log(`The userData is ${userData}`);
    } catch (error) {
      console.log('error', error);
    }
}

export { handleSubmit,
        travelApp }