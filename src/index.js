// Week 4 - Current time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${day} ${hour}:${minutes}`;
  return currentTime;
}
let now = new Date();
document.querySelector("#currentDate").innerHTML = formatDate(now);

// Week 5 - API
function showWeather(response) {
  let units = `°C`;
  let currentTempRounded = Math.round(response.data.main.temp);
  document.querySelector(
    "#current-temp"
  ).innerHTML = `${currentTempRounded}${units}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
}

function showCity(response) {
  document.querySelector("#current-city-h1").innerHTML = response.data.name;
  console.log(response.data.name);
}

function handleUserInput(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-input");
  let apiKey = `0ad145bfcc1ef1bfc5678ea389f3498a`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCity);
  axios.get(apiUrl).then(showWeather);
}

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", handleUserInput);

//Week 5 challenge - Current Location

function showCurrentCityWeather(response) {
  let units = `°C`;
  let currentTempRounded = Math.round(response.data.main.temp);
  document.querySelector(
    "#current-temp"
  ).innerHTML = `${currentTempRounded}${units}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
}
function showCurrentCity(city) {
  document.querySelector("#current-city-h1").innerHTML = city.data.name;
}

function handleCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `0ad145bfcc1ef1bfc5678ea389f3498a`;
  let units = `metric`;
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlCurrent).then(showCurrentCity);
  axios.get(apiUrlCurrent).then(showCurrentCityWeather);
}

function getCoordinates(response) {
  navigator.geolocation.getCurrentPosition(handleCurrentPosition);
}

let currentLocation = document.querySelector("#button-geolocator");
currentLocation.addEventListener("click", getCoordinates);

function search(city) {
  let apiKey = `0ad145bfcc1ef1bfc5678ea389f3498a`;
  let units = `metric`;
  let apiUrlDefault = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlDefault).then(showWeather);
}

search("Copenhagen");
