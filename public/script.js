$(function(){

  const date = new Date();
  // $('.currentDate').text(date.toDateString());

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


// New Comment Page, inserting current weather 
  function appendToDom(city, currentTemp, description, minTemp, maxTemp){
    var $result = $('#result');
    var $city = $('<h1>').text('Weather for ' + city);
    var $currentTemp = $('<p>').text('Current temperature is: ' + Math.round(currentTemp) + '\xB0');
    var $description = $('<p>', {class: 'weather'}).text(description.toUpperCase());
    console.log(description)
    var $date = $('<input>').attr({type: 'hidden', name: 'commentday', value: date.toDateString()})

    console.log(typeof description)
    var $input = $('<input>').attr({type: 'hidden', name: 'weather', value: description.toString()})
    var $minTemp = $('<p>').text('Minimum temperature is: ' + Math.round(minTemp) + '\xB0');
    var $maxTemp = $('<p>').text('Maximum temperature is: ' + Math.round(maxTemp) + '\xB0');
    $result.append($city, $currentTemp, $description, $input, $date, $minTemp, $maxTemp)
    }

  const $editForm = $("#edit-form");
  $editForm.submit(e => {
    e.preventDefault();
    const url = e.target.getAttribute("action");
    // console.log(url)
    const data = $(e.target).serialize();
    $.ajax({
      method: "put",
      url: url,
      data: data,
      dataType: "json",
      success: data => {
        console.log('success!');
        window.location.href = "/weathercomments";
      }
    });
  });

  const $deleteButton = $('.delete');
  $deleteButton.click(e => {
    e.preventDefault();
    // console.log('clicked')
    const id = e.target.getAttribute('data');
    // console.log(id)
    const data = $(e.target).serialize();

    var result = confirm("Want to delete?");

    if(result){
      $.ajax({
        method: "delete",
        data: data,
        url: `/weathercomments/${id}`,
        success: data => {
          window.location.href = "/weathercomments";
        }
      })
    }
  });

});




