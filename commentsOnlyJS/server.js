// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));
//Now let's create our Server port
let port = 5500;
// Initialize the main project folder
const server = app.listen(port,()=>{
    console.log(`Server is running on localhost:${port}`);
});
// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get('/all',(req,res)=>{
    res.send(projectData);
});

// Post Route
  app.post('/all',callBack);
  function callBack(request , response){
      res.send(projectData);
  }