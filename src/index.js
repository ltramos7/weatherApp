// find button, create event listener to call lat and long function
// define lat and long function
// lat and long function return object, including latitude and longitude
// pass the latitude and longitude into the weather API
// new object recieved from weather API
// define function to display recieved object to display its info onto the frontend



let currentWeatherBtn = document.getElementById("current-weather")

successCallback = (position) => {
    console.log("latitude: ", position.coords.latitude, "longitude: ", position.coords.longitude)
}

errorCallback = (error) => {
    console.error(error)
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback)