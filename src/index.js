// find button, create event listener to call lat and long function
// define lat and long function
// lat and long function return object, including latitude and longitude
// pass the latitude and longitude into the weather API
// new object recieved from weather API
// define function to display recieved object to display its info onto the frontend

// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=imperial&appid=13a84a0bd9147d91ae6b48dc7b2619d5



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

        fetchLocationWeather(latitude, longitude)
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

fetchLocationWeather = (latitude, longitude) => {
    console.log("fetch location info function:", latitude, longitude)
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=aa662ed0d71b09fd88e5880bc7bf3617`)
    .then(resp => resp.json() )
    .then(data => renderLocationInfo(data))
}

renderLocationInfo = (data) => {
    console.log("all data info: ", data)
    console.log("data main", data.main)
    console.log("name: ", data.name)
}

currentWeatherBtn.addEventListener("click", findUserLocation)