require('dotenv').config()
const yargs = require('yargs')
const request = require('request')
const chalk = require('chalk')
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=MIAMI&appid=${WEATHER_API_KEY}`


request(WEATHER_API_URL, (error, response, body) => {
    const weatherData = JSON.parse(response.body)
    console.log(`Current temperature in ${weatherData.name}, ${weatherData.sys.country} is ${weatherData.main.temp}F.`)
    console.log(`Conditions are currently: ${titleCase(weatherData.weather[0].description)}`)
})

const convertToFarenheit = (temp) => {
    return ((297 - 273.15) * (9/5) + 32).toFixed(2)
}

const convertToCelsius = (temp) => {

}

const titleCase = (sentence) => {
    let newSentence = ''
    let sentenceArr = sentence.split(' ')
    for (let i = 0; i < sentenceArr.length; i++) {
        word = sentenceArr[i]
        word = word[0].toUpperCase() + word.slice(1).toLowerCase()

        if(i < sentenceArr.length - 1) {
            word += ' '
        }

        newSentence += word
    }
    return newSentence
}