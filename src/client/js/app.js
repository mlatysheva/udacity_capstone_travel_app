const travelApp = async (city = 'Paris', date) => {
    let duration = await Client.duration(date);
    console.log(duration);
    let location = await Client.geonames(city);
    console.log(location);
    let weather = await Client.weatherbit(location.longitude, location.latitude, duration);
    console.log(weather);
    let image = await Client.pixabay(city, location.country);
    const tripData = {
        'city': city,
        'country': location.country,
        'duration': duration,
        'longitude': location.longitude,
        'latitude': location.longitude,
        'max_temp': weather.max_temp,
        'min_temp': weather.min_temp,
        'weather_desc': weather.precip,
        'imageUrl': image,
      }
      console.log(tripData);
    return tripData;
}

export {travelApp}