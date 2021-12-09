const weatherNotificationEl = document.getElementById("weatherNotification");
const weatherIconEl = document.getElementById("weatherIcon");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description")
const locationEl = document.getElementById("location")
const notificationEl = document.getElementById("notification")

var zipCode = document.getElementById("zipCode")
let api = "https://api.openweathermap.org/data/2.5/weather?zip="+zipCode.value+",US&appid=1a569bb7d37723f9bf3b10e34026f005&units=imperial"

const weather = {}
    weather.temperature : {
        unit : "farhenheit"
    },
const key = "1a569bb7d37723f9bf3b10e34026f005"
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// function setLocation(location){
//     let zipCode = zipCode.value;
    function setPosition(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        getWeather(latitude, longitude);

    getWeather(zipCode)
}

function getWeather(zipCode){
    let api = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=1a569bb7d37723f9bf3b10e34026f005&units=imperial`

fetch(api)
.then( function(response){
    let data = response.json();
    return data;
})
.then(function(data){
    console.log(data);
   weather.temperature.value = data.main.temp;
   weather.description = data.weather[0].description;
   weather.iconId = data.weather[0].icon;
   weather.city =data.name;
   weather.country = data.sys.country;
})

.then(function(){
    displayWeather();
})
}
function displayWeather(){
    weatherIconEl.innerHTML =
    // `<img src="icons/${weather.iconId}.png"/>`
    `<img src="/Users/darbyjohnson/bootcamp/projects/meteo-melodies/assets/icons${weather.iconId}.png">`;
    
    tempEl.innerHTML =
    `${weather.temperature.value}<span>F</span>`;
    
    descEl.innerHTML =
    weather.description;
    
    locationEl.innerHTML =
    `${weather.city}, ${weather.country}`;
    }
displayWeather();