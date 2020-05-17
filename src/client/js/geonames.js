const geonames = async (city) => {
  // Get the country, longitude and latitude from Geonames API by entering the city and record these parameters into
  // the tripData endpoint
  
  //const user = process.env.USERNAME;
  const user = 'mlatysheva';
  const baseUrl = 'http://api.geonames.org/searchJSON?q=';
  const addParameters = '&maxRows=1&username=';
  const entireUrl = (baseUrl + city + addParameters + user);
      try {
          const response = await fetch(entireUrl);
          const data = await response.json();
          const location = {
            'longitude': data.geonames[0].lng,
            'latitude': data.geonames[0].lat,
            'country': data.geonames[0].countryName};
          console.log(location);
          return location;

      } catch (error) {
        console.log("error", error);
        // appropriately handle the error
      }
    };
  

export {geonames}