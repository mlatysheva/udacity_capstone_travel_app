// Take the longitude, latitude and the period until the trip and
// return the maximum and minimum temperatures and the precipitation index for the given location.
// If the departure date is more than 16 days away, historic data is taken rather than the forecast

// Main function invoking either forecast or historic data API call
const temperature = async(lng,lat, duration, dep_date) => {
  let weather = (0,0);
  if (duration < 17 && duration > 0) {    
      weather = await Client.weatherbit(lng, lat, duration)
  } else {
      weather = await Client.weatherbitHistory(lng, lat, dep_date)
  };
  return weather;
}

// Get weather forecast data for the departure date that is less than 17 days away.
const weatherbit = async (lng,lat,duration) => {
  const Key = '90151fcc483c4a0e8d89cec631ff5381';
  const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
  const lonlatURL = '&lat=' + lat + '&lon=' + lng + '&days=' + duration + '&key=';
  const entireUrl = baseURL + lonlatURL + Key;
  try {
    console.log(`The coordinates are: ${lng}, ${lat}`)
    const response =  await fetch(entireUrl);
    const body = await response.json();
    const data = await body.data[duration-1];
    console.log(data);
    const details = {"max_temp": data.max_temp, "min_temp": data.min_temp, "precip": data.precip};
    console.log(details);
    return details;
  } catch (error){
    console.log(error);
  }
}

// Take the one year historic data for a departure date that is more than 16 days away.

const weatherbitHistory = async (lng,lat,dep_date) => {
  
  // Identify the historic date one year before the departure date
  const newDate = new Date(dep_date);
  let historicDate1 = new Date(new Date(newDate).setFullYear(new Date(newDate).getFullYear(newDate) - 1)).toISOString().slice(0,10);
  let historicDate2 = new Date(historicDate1)
  historicDate2.setDate(historicDate2.getDate() + 1);
  historicDate2 = historicDate2.toISOString().slice(0,10);

  const Key = '90151fcc483c4a0e8d89cec631ff5381';
  const baseURL = 'https://api.weatherbit.io/v2.0/history/daily?';
  const lonlatURL = '&lat=' + lat + '&lon=' + lng + '&start_date=' + historicDate1 + '&end_date=' + historicDate2 + '&key=';
  const entireUrl = baseURL + lonlatURL + Key;
  try {
    const response =  await fetch(entireUrl);
    const body = await response.json();
    const newData = body.data[0];
    const details = {"max_temp": newData.max_temp, "min_temp": newData.min_temp, "precip": newData.precip};
    console.log(details);
    return details;
  } catch (error){
    console.log(error);
  }
}

export { temperature,
        weatherbit,
        weatherbitHistory }