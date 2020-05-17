// Take the longitude, latitude and the period until the trip get the maximum and minimum temperature and update
// the tripData endpoint with this new information
// const fetch = require("node-fetch");
const weatherbit = async (lng,lat,duration) => {
  //const Key = process.env.KEY;
  const Key = '90151fcc483c4a0e8d89cec631ff5381';
  const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
  const lonlatURL = '&lat=' + lat + '&lon=' + lng + '&days=' + duration + '&key=';
  const entireUrl = baseURL + lonlatURL + Key;
  try {
    const response =  await fetch(entireUrl);
    const body = await response.json();
    const data = await body.data[duration-1];
    console.log(data);
    const details = {"max_temp": data.max_temp, "min_temp": data.min_temp, "precip": data.precip};
    //console.log(details);
    return details;
  } catch (error){
    console.log(error);
  }
}
// weatherbit(2.3488,48.85341,3)

export {weatherbit}