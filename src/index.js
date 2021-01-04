// find button, create event listener to call lat and long function
// define lat and long function
// lat and long function return object, including latitude and longitude
// pass the latitude and longitude into the weather API
// new object recieved from weather API
// define function to display recieved object to display its info onto the frontend



const currentWeatherBtn = document.getElementById("current-weather")
const loadStatus = document.getElementById("load-status")
const mapLink = document.getElementById("map-link")


findUserLocation = () => {

    successCallback = (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        loadStatus.textContent = ""
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
        mapLink.textContent = `You location  Latitude: ${latitude} ° and Longitude: ${longitude} °`;
    }
    
    errorCallback = () => {
        loadStatus.textContent = "Unable to retrieve your location."
    }

    if(!navigator.geolocation){
        loadStatus.textContent = "Geolocation is not supported by your browswer."
    } else {
        loadStatus.textContent = "Locating..."
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    }
}

currentWeatherBtn.addEventListener("click", findUserLocation)