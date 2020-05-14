const request = require("request");
const fetch = require("node-fetch");

function weatherbit(lng,lat,duration) {
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
            console.log(body);
            details.max_temp = body.data[duration-1].max_temp;
            details.min_temp = body.data[duration-1].min_temp; 
            console.log(details);
            return details;
          }catch(error) {
          console.log("error", error);
          // appropriately handle the error
          }
      }
    getWeather(entireUrl);
}

    

//     request(entireUrl, { json: true }, (err, res, body) => {
//         if (err) { return console.log(err); }
//         // console.log(body.data);
//         // console.log(body.data.length);
//         //return body.data;
//         let details = {"max_temp": 0, "min_temp": 0};
//         let temp = body.data[duration-1];
//         details.max_temp = temp.max_temp;
//         details.min_temp = temp.min_temp; 
//         console.log(body);
//         console.log(details);
//         return details;  
//         });
//     return details;
//   }
console.log(weatherbit(2.3488,48.85341,3));