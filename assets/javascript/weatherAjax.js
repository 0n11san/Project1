function requestWeather (lat, lon) {

var APIKey = "9cebf51611031e41d40169d2d6224b0a";


      console.log(lat, lon)

       /*testing var queryURL = https://api.openweathermap.org/data/2.5/weather?q=fairfax,us&units=imperial&appid=9cebf51611031e41d40169d2d6224b0a
       api.openweathermap.org/data/2.5/forecast?lat=35&lon=139
       https://api.openweathermap.org/data/2.5/forecast?lat=&lon=&units=imperial&appid=9cebf51611031e41d40169d2d6224b0a */

      //building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            console.log(response);


            // Transfer content to HTML
          $(".city").html("city: " + response.name);
          $(".wind").text("Wind Speed: " + response.list[0].wind.speed);
          $(".temp").text("Temperature (F) " + response.list[0].main.temp);
/*
  $(".temp").attr("data-temp", response.main.temp)
  $(".temp").text($('.temp')attr("data-temp"));
*/
            // Log the data in the console as well
            console.log("Wind Speed: " + response.list[0].wind.speed);
            console.log("Temperature (F): " + response.list[0].main.temp);

                });

}
//requestWeather (35,78);
