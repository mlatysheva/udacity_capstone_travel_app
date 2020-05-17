async function handleSubmit(event) {
    event.preventDefault()

    // Save the input city into a variable
    let city = document.getElementById('city').value
    console.log(`The city is ${city}`);
    let dep_date = document.getElementById('date').value
    console.log(`The departure date is ${dep_date}.`);
    let today = new Date().toLocaleDateString();
    console.log(`Today's date is ${today}`);
    
    
    // Check if the input text is not an empty string
    Client.checkInput(city);

    console.log("Form Submitted");  
    let userData = await Client.travelApp(city, dep_date);
    console.log(userData);  
    document.getElementById('city-country').innerHTML = `${userData.city}, ${userData.country} is`;
    document.getElementById('duration').innerHTML = `${userData.duration} days away.`;
    document.getElementById('temperature').innerHTML = `High is: ${userData.max_temp}, Low is: ${userData.min_temp}`;
    document.getElementById('weather').innerHTML = `The precipitation index is ${userData.weather_desc}.`;
    document.getElementById('city-image').src = userData.imageUrl;

    // Post the input text to the server API and receive the sentiment 
    // analysed through the external API configured on the server side

    // postTrip('http://localhost:8081/trip', { "city": city, "date": dep_date})
    await postTrip('http://localhost:8081/trip', { userData})
    // .then(getWeather('http://localhost:8081/weather'))
}

// Implement the POST method to send data to the server endpoint
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
        console.log(userData)
        document.getElementById('city-country').innerHTML = `${userData.city}, ${userData.country} is`;
        document.getElementById('duration').innerHTML = `${userData.duration} days away.`;
        document.getElementById('temperature').innerHTML = `High is: ${userData.max_temp}, Low is: ${userData.min_temp}`;
        document.getElementById('weather').innerHTML = `The precipitation index is ${userData.weather_desc}.`;
        document.getElementById('city-image').src = userData.imageUrl;
    } catch (error) {
      console.log('error', error);
    }
  }

export { handleSubmit }
