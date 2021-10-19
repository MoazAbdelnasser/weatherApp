//Generate Global flag to check if the Entered Zip code is found in the Api or Not
let found = false;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + ' - '+ d.getDate()+' - '+ d.getFullYear();
//Let's start our front-end code that handle with Weather API
/**
 * Define API URL,Keys
 */
 let baseUrl="https://api.openweathermap.org/data/2.5/weather?q=";
 const api_key = "&appid=dcf8f0b83679b1eda560fdd528048ff3&units=imperial";
 /**
  * Define Local Server Host , Port
  */
 let port = 8000;
 let localServer = `http://localhost:${port}/channel`;
 //Then we will add an Event listener for cliking of the button GO/Generate
 document.getElementById('generate').addEventListener('click',getDataFromApi);
 //Get data from Api , then Post it to the local server
 function getDataFromApi(){
     //Now let's get the specific Code zip
     let zipCode = document.getElementById("zip").value;
     if(zipCode ==''){
         alert("Please Enter a Zip code");
         resetContent();
     }
     else{
        getWeatherData(baseUrl,zipCode,api_key)
        .then(function(data){
            //Now let's Stop posting Wrong Data to our Local Server DB
            if(data.cod == "404"){
                alert("Zip Code not found");
                found= false;  
            }
            else{
                //Now we will post data to our Local Server
                //console.log("Data is as following",data);
                postDataToLocalServer(localServer,data);
                found= true;  
            }
        })
        .then(function(DB){
            if(found){
                updateUI(localServer);
            }
            else{
                /**
                 * Here we will set all divs to be Null , to delete previous data cashed
                */
                 resetContent();
            }
                
            
        })
     }
};
 
 //Let's now create the function that will deal with Remote Api
 let getWeatherData = async (url,zip,apiKey)=>{
     const res = await fetch(url+zip+apiKey);
     //console.log("RESPONSE : ",res);
     //Now let's try to make action on the comming data
     try{
         const data =await res.json();
        //console.log(data);
        return data;
     }
     catch(error){
         console.log("error : ",error);
     }
 };
 //Function that will be used to Send Data to the Local Server
 let postDataToLocalServer = async(url = "",data = {})=>{
    const localDB = await fetch(url,
        {
            method : "POST",
            credentials : "same-origin",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data),
        })
       try{
        //console.log("LOcal DB : ",localDB.body);
       // console.info("Data Posted to Local server Successfully");
        let DB = localDB.body;
        return DB; 
       }
       catch(e){
           console.error(e);
       }
    };
//Let's Now Update the Front-end with Data stored in the Local server in the path "/channel"

let updateUI = async(url)=>{
    //Try to set properities
    const r = await fetch(url);
    try{
        let db = await r.json();
    
        let feelContent = document.getElementById("feelings").value;
        let getTempInFehrendid = db.main.temp;
        let calTempInCelecuis = (getTempInFehrendid -32) / 1.8;
        document.getElementById("date").innerHTML = `<p>Date Now : <strong> ${newDate}</strong></p>`;
        document.getElementById("temp").innerHTML = `<p>Temperature in Fehenhid  :<strong> ${getTempInFehrendid}</strong></p>`;
        document.getElementById("tempC").innerHTML = `<p>Temperature in Celisuis :<strong> ${calTempInCelecuis}</strong></p>`;
        document.getElementById("country").innerHTML = `<p>Country : <strong>${db.name}</strong></p>`;
        document.getElementById("content").innerHTML = `<p>You Feels : <strong>${feelContent}</strong></p>`;
        return db;
    }
    catch(e){
        console.error(e);
    }

    };
//Create a function to reset content
let resetContent = function(){
    document.getElementById("date").innerHTML = ``;
    document.getElementById("temp").innerHTML = ``;
    document.getElementById("tempC").innerHTML = ``;
    document.getElementById("country").innerHTML = ``;
    document.getElementById("content").innerHTML = ``;
};