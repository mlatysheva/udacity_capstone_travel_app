### API to evaluate a text for its sentiment

This API is a simple form that takes a string input by the user, sends it to 
our server endpoint, which in turn requests an external NLP analysing tool - Aylien API.

## Configuration

The project uses Webpack and Webpack Dev Server, Express, Node, Sass and Service Workers and Jest.
It is setup with the development and production environments via Webpack

## Functionality

The project is a one-line form for user to input a text in it.
Once the user has inputed the text into the form, the API sends it to the local server
operating on port 8080, which in turn send the text forth to an external API:
Aylien API, which analyses such features of the text as positivity and subjectivity.
The results are sent to the local server, which in turn sends the results to the 
client API, which are dynamically displayed in the client API.

## Development server and production server

The app is using two modes: development and production.
The development server runs on port 8080 and when the production server is launched, outputs the results from the 
external API to the user interface.
The production server runs on port 8081.

## Additional features

The project uses SASS for styling and minifies js and styles for the production environment.
Besides, the client API can show the content offline but cannot make calls to the external API offline.