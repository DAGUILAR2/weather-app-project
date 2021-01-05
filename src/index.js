let now = new Date();

let today = document.querySelector("h1");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
  


function searchCity(city) {
  let units = "metric";
  let apiKey = "2f78f09b7517f3aa9c777434463ca478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
 
  axios.get(apiUrl).then(showTemperature);


  axios.get(apiUrl).then(showDescription);
  
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  searchCity(searchInput.value);}



function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "2f78f09b7517f3aa9c777434463ca478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
   axios.get(apiUrl).then(showTemperature);
}




function showTemperature(response) {
  console.log(response.data);
  
  let citySearch = document.querySelector("#citySearch");
  let descriptionElement = document.querySelector(".today");
  let precipitationElement = document.querySelector("#precipitation");
  let windElement = document.querySelector("#wind");
  let currentTemp = document.querySelector(".currentTemp");
  let iconElement = document.querySelector("#icon");
 

  

  currentTemp.innerHTML = response.data.main.temp;
  citySearch.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  precipitationElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  document.querySelector("#precipitation").innterHTML = response.data.main.humidity;
  
  iconElement.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt" , response.data.weather[0].description);
}

 function showFahrenheit(event){
  event.preventDefault();

  celsiusTemp.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let showFahrenheitTemp = Math.round(celsiusTemp * 9 / 5) + 32;
 }

function showCelsius(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = celsiusTemp;}

let celsiusTemp = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

searchCity("Chicago");