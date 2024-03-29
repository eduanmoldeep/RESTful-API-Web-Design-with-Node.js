import { EventEmitter } from 'events'

class WeatherEvents extends EventEmitter {}

const weatherEvents = new WeatherEvents()

weatherEvents.on('requestStart', (city) => {
  console.log(`Requesting weather for ${city}`)
})

weatherEvents.on('requestEnd', ({ city, data, status }) => {
  console.log(`Received weather for ${city} with status ${status}`)
  console.log(`Current temperature is ${data.days[0].temp} degrees fahrenheit`)
})

export default weatherEvents
