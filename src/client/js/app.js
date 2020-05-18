
const travelApp = async (city, date) => {
    let duration = await Client.duration(date);
    console.log(`duration is ${duration}`);
    Client.checkDate(date)
    let location = await Client.geonames(city);
    console.log(location);

    let image = await Client.pixabay(city, location.country);
    console.log(`The coordinates are: ${location.longitude, location.latitude}`);

    let weather = await Client.temperature(location.longitude, location.latitude,duration,date);

    console.log(weather);

    const tripData = {
        'city': city,
        'country': location.country,
        'duration': duration,
        'longitude': location.longitude,
        'latitude': location.latitude,
        'max_temp': weather.max_temp,
        'min_temp': weather.min_temp,
        'weather_desc': weather.precip,
        'imageUrl': image,
      }
      console.log(tripData);    
    await postTrip('http://localhost:8081/trip', { tripData })
    // .then(getWeather('http://localhost:8081/weather'))

    document.getElementById('city-country').innerHTML = `${tripData.city}, ${tripData.country} is`;
    document.getElementById('duration').innerHTML = `${tripData.duration} days away.`;
    document.getElementById('temperature').innerHTML = `High is: ${tripData.max_temp}, Low is: ${tripData.min_temp}`;
    document.getElementById('weather').innerHTML = `The precipitation index is ${tripData.weather_desc}.`;
    document.getElementById('city-image').src = tripData.imageUrl;
    return tripData;
}
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

// Implement the GET method to receive information from the server endpoint
// const getWeather = async (url = '') => {
//     const response = await fetch(url, {
//         method: 'GET',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
//     try {
//         const userData = await response.json();
//         console.log(`The userData is ${userData}`);
//         // document.getElementById('city-country').innerHTML = `${userData.city}, ${userData.country} is`;
//         // document.getElementById('duration').innerHTML = `${userData.duration} days away.`;
//         // document.getElementById('temperature').innerHTML = `High is: ${userData.max_temp}, Low is: ${userData.min_temp}`;
//         // document.getElementById('weather').innerHTML = `The precipitation index is ${userData.weather_desc}.`;
//         // document.getElementById('city-image').src = userData.imageUrl;
//     } catch (error) {
//       console.log('error', error);
//     }
// }

export { travelApp }