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
//Now let's create our Server port
let port = 8000;
let localServer = `http://localhost:${port}/`;
// Initialize the main project folder
const server = app.listen(port,()=>{
    console.log(`Server is running on localhost:${port}`);
    //console.log(projectData);
});

app.use(express.static("website"));
// Initialize all route with a callback function
// Callback function to complete GET '/all'

// Post Route : Used to store the data that comes from the front-end Code
app.post("/channel",function(request , response){
    projectData = request.body;
    //console.log("Data inside Local Server : ",projectData);
});
//Now let's Get data and send it to the Channel
app.get("/channel",function(req,res){
    res.send(projectData);
});