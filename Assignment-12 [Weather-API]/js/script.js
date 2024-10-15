// strict mode
'use strict';
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

let myApiKey = `c5b945f631c44025b65132711241010`;
let myUrl = `https://api.weatherapi.com/v1/forecast.json?key=${myApiKey}&days=3`;

searchBtn.addEventListener("click", function() {
    DisplayWeatherData();
});

searchInput.addEventListener("keypress", function(e)  {
    if (e.key === "Enter") {
        DisplayWeatherData();
    }
});

async function DisplayWeatherData() {
    let city = searchInput.value;
    if (!city) {
        return;
    }
    const response = await fetch(`${myUrl}&q=${city}`);
    const data = await response.json();
    updateDataOnScreen(data);
}

function updateDataOnScreen(data) {
    // Check if data is null
    if (!data) return;

    // Get all cards
    const cards = document.querySelectorAll('.card');
    
    // Update all three days
    data.forecast.forecastday.forEach(function (forecast, index)  {
        const card = cards[index];
        const date = new Date(forecast.date);
        
        // Set the day name
        card.querySelector('.day').textContent = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        if (index === 0) {
            // First card (Today)
            card.querySelector('.date').textContent = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
            card.querySelector('.city').textContent = `${data.location.name}, ${data.location.country}`;
            card.querySelector('.temp').innerHTML = `${Math.round(data.current.temp_c)}<sup>o</sup>C`;
            card.querySelector('.tmp-img img').src = `https:${data.current.condition.icon}`;
            card.querySelector('.status').textContent = data.current.condition.text;
            
            // Update weather details
            const numbers = card.querySelectorAll('.number');
            numbers[0].textContent = `${data.current.humidity}%`;
            numbers[1].textContent = `${Math.round(data.current.wind_kph)}km/h`;
            numbers[2].textContent = data.current.wind_dir;
            
        } else {
            // Forecast cards (Next two days)
            const tempElement = card.querySelector('.temp');
            const minTempElement = tempElement.nextElementSibling;
            
            tempElement.innerHTML = `${Math.round(forecast.day.maxtemp_c)}<sup>o</sup>C`;
            minTempElement.innerHTML = `${Math.round(forecast.day.mintemp_c)}<sup>o</sup>C`;
            
            card.querySelector('.tmp-img img').src = `https:${forecast.day.condition.icon}`;
            card.querySelector('.status').textContent = forecast.day.condition.text;
        }
    });

    searchInput.value = "";
}

// Load default city on page load
window.addEventListener('load', () => {
    searchInput.value = "Cairo";
    DisplayWeatherData();
});


// get Current Location (Higher Order Function)
// Retrieves the user's current  geo location for displaying weather data or defaults to Cairo 
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        const city = `${position.coords.latitude},${position.coords.longitude}`;
        searchInput.value = city;
        DisplayWeatherData();
    },
    function() {
        console.log("Unable to retrieve your location, Defaulting to Cairo");
        searchInput.value = "Cairo";
        DisplayWeatherData();
    
    });
}

getCurrentLocation();