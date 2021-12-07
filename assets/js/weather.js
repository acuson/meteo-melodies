
document.getElementById("submit").addEventListener("click", function(){
    var zipCode = document.getElementById("zipCode")
console.log(zipCode.value)
    fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zipCode.value+",US&appid=1a569bb7d37723f9bf3b10e34026f005&units=imperial")
    .then(response => {
       return response.json()
    }).then(data=> {
        console.log(data);
    }) 
})