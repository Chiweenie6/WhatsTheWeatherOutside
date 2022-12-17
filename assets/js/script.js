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
}



//  Fetching weather information for the current day from the openweather API, using a cities name
function weatherFinder(city) {

    var key = "3c0dc64e8a4521b6469866fdc1fc689d";
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key)  
    .then(function(response) { return response.json() })
    .then(function(data) {
      console.log(data);
      weatherConditions(data);
    });
  }



//   Using the information gathered from the fetch function to display data attributes onto the web page for the user to see.
  function weatherConditions(info) {
	// var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var temp = Math.round(((parseFloat(info.main.temp)-273.15)*1.8)+32);
    var tempMin = Math.round(((parseFloat(info.main.temp_min)-273.15)*1.8)+32);
    var tempMax = Math.round(((parseFloat(info.main.temp_max)-273.15)*1.8)+32);
    var feelsLike = Math.round(((parseFloat(info.main.feels_like)-273.15)*1.8)+32);
    
	
	document.getElementById("location").innerHTML = info.name + ", " + info.sys.country;
    document.getElementById("description").innerHTML = (info.weather[0].description).charAt(0).toUpperCase() + (info.weather[0].description).slice(1);
	document.getElementById("temp").innerHTML = temp + "&deg;";
    document.getElementById("tempRange").innerHTML = "Temperature Range: " + (tempMin + "&deg;") + " - " + (tempMax + '&deg;');
    document.getElementById("wind").innerHTML = info.wind.speed + " Wind Speed";
    document.getElementById("humidity").innerHTML = info.main.humidity + "% " + "Humidity";
    document.getElementById("feelsLike").innerHTML = "Feels like " + feelsLike + "&deg;";


    var lat = info.coord.lat;
    var lon = info.coord.lon;
    fiveDayWeatherFinder(lat, lon);
}




// Fetching the 5 day forecast using lattitude and longitude.
function fiveDayWeatherFinder(lat, lon) {

  var key = "3c0dc64e8a4521b6469866fdc1fc689d";
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key)  
  .then(function(response) { return response.json() })
  .then(function(data) {
    console.log(data);
    fiveDayWeatherConditions(data);
  });
}



function fiveDayWeatherConditions(info) {
	// var celcius = Math.round(parseFloat(d.main.temp)-273.15);

for(var i=1; i<6; i++) {

	var temp = Math.round(((parseFloat(info.list[i].main.temp)-273.15)*1.8)+32);
    var tempMin = Math.round(((parseFloat(info.list[i].main.temp_min)-273.15)*1.8)+32);
    var tempMax = Math.round(((parseFloat(info.list[i].main.temp_max)-273.15)*1.8)+32);
    var feelsLike = Math.round(((parseFloat(info.list[i].main.feels_like)-273.15)*1.8)+32);
    
	
	// document.getElementById("location1").innerHTML = info.list[1].name + ", " + info.list[1].sys.country;
    document.getElementById("description" + i).innerHTML = (info.list[i].weather[0].description).charAt(0).toUpperCase() + (info.list[i].weather[0].description).slice(1);
	document.getElementById("temp" + i).innerHTML = temp + "&deg;";
    document.getElementById("tempRange" + i).innerHTML = "Temperature Range: " + (tempMin + "&deg;") + " - " + (tempMax + '&deg;');
    document.getElementById("wind" + i).innerHTML = info.list[i].wind.speed + " Wind Speed";
    document.getElementById("humidity" + i).innerHTML = info.list[i].main.humidity + "% " + "Humidity";
    document.getElementById("feelsLike" + i).innerHTML = "Feels like " + feelsLike + "&deg;";
}}


