// Setup empty JS object to act as endpoint for all routes
let projectData = {};

//First call express
const express = require('express');
const app = express();
//second Dependencies */
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
// second body-Parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Middleware*/
const cors = require('cors');
app.use(cors());
app.use(express.static("website"));
//Now let's create our Server port
let port = 8000;
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