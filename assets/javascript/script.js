// variable declaration

let searchBtn = $("#citySearch");
let prevCities = $("#searchedCities");

// event listeners

searchBtn.on("click", ".btn", function (event) {
  event.preventDefault();
  let searchEntry = $("input[name='citySearchForm']").val();
  if (!searchEntry) {
    console.log("No city entered");
    return;
  } else {
    console.log(searchEntry);
  }
});
