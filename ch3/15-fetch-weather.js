import weatherEmitter from './14-weather-events.js'

async function fetchWeather(city) {
  const YOUR_API_KEY = 'YOUR_API_KEY'

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${YOUR_API_KEY}&contentType=json`

  weatherEmitter.emit('requestStart', city)

  const response = await fetch(url)

  const data = await response.json()
  weatherEmitter.emit('requestEnd', { city, data, status: 'success' })
}

fetchWeather('Melbourne')
