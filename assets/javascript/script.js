// variable declaration

const apikey = "678e30c3be2469678a1d2ae3c9c3878e";

const searchBtn = $("#citySearch");
const prevCities = $("#searchedCities");

const cities = JSON.parse(localStorage.getItem("cities")) || [];
// event listeners

searchBtn.on("submit", function (event) {
  event.preventDefault();
  //get user input
  let searchEntry = $("input[name='citySearchForm']").val().trim();
  let data = {};
  //validate
  if (!searchEntry) {
    console.log("No city entered");
    return;
  } else {
    console.log(searchEntry);
    getWeatherData(searchEntry);
  }

  //current weather function (input)
  // build the html for the current weather

  //forecast weather info(input)
  // make a entry to the page for current weather
  // add city to list of previous cities
  // get 5 day forcast
});

function buildCurrentWeather(data) {
  let temp = `
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">${
        data.name
      } <img src="https://openweathermap.org/img/w/${
    data.weather[0].icon
  }.png" alt="${data.weather[0].description}"/>  </h5>
      <p class="card-text" id="temp">Temp: ${data.main.temp}</p>
      <p class="card-text">Wind: ${data.wind.speed} </p>
      <p class="card-text">Humidity: ${data.main.temp}</p>
      <p class="card-text">
        UV Index:
        <span class="${
          data.current.uvi >= 8
            ? "bg-danger"
            : data.current.uvi >= 6
            ? "bg-warning"
            : data.current.uvi >= 3
            ? "bg-success"
            : "bg-info"
        } text-light px-2 rounded">${data.current.uvi}</span>
      </p>
    </div>
    </div>
  `;
}

function addToCitiesList(toAdd) {
  // get list of child objects in the list
  let currentCities = prevCities.children();
  // check to see if the city already in the list
  for (i = 0; i < currentCities; i++) {
    if (currentCities[i].val().toLowerCase() === toAdd.toLowerCase()) {
      console.log("City already in list");
      break;
    }
  }
  // if not in the list add to the list
  let newLi = $("LI");
}

function getWeatherData(city) {
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
  //
  let fullData;
  // fetch the API Data
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      callAllInOneAPI(data.coord);
    });
}

function callAllInOneAPI(coord) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apikey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // retun data
      console.log(data);
      buildCurrentWeather(data);
    });
}
// show saved cities
function showCitiesList() {}
// save array of cities
