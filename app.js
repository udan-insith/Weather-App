const apiKey = "89bedd80a0646b9e1f7641b2119b32fc"
const weatherData = document.getElementById("weather-data")
const cityInputEl = document.getElementById("city-input")
const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    const cityValue = cityInputEl.value
    getWeatherData(cityValue)
})

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
            `Humidity: ${data.main.humudity}`,
            `Wind Speed: ${data.wind.speed}`
        ]

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`
        weatherData.querySelector(".temperature").textContent = `${temperature}°C`
        weatherData.querySelector(".description").textContent = description
    } catch (error) {
        
    }
}