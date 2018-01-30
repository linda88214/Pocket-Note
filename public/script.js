$(function(){

  var date = new Date();
  var current = $('.currentDate').text(date.toDateString());

  $('#search').on('click', function(event){
    event.preventDefault();
    var $input = $('#zipcode').val()
    makeCall($input)
  });

  function makeCall(zipcode){
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=63e9751a23132c87d59ecf3cefbaa143`, {
      success: function(data) {
        console.log(data)
        getData(data);
      },
      error: err => console.log('err: ', err)
    });
  }

  function getData(responseData){
    var city = responseData.name;
    var currentTemp = responseData.main.temp ;
    var description = responseData.weather[0].description;
    var minTemp = responseData.main.temp_min;
    var maxTemp = responseData.main.temp_max;
    console.log(city, currentTemp, description, minTemp, maxTemp)
    appendToDom(city, currentTemp, description, minTemp, maxTemp)
  }

  function appendToDom(city, currentTemp, description, minTemp, maxTemp){
    var $result = $('#result');
    var $city = $('<h1>').text('Weather for ' + city);
    var $currentTemp = $('<p>').text('Current temperature is: ' + Math.round(currentTemp) + '\xB0');
    var $description = $('<p>').text(description.toUpperCase());
    var $minTemp = $('<p>').text('Minimum temperature is: ' + Math.round(minTemp) + '\xB0');
    var $maxTemp = $('<p>').text('Maximum temperature is: ' + Math.round(maxTemp) + '\xB0');
    $result.append($city, $currentTemp, $description, $minTemp, $maxTemp)
    }

    

}); // ends doc.ready




