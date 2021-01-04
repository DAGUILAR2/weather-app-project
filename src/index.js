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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "2f78f09b7517f3aa9c777434463ca478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showDescription);
  document.querySelector(".precipitation").innterHTML=response.data.main.humidity; 
  
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
  console.log(response.data);
  
  let citySearch = document.querySelector("#citySearch");
  let descriptionElement = document.querySelector(".today");
  let precipitationElement = document.querySelector("#precipitation");
  let windElement = document.querySelector("#wind");
  let currentTemp = document.querySelector(".currentTemp");

  currentTemp.innerHTML = response.data.main.temp;
  citySearch.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  precipitationElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  
  
  
}

 function showFahrenheit(event){
  event.preventDefault();
  let showFahrenheitTemp = Math.round(celsiusTemp * 9 / 5) + 32;
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = showFahrenheitTemp;}

function showCelsius(event){
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = celsiusTemp;}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

celsiusTemp = null;


navigator.geolocation.getCurrentPosition(searchPosition);
