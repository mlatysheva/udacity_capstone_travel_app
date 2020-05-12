const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
var aylien = require('aylien_textapi')
let result = {
  "polarity":"positive",
  "subjectivity":"subjective",
  "text":"John is a very good football player",
  "polarity_confidence":0.9999936601153382,
  "subjectivity_confidence":0.9963778207617525
} 
let inputText = '';

// set aylien API credentias
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const app = express()

app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
    //console.log('app.get / is run here')
})

// Listen for requests on the given port
port = 8081
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
//     console.log('app.get test is run here')
// })

app.post('/text', saveText);
 
 function saveText (req, res) { 	
  inputText = req.body;   
  console.log(inputText);  
  

  res.send('{\"Status\":\"OK\"}');
}

// Request results from the Alyen API for the text input by the user

app.get('/sentiment', sendResult);

function sendResult (req, res) {
  console.log('Call external API');
  textapi.sentiment(inputText, function(error, response) {
    if (error === null) {
      console.log(response);
      result = response;
      res.send(result);
    }
    else
    { 
      console.log(error);
      res.send('{\"Status\":\"Error\"}');
    }
  });
  
	// res.send(result);
};

