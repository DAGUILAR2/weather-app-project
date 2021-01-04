let now = new Date();

let today = document.querySelector("h1");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

console.log(now.getDate());
console.log(now.getHours());
console.log(currentDay);
console.log(now.getMinutes());

today.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "2f78f09b7517f3aa9c777434463ca478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showRain);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "2f78f09b7517f3aa9c777434463ca478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let currentCity = response.data.name;
  let citySearch = document.querySelector("#citySearch");
  citySearch.innerHTML = `${currentCity}`;
  let actualTemp = Math.round(celsiusTemp);
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${actualTemp}`;
  


  celsiusTemp = response.data.main.temp;
  
}

function showRain(response){
  let currentPrecipitation = document.querySelector(".precipitation");
  currentPrecipitation.innerHTML = `${currentPrecipitation}`;
}

function showFahrenheit(event){
  event.preventDefault();
  let showFahrenheitTemp = Math.round(celsiusTemp * 9 / 5) + 32;
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = showFahrenheitTemp;
}

function showCelsius(event){
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let precipPercent = null; 
let precipitation = document.querySelector(".precipitation");
console.log(precipitation);

navigator.geolocation.getCurrentPosition(searchPosition);
