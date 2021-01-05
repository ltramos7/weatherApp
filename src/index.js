// find button, create event listener to call lat and long function
// define lat and long function
// lat and long function return object, including latitude and longitude
// pass the latitude and longitude into the weather API
// new object recieved from weather API
// define function to display recieved object to display its info onto the frontend

const currentWeatherBtn = document.getElementById("current-weather-btn")
const loadStatus = document.getElementById("load-status")
const locationWeatherInfo = document.getElementById("location-weather-info")
const cityLocation = document.getElementById("city-location")
const currentTime = document.getElementById("current-time")
const currentTemp = document.getElementById("current-temp")
const weatherDescription = document.getElementById("weather-description")
const API_KEY = "aa662ed0d71b09fd88e5880bc7bf3617"


getLocalWeather = () => {
    
    successCallback = (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        loadStatus.textContent = ""

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
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`)
    .then(resp => resp.json() )
    .then(data => renderLocationInfo(data))
}

renderLocationInfo = (data) => {
    console.log("all data info: ", data)
    console.log("data main", data.main)
    console.log("name: ", data.name)

    console.log("DT:", data.dt)
    let today = new Date(Number(data.dt)*1000)
    console.log("today:", today)
    let [month, day, year, hour] = today.toLocaleDateString("en-US").split("/")

    loadStatus.textContent = ""
    cityLocation.textContent = `${data.name} Weather`
    currentTime.textContent = `as of ${month}/${day}/${year}`
    currentTemp.textContent = `${data.main.temp}°`
    weatherDescription.textContent = data.weather[0].description
    
    locationWeatherInfo.textContent = `Temperature: ${data.main.temp} °, Feels like: ${data.main.feels_like}, Temperature Low: ${data.main.temp_min}, Temperature High: ${data.main.temp_max}, Date: ${month}/${day}/${year}`
}

currentWeatherBtn.addEventListener("click", getLocalWeather)