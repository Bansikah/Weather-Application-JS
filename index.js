const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");


const API_key = "d80ac77e5e68048eec0a7c5cc997f192"; // API key for OpenWeatherMap API

const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {//HTML for main weather card
        return `    
     <div class="details">
    <h2>${cityName} ((${weatherItem.dt_txt.split("")[0]}))</h2>
    <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
    <h4>Humidity: ${weatherItem.main.humidity}</h4>
</div>
<div class="icon">
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="Weather icon">
    <h4>${weatherItem.weather[0].description}</h4>
</div>`;
    }
    else {//HTML for main weather card
        return `
    <li class="card">
    <h3>(${weatherItem.dt_txt.split("")[0]})</h3>
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="Weather icon">
    <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
    <h4>Humidity: ${weatherItem.main.humidity}</h4>
    </li>`;
    }
}

const getWeatherDetials = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;

    fetch(WEATHER_API_URL).then(res = res.json()).then(data => {

        //Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays, push(forecastDate);
            }
        });

        //Clearing previous weather data
        cityInput.value = "";
        weatherCardsDiv.innerHTML = "";
        currentWeatherDiv.innerHTML = "";

        // console.log(fiveDaysForecast);
        // Creating weather cards and adding them to DOM

        fiveDaysForecast.forEach((weatherItem, index) => {
            if (index === 0) {

                weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));

            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));

            }

        });//
    }).catch(() => {
        alert("An error occured while fetching weather forecast!");
    });

}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();// Get User entered city name and remove extra spaces
    if (!cityName) return; // Return if cityName is empty

    // console.log(cityName);
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_key}`;


    //Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if (!data.lenght) return alert(`No coordinates found for ${cityName}`);
        const { name, lat, lon } = data[0];
        getWeatherDetials(name, lat, lon);
    }).catch(() => {
        alert("An error occured while fetching the coordinates!");
    });

}

const getUserCoordinates = () => {
   navigator.geolocation.getCurrentPosition(
    position => {
        const { latitude, longitude } = position.coords;
        const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
       
        //City name from coordinates using reverse API
        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            const { name } = data[0];
            getWeatherDetials(name, latitude, longitude);
        }).catch(() => {
            alert("An error occured while fetching the CITY!");
        });
    
    },
    error => {
        if(error.code === error.PERMISSION_DENIED){
            alert("Geolocation request deniel. Please reset location permission to grant access again.");
        }
    }
   );
}

searchButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);