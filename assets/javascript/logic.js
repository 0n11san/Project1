////////////////////////// KAIRNS JAVASCRIPT ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//Set initial latitute and longitude variables, to be used later
var lat = 0;
var long = 0;



//////////////////////FUNCTIONALITY - SUBMIT////////////////////////////////////

//When user clicks the "submit" button
$("#submit").on("click", function() {
  $("#search-results").empty();
  //store the value of user input in a variable
  var userInput = $("#txtAddress").val();
  //trim the user input to the form needed for the api
  var userSearchTerm = userInput.split(' ').join('+');

  //call the google maps geocoding api using user search term
  var queryURLGeocode = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userSearchTerm + "&key=AIzaSyCSAYHZn9fz13c3bsl_RcS13HJu8wDJXCU"
  $.ajax({
      url: queryURLGeocode,
      method: "GET",
    })
    .done(function(response) {
      //Set latitude from the returned object
      lat = response.results[0].geometry.location.lat;
      //limit decimal points to 4 (xx.xxxx) - form needed for hiking api
      lat = lat.toFixed(4);
      //repeat with longitute
      long = response.results[0].geometry.location.lng;
      long = long.toFixed(4);

      //Next, call the hiking project data api using the latitude and longitude pulled fromt google geocoding
      var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=10&key=200206461-4fa8ac1aa85295888ce833cca1b5929f"
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          // loop through the response trails and add info to the site
          for (i = 0; i < response.trails.length; i++) {
            // create divs to hold the trail name and additional trail info
            var contentDivTitle = $("<div class='newTrailTitle'>");
            var contentDivMain = $("<div class='newTrailDescription'>");
            //give the trail name div attributes for latitude, longitude, and value
            //(Used to call weather api later)
            lat = response.trails[i].latitude;
            long = response.trails[i].longitude;
            contentDivTitle.attr("latitude", lat);
            contentDivTitle.attr("longitude", long);
            contentDivTitle.attr("value", i);

            //Create variable to embed the google map at the latitude and longitude
            var embedMap = "<iframe class=\"map\" width=\"300\" height=\"300\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"https://maps.google.com/maps?q="+lat+","+long+"&hl=en&z=12&output=embed\"></iframe>"

            //Add content to the trail name and additional trail info divs
            contentDivTitle.html("Name: " + response.trails[i].name + " Location: " + response.trails[i].location);
            contentDivMain.html("Summary: " + response.trails[i].summary + "<br>Current Weather: <span class='trailWeather" + i + "'></span>" + "<br>Length: " + response.trails[i].length + " mi <br> Ascent: " + response.trails[i].ascent + " ft<br>Current Conditions: " + response.trails[i].conditionStatus + "<br>" + embedMap).hide();
            //Append the new divs to the search results div
            $("#search-results").append(contentDivTitle);
            $("#search-results").append(contentDivMain);
          }

        });
    });
});


////////// FUNCTIONALITY WHEN USER SELECTS INDIVIDUAL TRAIL///////////////////// ///////////////////////////////////////////////////////////////////////////////

//When user selects a trail
$(document).on('click', '.newTrailTitle', function() {
  //slide toggle the info portion down
  $(this).next("div").slideToggle();
  //store the value of the current trail in a variable
  var currentTrail = $(this).attr("value")
  //Run the Open Weather Map API, using the latitude and longitude stored earlier
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + $(this).attr("latitude") + "&lon=" + $(this).attr("longitude") + "&units=imperial&cnt=1&appid=9cebf51611031e41d40169d2d6224b0a";
  // Run AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    //Grab relevant response data and post to current trail div
    var currentWeather = response.list[0].weather[0].description;
    $("span.trailWeather" + currentTrail).text(currentWeather);
  });
});


////////////////////////////////////////////////////////////////////////////////
