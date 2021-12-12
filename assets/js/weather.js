const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const iconEl = document.getElementById("icon");
const cityEl = document.getElementById("city");

const weather = data;
weather.temperature = {
    unit: "fahrenheit",
};
function displayWeather() {
    temperatureEl.innerHTML = temperature.value + "°F";
    descriptionEl.innerHTML = weather.description;
    iconEl.innerHTML = `<img src="assets/icons/${weather.icon}.svg"/>`;
    cityEl.innerHTML = weather.city;
}
// document.getElementById("submit").addEventListener("click",

function switchPage() {
    var zipCode = document.getElementById("zipCode");
    localStorage.setItem("zip", zipCode.value);
    window.location.href = "../../recsPage.html";
}

function fetchWeather() {
    // console.log(zipCode.value);

    var Zip = localStorage.getItem("zip");
    console.log(Zip);
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
            Zip +
            ",US&appid=1a569bb7d37723f9bf3b10e34026f005&units=imperial"
    )
        .then(response => {
            let data = response.json();
            return data;
        })
        .then(data => {
            console.log(data);
            console.log(Math.floor(data.main.temp));
            temperature.value = Math.floor(data.main.temp);
            console.log(data.weather[0].description);
            weather.description = data.weather[0].description;
            console.log(data.weather[0].icon);
            weather.icon = data.weather[0].icon;
            console.log(data.name);
            weather.city = data.name;
            console.log(data.weather[0].main);
            main = data.weather[0].main;
        })
        .then(function () {
            displayWeather();
            // console.log(data.weather[0].main);
            localStorage.setItem("search", main);
        });
}
