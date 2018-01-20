////////////////////////// KAIRNS JAVASCRIPT ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//Set initial latitute and longitude variables, to be used later
var lat = 0;
var long = 0;
var radius = 0;
var rating = 0;
var trailID = "";
var trailValue = 0;

//////INITIATE FIREBASE//////
var config = {
    apiKey: "AIzaSyAHJ4UpOSPIsipGmPXYQnv9y8tJ3n4BTvM",
    authDomain: "hiking-7925e.firebaseapp.com",
    databaseURL: "https://hiking-7925e.firebaseio.com",
    projectId: "hiking-7925e",
    storageBucket: "hiking-7925e.appspot.com",
    messagingSenderId: "345337252889"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


////////////// FUNCTION FOR STAR RATING ////////////////////////////////////////\
function rateTrail() {
  var isRated = false;
  $(".mtn-img").on("click", function() {
    rating = $(this).attr("value");
    console.log(rating);
    $(this).prevAll().addBack().attr("src", "assets/images/mtn-2.png");
    isRated = true;
  });
  $(".mtn-img").mouseenter(function() {
    if (!isRated) {
      $(this).prevAll().addBack().attr("src", "assets/images/mtn-2.png");
    }
  })
  $(".mtn-img").mouseleave(function() {
    if (!isRated) {
      $(this).prevAll().addBack().attr("src", "assets/images/mtn-1.png");
    }
  })
  $(".reset").on("click", function() {
    $(".mtn-img").attr("src", "assets/images/mtn-1.png");
    isRated = false;
  })

}

//////////////////////GOOGLE MAPS AUTOCOMPLETE ////////////////////////////////
function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('txtAddress')),
      {types: ['geocode']});
};
//////////////////////FUNCTIONALITY - SUBMIT////////////////////////////////////

// this callback will serve as the function to which both a key press (Enter) and the button click ("#submit") refer

var submissionCallback = function() {
  $("#search-results").empty();
  //store the value of user input in a variable
  var userInput = $("#txtAddress").val();
  //trim the user input to the form needed for the api
  var userSearchTerm = userInput.split(' ').join('+');

  radius = $("input:checked").val();
  $("#miles").text(radius);

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
      var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=" + radius + "&sort=distance&maxResults=20&key=200206461-4fa8ac1aa85295888ce833cca1b5929f"
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          if (response.trails.length === 0){
            $("#search-results").html('<h3 style="color:white">No trails found</h3><p style="color:white">Try expanding your radius and search again</p>')
          } else {
          // loop through the response trails and add info to the site
          for (i = 0; i < response.trails.length; i++) {
            // create divs to hold the trail name and additional trail info
            var contentDivTitle = $("<div class='newTrailTitle'>");
            var contentDivMain = $("<div class='newTrailDescription grid-2'>");
            //give the trail name div attributes for latitude, longitude, and value
            //(Used to call weather api later)
            lat = response.trails[i].latitude;
            long = response.trails[i].longitude;
            contentDivTitle.attr("latitude", lat);
            contentDivTitle.attr("longitude", long);
            contentDivTitle.attr("value", i);
            contentDivTitle.attr("trailID", response.trails[i].name.split(' ').join(''));

            //give div title a custom attribute called TrailID set to the name of the trail
            //this will be used later for our firebase calls
            contentDivTitle.attr("trailID", response.trails[i].name.split(' ').join(''));

            //Create variable to embed the google map at the latitude and longitude
            var embedMap = "<iframe class=\"map\" width=\"300\" height=\"300\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"https://maps.google.com/maps?q=" + lat + "," + long + "&hl=en&z=12&output=embed\"></iframe>"

            //Add content to the trail name and additional trail info divs
            //for the div title add the name and location (city, state)
            contentDivTitle.html(response.trails[i].name + "--" + response.trails[i].location);
            //for the content main, create a div called details that contains
            //summary, length, ascent, current conditions, and current weather
            contentDivMain.html("<div class='details' Summary: " + response.trails[i].summary +
              "<br>Length: " + response.trails[i].length +
              " mi <br> Ascent: " + response.trails[i].ascent +
              " ft<br>Current Conditions: " + response.trails[i].conditionStatus +
              "<br>Current Weather: <span class='trailWeather" + i +
              "'></span>" +
              //Then create a div to embed the google map in, and embed the map
              "</div><div class='map'>" + embedMap +
              "<br><a href='" + response.trails[i].url + "' target='_blank'>Trail Map & More Info </a></div>" +
              //next create a div to hold the comments.
              //includes the comment form and a button to submit comments
              "<div commentsFor='" + response.trails[i].name.split(' ').join('') + "'><h2>Leave a Review</h2><label for='dateVisited'>Date Visited</label><input id='date"+i+"' type='date' class='userDate'><div class='mtn-rating'><img class='mtn-img' value='1' src='assets/images/mtn-1.png'><img class='mtn-img' value='2' src='assets/images/mtn-1.png'><img class='mtn-img' value='3' src='assets/images/mtn-1.png'><img class='mtn-img' value='4' src='assets/images/mtn-1.png'><img class='mtn-img' value='5' src='assets/images/mtn-1.png'><button class='reset'>Reset</button></div><label for='userComment'>Comments</label><input type='text' class='userComment' id='comment"+i+"'><button class='addComment' name='" + response.trails[i].name + "'>Add Comment</button><h2>User Comments</h2></div>").hide();
            //Append the new divs to the search results div
            $("#search-results").append(contentDivTitle);
            $("#search-results").append(contentDivMain);
          }
        }
        });
    });
  // Scroll the user down to search results
  $('html, body').animate({
    scrollTop: $("#search-results").offset().top
  }, 2000);

};

//When user clicks the "submit" button...
$("#submit").click(submissionCallback);
//...or when user presses "Enter" key, it'll execute the callback function
$("input").keypress(function() {
  if (event.which == 13) submissionCallback();
});


////////// FUNCTIONALITY WHEN USER SELECTS INDIVIDUAL TRAIL///////////////////// ///////////////////////////////////////////////////////////////////////////////

//When user selects a trail
$(document).on('click', '.newTrailTitle', function() {
  //slide toggle the info portion down
  $(this).next("div").slideToggle(600);
  //store the value of the current trail in a variable
  trailID = $(this).attr("trailID");
  trailValue =$(this).attr("value");
  //Run the Open Weather Map API, using the latitude and longitude stored earlier
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + $(this).attr("latitude") + "&lon=" + $(this).attr("longitude") + "&units=imperial&cnt=1&appid=9cebf51611031e41d40169d2d6224b0a";
  // Run AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    //Grab relevant response data and post to current trail div
    var currentWeather = response.list[0].weather[0].description;
    $("span.trailWeather" + trailValue).text(currentWeather);
  });
  rateTrail();

  database.ref().once('value', function(snapshot) {
      if (snapshot.hasChild(trailID)) {
        console.log("exists");
      } else {
        database.ref(trailID).set({
          name: trailID
        });
      }
  });

  //funciton to add comments associated with the trail
  database.ref(trailID + "/comments").on("child_added", function(snapshot){
    var newComment = $("<div>").html("<span>Date: " + snapshot.val().date + "</span><span>Comment: " + snapshot.val().comment + '</span><span>Rating: ' + snapshot.val().rating);
    $("div[commentsFor='"+trailID+"']").append(newComment);
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
});

////////////////////FIREBASE ADD COMMENT ///////////////////////////////////////

//When the user adds a comment
$(document).on("click", ".addComment", function() {
  var userDate = $("#date" + trailValue).val();
  var userComment = $("#comment" + trailValue).val();

  database.ref(trailID +"/comments").push({
    date: userDate,
    comment: userComment,
    rating: rating
  });



})

////////////////////////////////////////////////////////////////////////////////
$(document).ready(initAutocomplete);
