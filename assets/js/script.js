var searchButton = document.getElementById("searchButton");
var cityFind = document.getElementById("cityFind");
var cityName = document.getElementById("cityName");
var currentDay = document.getElementById("currentDay");
var fiveDay = document.getElementById("fiveDay");

// the search button won't engage until something is typed in the search box
searchButton.disabled = true;
cityName.addEventListener("change", workingButton);

function workingButton() {
  if (document.getElementById("cityName").value === "") {
    searchButton.disabled = true;
  } else {
    searchButton.disabled = false;
  }
}
// Can use enter key to search for a city name.
cityName.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

// Loads the old searches that were saved in the local storage.
function bringBackSearch() {
  if (localStorage.getItem("city") === null) {
  } else {
    saveLastSearch();
  }
}

// Saving the users input city to local storage and then using fetch to get the daily weather.
var saveCityNameList = [];
function saveCityName(inputCity) {
  inputCity = cityName.value;
  console.log(inputCity);

  weatherFinder(inputCity);
  
  saveCityNameList.push(inputCity);
  localStorage.setItem("city", JSON.stringify(saveCityNameList));
  saveLastSearch();

  console.log(saveCityNameList);
}


// Fetches the weather data from a saved city search.
function saveLastSearch() {
  document.getElementById("savedCity").innerHTML = "";
  var lastSearch = "";
  var savedCity = JSON.parse(localStorage.getItem("city"));

  for (var i = 0; i < savedCity.length; i++) {
    lastSearch = savedCity[i];
  }
  console.log(savedCity.length);
  console.log(savedCity);
  console.log(lastSearch);

  
  var cityButton = document.createElement("BUTTON");
  var cityButtonCity = document.createTextNode(lastSearch);
  cityButton.appendChild(cityButtonCity);
  document.getElementById("savedCity").appendChild(cityButton);
  

  

  cityButton.onclick = function (cityAgain) {
    cityAgain = lastSearch;

    weatherFinder(cityAgain);

    console.log(lastSearch);
  };
}

// Button to clear the local storage.
var clearStorageBtn = document.getElementById("clearStorage");
clearStorageBtn.addEventListener("click", function () {
  localStorage.clear();
  var clearOldSearches = document.getElementById("savedCity");
  while (clearOldSearches.hasChildNodes()) {
    clearOldSearches.removeChild(clearOldSearches.firstChild);
  }
});

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
  document.getElementById("temp").innerHTML =
    "Temp Outside: " + (info.main.temp + "&deg;");
  document.getElementById("tempRange").innerHTML =
    "Temperature Range: " +
    (info.main.temp_min + "&deg;") +
    " - " +
    (info.main.temp_max + "&deg;");
  document.getElementById("wind").innerHTML =
    "Wind Speed: " + info.wind.speed + " m/s";
  document.getElementById("humidity").innerHTML =
    "Humidity: " + (info.main.humidity + "%");
  document.getElementById("feelsLike").innerHTML =
    "Feels like: " + info.main.feels_like + "&deg;";

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
      "Temp Outside: " + (info.list[i].main.temp + "&deg;");
    document.getElementById("tempRange" + i).innerHTML =
      "Temperature Range: " +
      (info.list[i].main.temp_min + "&deg;") +
      " - " +
      (info.list[i].main.temp_max + "&deg;");
    document.getElementById("wind" + i).innerHTML =
      "Wind Speed: " + info.list[i].wind.speed + " m/s";
    document.getElementById("humidity" + i).innerHTML =
      "Humidity: " + (info.list[i].main.humidity + "% ");
    document.getElementById("feelsLike" + i).innerHTML =
      "Feels like: " + info.list[i].main.feels_like + "&deg;";
  }
}
