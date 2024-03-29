import weatherEmitter from './14-weather-events.js'

async function fetchWeather(city) {
  const YOUR_API_KEY = 'A2LH7VF85ASNGCHPFR9UY3ALX'

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${YOUR_API_KEY}&contentType=json`

  https: weatherEmitter.emit('requestStart', city)

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  weatherEmitter.emit('requestEnd', { city, data, status: 'success' })
}

fetchWeather('Melbourne')
