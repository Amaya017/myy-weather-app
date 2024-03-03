function showWeather(response) {
    let temperatureElement = document.querySelector("#temperate");
    let weather = Math.round(response.data.temperature.current);
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document .querySelector("#speed");
    let iconElement = document.querySelector("#icon");

    console.log(weather);
    temperatureElement.innerHTML = `${weather}`;
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`; 
    iconElement.innerHTML =  `<img src="${response.data.condition.icon_url}" alt="img" class="current-temperature-icon">`;
    
  }
function searchCity(city) {
    let apiKey = "bfeaffbe9ob3ec2cadb97183ftf40ece";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    searchCity(searchInputElement.value);
    
   }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  
   function displayForecast() {
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";
  
    days.forEach(function (day) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">🌤️</div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>15º</strong>
            </div>
            <div class="weather-forecast-temperature">9º</div>
          </div>
        </div>
      `;
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  displayForecast(response.data.city);

  
  getForcast("Paris");
  searchCity("Paris");
