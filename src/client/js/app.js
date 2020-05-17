const travelApp = async (city = 'Paris', date) => {
    let duration = await Client.duration(date);
    console.log(`duration is ${duration}`);
    Client.checkDate(date);
    let location = await Client.geonames(city);
    console.log(location);
    
    // async function weather(duration) {
    //     let weather;
        if (duration < 17) {
            let weather = await Client.weatherbit(location.longitude, location.latitude, duration)
        } else {
            let weather = await Client.weatherbitHistory(location.longitude, location.latitude, date)
        };
    //     return weather;
    // }
    // weather(duration);
    console.log(weather);
    let image = await Client.pixabay(city, location.country);
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
    return tripData;
}

export {travelApp}