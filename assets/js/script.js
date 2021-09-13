var key= '13b4b1fc418e39246fcea12e3594959e'
var button = document.querySelector('.btn')
var inputValue = document.querySelector('.inputValue')
var cityName = document.querySelector('.cityName')
var temp = document.querySelector('.temp')
var wind = document.querySelector('.wind')
var humidity = document.querySelector('.humidity')
var uv = document.querySelector('.uv')

function getWeather(event) {
    event.preventDefault();
    var city = inputValue.value;
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=' +key)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    var name = data['name'];
    var tempValue = farenheit(data.main.temp) + 'F';
    var windValue = data.wind.speed + 'MPH';
    var humidityValue = data.main.humidity + '%';
    
    cityName.innerHTML= name;
    temp.innerHTML = tempValue;
    wind.innerHTML = windValue;
    humidity.innerHTML = humidityValue;
    var lat = data.coord.lat
    var lon = data.coord.lon
    fiveDay(lat, lon)
});
}
function fiveDay(lat, lon) {
    
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' +lat+ '&lon=' +lon+ '&appid=' + key)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        uv.innerHTML = data.current.uvi;
        var fiveDayEl = document.querySelector('#fiveDayForecast')
    for(var i =1; i <= 5; i++) {
        var dayCard = document.createElement('div')
        dayCard.classList.add("card", "col-2")
        var dateEl = document.createElement('p')
        dateEl.textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString();
        var tempEl = document.createElement('p')
        tempEl.textContent = 'Temperature: ' + farenheit(data.daily[i].temp.day) +'F'
        var windEl = document.createElement('p')
        windEl.textContent = 'Wind Speed: ' + data.daily[i].wind_speed + 'MPH'
        var humidityEl = document.createElement('p')
        humidityEl.textContent = 'Humidity: ' + data.daily[i].humidity + '%'
        
        dayCard.appendChild(dateEl)
        dayCard.appendChild(tempEl)
        dayCard.appendChild(windEl)
        dayCard.appendChild(humidityEl)
        fiveDayEl.appendChild(dayCard)

    }
    })
}

function farenheit(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}


document.querySelector('.submitBtn').addEventListener('submit', getWeather)




