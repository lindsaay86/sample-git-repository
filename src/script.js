let now = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = weekdays[now.getDay()];

let currentHour = now.getHours();
let currentMinute = now.getMinutes();

let currentDate = document.querySelector("#main-date");
currentDate.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function showWeatherCondition(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}% |`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

function searchCity(city) {
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//To be worked on later
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = 77;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = 25;
}

let clickSearch = document.querySelector("#search-form");
clickSearch.addEventListener("submit", enterCity);

let fahrenheitLink = document.querySelector("#main-temp-fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#main-temp-celsius");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
