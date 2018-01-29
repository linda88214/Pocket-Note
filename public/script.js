$(function(){

  function makeCall(zipcode){
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=63e9751a23132c87d59ecf3cefbaa143`, {
      success: function(data) {
        console.log(data)
        getData(data);
      },
      error: err => console.log('err: ', err)
    });
  }
});
