var searchButton = document.getElementById("searchButton");
var cityFind = document.getElementById("cityFind");
var cityName = document.getElementById("cityName");
var currentDay = document.getElementById("currentDay");
var fiveDay = document.getElementById("fiveDay");






 function saveCityName() {
    inputCity = cityName.value;
    console.log(inputCity);

    weatherFinder(inputCity);
}



//  Fetching information from the openweather API, using a cities name
function weatherFinder( city ) {

    var key = '3c0dc64e8a4521b6469866fdc1fc689d';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)  
    .then(function(response) { return response.json() })
    .then(function(data) {
      console.log(data);
      weatherConditions(data);
    });
  }



//   Using the information gathered from the fetch function to display data attributes onto the web page for the user to see.
  function weatherConditions( info ) {
	// var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var temp = Math.round(((parseFloat(info.main.temp)-273.15)*1.8)+32);
    var tempMin = Math.round(((parseFloat(info.main.temp_min)-273.15)*1.8)+32);
    var tempMax = Math.round(((parseFloat(info.main.temp_max)-273.15)*1.8)+32);
    var feelsLike = Math.round(((parseFloat(info.main.feels_like)-273.15)*1.8)+32);
    
	
	document.getElementById("location").innerHTML = info.name + ", " + info.sys.country;
    document.getElementById("description").innerHTML = (info.weather[0].description).charAt(0).toUpperCase() + (info.weather[0].description).slice(1);
	document.getElementById("temp").innerHTML = temp + "&deg;";
    document.getElementById("tempRange").innerHTML = "Temperature Range: " + (tempMin + "&deg;") + " - " + (tempMax + '&deg;');
    document.getElementById("coordLat").innerHTML = info.coord.lat;
    document.getElementById("coordLon").innerHTML = info.coord.lon;
    document.getElementById("wind").innerHTML = info.wind.speed + " Wind Speed";
    document.getElementById("humidity").innerHTML = info.main.humidity + "% " + "Humidity";
    document.getElementById("feelsLike").innerHTML = "Feels like " + feelsLike + "&deg;";
}









