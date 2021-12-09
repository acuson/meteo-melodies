
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const iconEl = document.getElementById("icon");
const cityEl = document.getElementById("city");

const weather = data;
weather.temperature = {
    unit : "fahrenheit"
}
function displayWeather(){    
    temperatureEl.innerHTML = temperature.value + "°F";
    descriptionEl.innerHTML = weather.description;
    iconEl.innerHTML = `<img src="assets/icons/${weather.icon}.png"/>`;
    cityEl.innerHTML = weather.city;
}

document.getElementById("submit").addEventListener("click", function(){
    var zipCode = document.getElementById("zipCode")
console.log(zipCode.value)
    fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zipCode.value+",US&appid=1a569bb7d37723f9bf3b10e34026f005&units=imperial")
    .then(response => {
        let data = response.json();
       return data;
    }).then(data=> {
        console.log(data)
        console.log(Math.floor(data.main.temp));
        temperature.value = Math.floor(data.main.temp);
        console.log(data.weather[0].description);
        weather.description = data.weather[0].description;
        console.log(data.weather[0].icon);
        weather.icon = data.weather[0].icon;
        console.log(data.name);
        weather.city = data.name;
    }) 
    .then(function(){
        displayWeather();
    })
})

