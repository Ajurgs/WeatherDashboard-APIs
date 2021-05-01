// variable declaration

const apikey = "678e30c3be2469678a1d2ae3c9c3878e";

const searchForm = $("#citySearch");
const prevCities = $("#searchedCities");
const currentWeather = $("#currentWeather");
const searchInput = $("input[name='citySearchForm']");
const cities = JSON.parse(localStorage.getItem("cities")) || [];

// on start calls
showCitiesList();

// event listeners
//--------------------------------------------
// on the form submit
searchForm.on("submit", function (event) {
  event.preventDefault();
  //get user input
  let searchEntry = searchInput.val().trim();
  let data = {};
  //validate
  if (!searchEntry) {
    console.log("No city entered");
    return;
  } else {
    console.log(searchEntry);
    getWeatherData(searchEntry);
    document.getElementById("citySearch").reset();
  }
});

prevCities.on("click", ".btn", function (event) {
  event.preventDefault();
  // pull information from the button
  let targetCity = {
    name: event.target.innerText,
    coord: {
      lat: event.target.getAttribute("lat"),
      lon: event.target.getAttribute("lon"),
    },
  };
  // call the all in one API
  callAllInOneAPI(targetCity.coord, targetCity.name, true);
});

// functions
//---------------------------------------------
// add city to list of previous cities buttons
function addToCitiesList(toAdd, coord) {
  // get list of child objects in the list
  let currentCities = prevCities.children().children();
  // check to see if the city already in the list
  for (let i = 0; i < currentCities.length; i++) {
    console.log(currentCities[i].innerText);
    if (currentCities[i].innerText.toLowerCase() === toAdd.toLowerCase()) {
      console.log("City already in list");
      return;
    }
  }
  // if not in the list add to the list
  let newLi = $("<li class='list-group-item'></li>").html(
    `<button class = "btn btn-secondary" lat = "${coord.lat}" lon = "${coord.lon}" >${toAdd}</button>`
  );
  prevCities.append(newLi);
  saveCities();
}

function getWeatherData(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
  // fetch the API Data
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // get the coords and then get the all in one function
      console.log(data);
      callAllInOneAPI(data.coord, data.name);
    });
}
// get the all in one api call
function callAllInOneAPI(coord, name, prevBtn = false) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apikey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      buildCurrentWeather(data, name);
      if (!prevBtn) {
        addToCitiesList(name, coord);
      }
    });
}
// build out the current weather card
function buildCurrentWeather(data, name) {
  let temp = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${name}  
            <img src="https://openweathermap.org/img/w/${
              data.current.weather[0].icon
            }.png"
            alt="${data.current.weather[0].description}"/> 
        </h5>
        <p class="card-text" id="temp">Temp: ${data.current.temp} F</p>
        <p class="card-text">Wind: ${data.current.wind_speed} MPH</p>
        <p class="card-text">Humidity: ${data.current.humidity}%</p>
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
  currentWeather.html(temp);
}

// show saved cities
function showCitiesList() {
  for (let i = 0; i < cities.length; i++) {
    // create new list item that has a button with the lat and lon info
    let newLi = $("<li class='list-group-item'></li>").html(
      `<button class = "btn btn-secondary"  lat = "${cities[i].lat}" lon = "${cities[i].lon}" >${cities[i].name}</button>`
    );
    // append the new list item to the list
    prevCities.append(newLi);
  }
}
// save array of cities
function saveCities() {
  let currentCities = prevCities.children().children();
  let cityNames = [];
  for (let i = 0; i < currentCities.length; i++) {
    cityNames.push({
      name: currentCities[i].innerText,
      lat: currentCities[i].getAttribute("lat"),
      lon: currentCities[i].getAttribute("lon"),
    });
  }
  localStorage.setItem("cities", JSON.stringify(cityNames));
}
