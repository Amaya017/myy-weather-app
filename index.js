function showWeather(response) {
    let temperatureElement = document.querySelector("#temperate");
    let weather = Math.round(response.data.temperature.current);
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document .querySelector("#speed");
    let iconElement = document.querySelector("#icon");

    
    temperatureElement.innerHTML = `${weather}`;
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`; 
    iconElement.innerHTML =  `<img src="${response.data.condition.icon_url}" alt="img" class="current-temperature-icon">`;
    
    getForecast(response.data.city);
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
  
function formatDay(timestamp) {
  let date = new Date (timestamp * 1000);
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "bfeaffbe9ob3ec2cadb97183ftf40ece";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
  axios(apiUrl).then(displayForecast);

}

   function displayForecast(response) {

console.log(response);
    
    let forecastHtml = "";

  
  response.data.daily.forEach(function (day, index) {
      if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" /></div>
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature"> <strong>${Math.round(day.temperature.maximum)}°</strong></span>  
        <span class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</span>
        </div>
        </div>
      `;
      }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  searchCity("Paris");

 

  displayForecast();
  