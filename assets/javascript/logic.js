/////////////// HILLARY'S CODE FOR HIKING API ////////////
//Set initial latitute and longitude variables, to be used later
var lat = 0;
var long = 0;

//Google Geocode API to find the latitude and longitude of the txtAddress
$("#submit").on("click", function() {
  var userInput = $("#txtAddress").val();
  //trim the user input to the form needed for the api
  var userSearchTerm = userInput.split(' ').join('+');

  //call the google geocode api
  var queryURLGeocode = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userSearchTerm + "&key=AIzaSyCSAYHZn9fz13c3bsl_RcS13HJu8wDJXCU"
  $.ajax({
      url: queryURLGeocode,
      method: "GET"
    })
    .done(function(response) {
      //Set latitude and longitude from the returned object
      lat = response.results[0].geometry.location.lat;
      //limit decimal points to 4 (xx.xxxx) - form needed for hiking api
      lat = lat.toFixed(4);

      long = response.results[0].geometry.location.lng;
      long = long.toFixed(4);

      //Call the hiking project api
      var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=10&key=200206461-4fa8ac1aa85295888ce833cca1b5929f"

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          // loop through the response trails and add info to the site
          for (i = 0; i < response.trails.length; i++) {
            var contentDivTitle = $("<div> class='newTrailTitle'");
            var contentDivMain = $("<div> class='newTrailDescription'");
            contentDivTitle.text("Name: " + response.trails[i].name + "     Location: " + response.trails[i].location);
            contentDivMain.text("Summary: " + response.trails[i].summary);
            $("#search-results").append(contentDivTitle);
            $("#search-results").append(contentDivMain);
          }
        });
    });
});



////////////////////////////
