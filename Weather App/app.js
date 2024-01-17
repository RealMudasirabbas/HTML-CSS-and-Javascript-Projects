const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector("#weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

const checkWeather = async (cityName) => { 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7031e36b6edc786e337d25e0a76b9855&units=metric`);

    if (response.status === 404) {
        // Display error and hide weather information
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
    } else {
        const data = await response.json();

        const city = document.getElementById("city");
        const temp = document.getElementById("temp");
        const humidity = document.querySelector(".humidity");
        const wind = document.querySelector(".wind");

        // Update weather information
        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + "km/h";

        // Set weather icon based on weather condition
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/fog.png";
                break;
            default:
                weatherIcon.src = ""; // Default or handle additional weather conditions
        }

        // Display weather information and hide error
        weatherElement.style.display = "block";
        errorElement.style.display = "none";
    }
};

searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
});
