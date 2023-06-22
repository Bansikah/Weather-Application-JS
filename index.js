const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const weatherCardsDiv = document.querySelector(".weather-cards");


const API_key = "d80ac77e5e68048eec0a7c5cc997f192"; // API key for OpenWeatherMap API

const  createWeatherCard = (weatherItem) =>{
    return `
    <li class="card">
    <h3>(${weatherItem.dt_txt.split("")[0]})</h3>
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="Weather icon">
    <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
    <h4>Humidity: ${weatherItem.main.humidity}</h4>
</li>`;
}

const getWeatherDetials = (cityName, lat, lon) => {
 const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
 
 fetch(WEATHER_API_URL).then(res = res.json()).then(data => {
   
    //Filter the forecasts to get only one forecast per day
    const uniqueForecastDays = [];
    const fiveDaysForecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if(!uniqueForecastDays.includes(forecastDate)){
            return uniqueForecastDays,push(forecastDate);
        }
    });

//This is where is ended to be continued...............
    console.log(fiveDaysForecast);
    fiveDaysForecast.forEach(weatherItem => {
    weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
     


    });//
}).catch(()=> {
    alert("An error occured while fetching weather forecast!");
});

}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();// Get User entered city name and remove extra spaces
    if(!cityName) return; // Return if cityName is empty

    // console.log(cityName);
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_key}`;
    

    //Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(!data.lenght) return alert(`An error occured while fetching the coordinates!`);
        const {name, lat, lon} = data[0];
        getWeatherDetials(name, lat, lon);
    }).catch(() => {
          alert("An error occured while fetching the coordinates!");
    });
    
}

searchButton.addEventListener("click", getCityCoordinates);