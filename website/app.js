/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + ' - '+ d.getDate()+' - '+ d.getFullYear();
//Let's start our front-end code that handle with Weather API
/**
 * let baseUrl="https://api.nasa.gov/planetary/apod?api_key=";
 * let apiKey = "4EpzUybBb3KOAVKlmKEvh9HP8L3itxKaGb9Btv7p";
 * 
 */
 let baseUrl="https://api.openweathermap.org/data/2.5/weather?q=";
 const api_key = "&appid=dcf8f0b83679b1eda560fdd528048ff3";
 //https://api.openweathermap.org/data/2.5/weather?q=London&appid=dcf8f0b83679b1eda560fdd528048ff3
 //Get the value inside input
 
 
 //Then we will add an Event listener for cliking of the button GO/Generate
 document.getElementById('generate').addEventListener('click',performAction);
 
 function performAction(e){
     //Now let's get the specific Code zip
     let zipCode = document.getElementById("zip").value;
     getWeatherData(baseUrl,zipCode,api_key);
 };
 
 //Let's now create the function that will deal with our API
 let getWeatherData = async (url,zip,apiKey)=>{
     const res = await fetch(url+zip+apiKey);
     //Now let's try to make action on the comming data
     try{
         const data =await res.json();
        console.log(data);
        //Try to set properities
        
       if(data.cod == "404"){
           alert("Zip code not found")
       }
       else
       {
            let feelContent = document.getElementById("feelings").value;
            let getTempInFehrendid = data.main.temp;
            let calTempInCelecuis = (getTempInFehrendid -32) / 1.8;
            document.getElementById("date").innerText = `Date Now : ${newDate}`;
            document.getElementById("temp").innerText = `Temperature in Fehenhid  : ${getTempInFehrendid}`;
            document.getElementById("tempC").innerText = `Temperature in Celisuis : ${calTempInCelecuis}`;
            document.getElementById("country").innerText = `Country : ${data.name}`;
            document.getElementById("content").innerText = `You Feels : ${feelContent}`;
            return data;
       }
        
         
     }
     catch(error){
         console.log("error",error);
     }
 
 
 };