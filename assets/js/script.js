var searchButton = document.getElementById("searchButton");
var cityFind = document.getElementById("cityFind");
var cityName = document.getElementById("cityName");
var currentDay = document.getElementById("currentDay");
var fiveDay = document.getElementById("fiveDay");

// Saving the users input city and then using fetch to get the daily weather
function saveCityName() {
  inputCity = cityName.value;
  console.log(inputCity);

  weatherFinder(inputCity);

  localStorage.setItem("city", inputCity);
  saveLastSearch();
}

function saveLastSearch() {
  var savedCity = localStorage.getItem("city");
  console.log(savedCity);

  var cityButton = document.createElement("BUTTON");
  var cityButtonCity = document.createTextNode(savedCity);
  cityButton.appendChild(cityButtonCity);
  document.getElementById("savedCity").appendChild(cityButton);
}

//  Fetching weather information for the current day from the openweather API, using a cities name
function weatherFinder(city) {
  var key = "3c0dc64e8a4521b6469866fdc1fc689d";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      key +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      weatherConditions(data);
    });
}

//   Using the information gathered from the fetch function to display data attributes onto the web page for the user to see.
function weatherConditions(info) {
  var img = document.getElementById("icon");
  img.src =
    "http://openweathermap.org/img/wn/" + info.weather[0].icon + "@2x.png";

  document.getElementById("dt").innerHTML = new Date(
    info.dt * "1000"
  ).toDateString();

  document.getElementById("icon").innerHTML = info.weather[0].icon;
  document.getElementById("location").innerHTML =
    info.name + ", " + info.sys.country;
  document.getElementById("description").innerHTML =
    info.weather[0].description.charAt(0).toUpperCase() +
    info.weather[0].description.slice(1);
  document.getElementById("temp").innerHTML = info.main.temp + "&deg;";
  document.getElementById("tempRange").innerHTML =
    "Temperature Range: " +
    (info.main.temp_min + "&deg;") +
    " - " +
    (info.main.tem_max + "&deg;");
  document.getElementById("wind").innerHTML =
    "Wind Speed:" + info.wind.speed + " m/s";
  document.getElementById("humidity").innerHTML =
    info.main.humidity + "% " + "Humidity";
  document.getElementById("feelsLike").innerHTML =
    "Feels like " + info.main.feels_like + "&deg;";

  // Using the lat and lon from the current day function to find a five day forecast.
  var lat = info.coord.lat;
  var lon = info.coord.lon;
  fiveDayWeatherFinder(lat, lon);
}

// Fetching the 5 day forecast using lattitude and longitude.
function fiveDayWeatherFinder(lat, lon) {
  var key = "3c0dc64e8a4521b6469866fdc1fc689d";
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      key +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fiveDayWeatherConditions(data);
    });
}

// Gathering the information and making it visible to the user.
function fiveDayWeatherConditions(info) {
  for (var i = 4; i < 37; i += 8) {
    var imgIcon = document.getElementById("icon" + i);
    imgIcon.src =
      "http://openweathermap.org/img/wn/" +
      info.list[i].weather[0].icon +
      "@2x.png";

    document.getElementById("date" + i).innerHTML = new Date(
      info.list[i].dt * "1000"
    ).toDateString();
    document.getElementById("description" + i).innerHTML =
      info.list[i].weather[0].description.charAt(0).toUpperCase() +
      info.list[i].weather[0].description.slice(1);
    document.getElementById("temp" + i).innerHTML =
      info.list[i].main.temp + "&deg;";
    document.getElementById("tempRange" + i).innerHTML =
      "Temperature Range: " +
      (info.list[i].main.temp_min + "&deg;") +
      " - " +
      (info.list[i].main.temp_max + "&deg;");
    document.getElementById("wind" + i).innerHTML =
      "Wind Speed: " + info.list[i].wind.speed + " m/s";
    document.getElementById("humidity" + i).innerHTML =
      info.list[i].main.humidity + "% " + "Humidity";
    document.getElementById("feelsLike" + i).innerHTML =
      "Feels like: " + info.list[i].main.feels_like + "&deg;";
  }
}
