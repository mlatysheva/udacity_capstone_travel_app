const fetch = require("node-fetch");

function geonames(city) {
    const user = 'mlatysheva';
    const baseUrl = 'http://api.geonames.org/searchJSON?q='
    const addParameters = '&maxRows=1&username=';
    const entireUrl = (baseUrl + city + addParameters + user);

    const getData = async (entireUrl) => {
        
        try {
            const response = await fetch(entireUrl);
            const data = await response.json();
            console.log(`The received data is ${data}`);
            console.log(data.geonames[0].lng);
            //return data;
        } catch (error) {
          console.log("error", error);
          // appropriately handle the error
        }
      };
    getData(entireUrl);
}
console.log(geonames('London'));
