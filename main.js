
// Try to get user location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiRequest.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=789f2c7c553ae281ecf566fcce879323"
  );
  apiRequest.send();
}



//Declare variables
const API_KEY = "789f2c7c553ae281ecf566fcce879323";
let apiRequest = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
getLocation();
apiRequest.open(
  "GET",
  "https://api.openweathermap.org/data/2.5/weather?q=New York&units=imperial&appid=789f2c7c553ae281ecf566fcce879323"
);

let getNewLocation = function () {
  apiRequest.open(
    "GET",
    "https://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("input").value +"&units=imperial&appid=789f2c7c553ae281ecf566fcce879323"
  );
  apiRequest.send();
}


//Handle the data
apiRequest.onload = function () {
  // Begin accessing JSON data here
  let weatherData = JSON.parse(this.response);
  
  dataHandler(weatherData);
};

let dataHandler = function (object) {
  document.getElementById("location").innerHTML =
    object.name + ", " + object.sys.country;
  document.getElementById("icon").src =
    "icons/" + object.weather[0].main + ".png";
  document.getElementById("temp").innerHTML =
    Math.round(object.main.temp) + "&deg";
  document.getElementById("min-max").innerHTML =
    Math.round(object.main.temp_max) +
    "<br />" +
    Math.round(object.main.temp_min);
  document.getElementById("feels").innerHTML =
    "Feels like: " + Math.round(object.main.feels_like);
};

// Send request
apiRequest.send();
