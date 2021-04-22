searchCity("reykjavik")
let temperature = 0;

//time&date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
  let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}
document.querySelector("#date-time").innerHTML = formatDate(new Date());


//Current weather condition
function search(event){
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let h1 = document.querySelector("#cityHeading");
  let val = cityInput.value;
  if(val) {
    searchCity(val);
    h1.innerHTML = `${val}`; 
  }       
}

let button = document.querySelector("#searchButton");
    button.addEventListener("click", search);
let unitNumber =  document.querySelector("#temperature")
document.querySelector("#celsius-button").addEventListener("click", function(event){
  event.preventDefault();
  unitNumber.innerHTML = temperature;
});
document.querySelector("#faranheit-button").addEventListener("click", function(event){
  event.preventDefault();
  unitNumber.innerHTML = Math.round((temperature * 9/5) + 32);
});

 function showTemperature(response) {
   temperature = Math.round(response.data.main.temp);
    document.querySelector("#cityHeading").innerHTML = response.data.name;
    document.querySelector("#feels-like").innerHTML = `Feels like: ${Math.round(response.data.main.temp)} ℃`;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#Humidity").innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
    document.querySelector("#wind").innerHTML= `Wind: ${Math.round(response.data.wind.speed)} km/h`;
    document.querySelector("#dayForecast").innerHTML = response.data.weather[0].description;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }


function searchCity(city){
    let apiKey = "d803ee58ce516713db5656619dac775a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;   
    
axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

//Current location
function showPosition(Position){
let apiKey ="d803ee58ce516713db5656619dac775a";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${Position.coords.latitude}&lon=${Position.coords.longitude}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event){
  event.preventDefault();
navigator.geolocation.getCurrentPosition(showPosition);
}

let pinButton = document.querySelector("#submitPin");
pinButton.addEventListener("click", getCurrentLocation);


