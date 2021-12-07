const weatherNotificationEl = document.querySelector(".weatherNotification");
const weatherIconEl = document.querySelector(".weatherIcon");
const tempEl = document.querySelector(".temperature");
const descEl = document.querySelector(".description")
const locationEl = document.querySelector(".location p")
const notificationEl = document.querySelector(".notification")


const weather = {}
    weather.temperature : {
        unit : "farhenheit"
    },


displayWeather(){
weatherIconEl.innerHTML =
`<img src="icons/${weather.iconId}.png"/>`;

tempEl.innerHTML =
`${weather.temperature.value}<span>F</span>`;

descEl.innerHTML =
weather.description;

locationEl.innerHTML =
`${weather.city}, ${weather.country}`;
}

let api = "https://api.openweathermap.org/data/2.5/weather?zip="+zipCode.value+",US&appid=1a569bb7d37723f9bf3b10e34026f005&units=imperial"

fetch(api).then( function(response){
    let data = response.json();
    return data;
})
.then( function(data){
   weather.temperature.value = data.main.temp;
   weather.description = data.weather[0].description;
   weather.iconId = data.weather[0].icon;
   weather.city =data.name;
   weather.country = data.sys.country;
})

.then(function(){
    displayWeather();
})