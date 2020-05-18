// Take the longitude, latitude and the period until the trip get the maximum and minimum temperature and update
// the tripData endpoint with this new information
// const fetch = require("node-fetch");

// Take the current forecast data

const temperature = async(lng,lat, duration, dep_date) => {
  let weather = (0,0);
  if (duration < 17 && duration > 0) {    
      weather = await Client.weatherbit(lng, lat, duration)
  } else {
      weather = await Client.weatherbitHistory(lng, lat, dep_date)
  };
  return weather;
}
//temperature(duration);
const weatherbit = async (lng,lat,duration) => {
  //const Key = process.env.KEY;
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

// Take the one year historic data for a departure date that is more than 16 days apart

const weatherbitHistory = async (lng,lat,dep_date) => {
  // const Key = process.env.KEY;

  // The format of the API request to get historic data is: &lat=38.123&lon=-78.543&start_date=2020-05-13&end_date=2020-05-14
  // Transform the departure date into a date one year ago and calculate the following date
  // to get the start and end dates for the API request

  const newDate = new Date(dep_date);
  let historicDate1 = new Date(new Date(newDate).setFullYear(new Date(newDate).getFullYear(newDate) - 1)).toISOString().slice(0,10);
  //let historicDate1 = new Date(newDate).setFullYear(new Date(newDate).getFullYear(newDate) - 1).toISOString().slice(0,10);
  let historicDate2 = new Date(historicDate1)
  historicDate2.setDate(historicDate2.getDate() + 1);
  historicDate2 = historicDate2.toISOString().slice(0,10);
  console.log(`historicdate2 is ${historicDate2}`);
  console.log(`historicDate1 is ${historicDate1}`);

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
// weatherbitHistory(2.3488,48.85341,'2020-06-11')


export { temperature,
        weatherbit,
        weatherbitHistory }