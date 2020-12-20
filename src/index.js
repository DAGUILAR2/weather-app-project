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
  let actualTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = `${actualTemp}° C`;

  console.log(actualTemp);
  console.log(currentCity);
}

navigator.geolocation.getCurrentPosition(searchPosition);
