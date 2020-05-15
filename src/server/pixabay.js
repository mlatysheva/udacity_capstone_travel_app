const fetch = require("node-fetch");

function pixabay (city, country) {
    const key = '16563560-96393db758b1386eb9e57f9fa'

    'https://pixabay.com/api/?key=16563560-96393db758b1386eb9e57f9fa&q=yellow+flowers&image_type=photo'

    const baseURL = 'https://pixabay.com/api/?key=';
    const parametersURL = '&q='+ city + '+' + country +'&image_type=photo&orientation=horizontal&category=places&per_page=3';
    const entireUrl = baseURL + key + parametersURL;

    const getPhoto = async ( url = '')=>{
      // console.log(data)
        const response = await fetch(url);
  
        try {
          const body = await response.json();
          //console.log(body);
          const imageUrl = body.hits[0].pageURL;
          console.log(imageUrl);
        }catch(error) {
        console.log("error", error);
        // appropriately handle the error
        }
    }
  getPhoto(entireUrl);
}
pixabay('Paris', 'France')