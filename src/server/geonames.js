const fetch = require("node-fetch");

function geonames(city) {
    const user = 'mlatysheva';
    const baseUrl = 'http://api.geonames.org/searchJSON?q='
    const addParameters = '&maxRows=1&username=';
    const entireUrl = (baseUrl + city + addParameters + user);
    let details = {"country": '', "longitude": 0, "latitude": 0};
  
    const getData = async (url='') => {
        const response = await fetch(url);        
        try {            
            const data = await response.json();     
            return data;
        } catch (error) {
          console.log("error", error);
          // appropriately handle the error
        }
    }
    console.log(getData(entireUrl));
    // console.log(data);
    // details.longitude = data.geonames[0].lng;
    // details.latitude = data.geonames[0].lat;
    // details.country = data.geonames[0].countryName; 
    // console.log(details);
    // return (details)
  }
console.log(geonames('London'));
  