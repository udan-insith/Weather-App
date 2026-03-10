const apiKey = "89bedd80a0646b9e1f7641b2119b32fc"
const weatherData = document.getElementById("weather-data")
const cityInputEl = document.getElementById("city-input")
const formEl = document.querySelector("form")
const cityName = document.getElementById("input-city")

// EVENTLISTENERS
formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    const cityValue = cityInputEl.value
    getWeatherData(cityValue)
})

// FUNCTIONS
async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok) {
            throw new Error("Network response was not ok")
        }

        const data = await response.json()
        
        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`

        weatherData.querySelector(".temperature").textContent = `${temperature}°C`

        weatherData.querySelector(".description").textContent = description

        weatherData.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("")

        cityName.textContent = `${cityValue}`

    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = ""

        weatherData.querySelector(".temperature").textContent = ""

        weatherData.querySelector(".description").textContent = "An error happened. please try again later"

        weatherData.querySelector(".details").innerHTML = ""
    }
}