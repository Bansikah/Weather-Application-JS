const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");


const API_key = "d80ac77e5e68048eec0a7c5cc997f192"; // API key for OpenWeatherMap API

const getWeatherDetials = (cityName, lat, lon) => {
 const WEATHER_API_URL = ``;
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