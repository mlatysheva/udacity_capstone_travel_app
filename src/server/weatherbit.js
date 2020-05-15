
const fetch = require("node-fetch");

function weatherbit(lng,lat,duration,tripData) {
    //const Key = process.env.KEY;
    const Key = '90151fcc483c4a0e8d89cec631ff5381';
    const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    const lonlatURL = '&lat=' + lat + '&lon=' + lng + '&days=' + duration + '&key=';
    const entireUrl = baseURL + lonlatURL + Key;

    //http://api.weatherbit.io/v2.0/forecast/daily?&lat=2.3488&lon=48.85341&days=1&key=90151fcc483c4a0e8d89cec631ff5381
    
    
    let details = {"max_temp": 0, "min_temp": 0};
    
    const getWeather = async ( url = '')=>{
        // console.log(data)
          const response = await fetch(url);
    
          try {
            const body = await response.json();
            //console.log(body);
            tripData.max_temp = body.data[duration-1].max_temp;
            tripData.min_temp = body.data[duration-1].min_temp; 
            //console.log(details);
          }catch(error) {
          console.log("error", error);
          // appropriately handle the error
          }
      }
    return getWeather(entireUrl);

}


console.log(weatherbit(2.3488,48.85341,3, {
    city: 'Moscow',
    country: 'Russia',
    duration: 6,
    longitude: '37.61556',
    latitude: '55.75222',
    max_temp: 27.6,
    min_temp: 27.1,
    weather_desc: 0.375,
    date: '2020-05-21'
  }));