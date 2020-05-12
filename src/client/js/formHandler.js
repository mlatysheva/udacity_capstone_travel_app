function handleSubmit(event) {
    event.preventDefault()

    // Save the input text into a variable
    let formText = document.getElementById('name').value
    
    // Check if the input text is not an empty string
    Client.checkInput(formText);

    console.log("::: Form Submitted :::");  

    // Post the input text to the server API and receive the sentiment 
    // analysed through the external API configured on the server side

    postText('http://localhost:8081/text', { "text": formText})
    .then(getSentiment('http://localhost:8081/sentiment'))
}

// Implement the POST method to send data to the server endpoint
const postText = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } catch (error) {
      console.log('error', error);
    }
}

// Implement the GET method to receive information from the server endpoint
const getSentiment = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        const userData = await response.json();
        //console.log(userData.sentiment);
        document.getElementById('polarity').innerHTML = `The sentiment of this text is: ${userData.polarity}`;
        document.getElementById('polarity_confidence').innerHTML = `Polarity confidence is: ${userData.polarity_confidence}`;
        document.getElementById('subjectivity').innerHTML = `Subjectivity is: ${userData.subjectivity}`;
        document.getElementById('subjectivity_confidence').innerHTML = `Subjectivity confidence is: ${userData.subjectivity_confidence}`;
  
    } catch (error) {
      console.log('error', error);
    }
}    
export { handleSubmit }
