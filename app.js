// API
const API_KEY = "eb6da013e5b871286596930f3e4a082b";
let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}`;
const DEFAULT_CITY = "dhaka";
const imgIcon = "https://openweathermap.org/img/wn/";

const getDate = document.querySelector("#get__date");
const form = document.querySelector("#input__form");

// Run for show present dates
showDate();

// Events
window.addEventListener("load", getLocation);

form.addEventListener("submit", getCity);

// Functions

// Get location
function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (s) => {
      getWeatherByLocation(null, s.coords);
      //   console.log(s.coords);
    },
    (e) => {
      getWeatherByLocation();
    }
  );
}

// Get weather by location
function getWeatherByLocation(city = DEFAULT_CITY, coords) {
  let url = BASE_URL;

  city === null
    ? (url = `${BASE_URL}&lat=${coords.latitude}&lon=${coords.longitude}`)
    : (url = `${BASE_URL}&q=${city}`);

  //   console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Get all data & store in an object
      const weather = {
        country: data.sys.country,
        city: data.name,
        icon: data.weather[0].icon,
        temp: Math.round(data.main.temp - 273.15), // Kelvin to celcius
        main: data.weather[0].main,
        desc: data.weather[0].description,
        tempMin: Math.round(data.main.temp_min - 273.15),
        tempMax: Math.round(data.main.temp_max - 273.15),
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      };
      // Show weather
      weatherShow(weather);
    })
    .catch((err) => console.log(err));
}

// Show weather at html docs
function weatherShow(weather) {
  // Select DOM
  const city = document.querySelector(".city");
  const icon = document.querySelector("#weather__icon");
  const temp = document.querySelector(".weather__temp");
  const tempMain = document.querySelector("#weather__main");
  const tempDesc = document.querySelector("#weather__desc");
  const tempMin = document.querySelector("#temp__min");
  const tempMax = document.querySelector("#temp__max");
  const pressure = document.querySelector("#weather__pressure");
  const humidity = document.querySelector("#weather__humidity");

  // show datas
  city.innerText = `${weather.city}, ${weather.country}`;
  icon.src = `${imgIcon}${weather.icon}.png`;
  temp.innerHTML = `${weather.temp} &#8451;`;
  tempMain.innerText = weather.main;
  tempDesc.innerText = ` (${weather.desc})`;
  tempMin.innerText = weather.tempMin;
  tempMax.innerText = weather.tempMax;
  pressure.innerText = weather.pressure;
  humidity.innerText = weather.humidity;
}

// Get city
function getCity(e) {
  e.preventDefault();

  const input = document.querySelector("#input__city");
  inputValue = input.value;

  if (inputValue) {
    getWeatherByLocation(inputValue);
  } else {
    alert("input city");
  }

  // Clear the fields
  input.value = "";
}

// Get Present date
function showDate() {
  // Months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octobor",
    "November",
    "December",
  ];
  // Days
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();

  let year = now.getFullYear();
  let date = now.getDate();
  let month = months[now.getMonth()];
  let day = days[now.getDay()];

  return (getDate.innerText = `${day}, ${date} ${month}, ${year}`);
}
