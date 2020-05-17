const pixabay = async (city, country) => {
  // Get a photo for the given city and country
  const key = '16563560-96393db758b1386eb9e57f9fa'
  const baseURL = 'https://pixabay.com/api/?key=';
  const parametersURL = '&q='+ city + '+' + country +'&image_type=photo&orientation=horizontal&category=places&per_page=3';
  const entireUrl = baseURL + key + parametersURL;
      try {
        const response = await fetch(entireUrl);
        const body = await response.json();
        //console.log(body);
        let imageUrl = body.hits[0].webformatURL;
        console.log(imageUrl);
        return (imageUrl);
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

export { pixabay }