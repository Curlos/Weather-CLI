require('dotenv').config()
const got = require('got')
const chalk = require('chalk')

const myArgs = process.argv.slice(2)
const LOCATION = myArgs[0].toUpperCase()
const TEMP_TYPE = myArgs[1].toLowerCase()

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const CURRENT_WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${WEATHER_API_KEY}`
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY
const GEOCODING_API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${LOCATION}.json?access_token=${GEOCODING_API_KEY}`


console.log(LOCATION, TEMP_TYPE)

const getCoordinates = async () => {
    let coords = ''

    try {
        const response = await got(GEOCODING_API_URL)
        const geocodingData = JSON.parse(response.body)
        coords = geocodingData.features[0].center
        const lon = coords[0]
        const lat = coords[1]
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${WEATHER_API_KEY}`

        logWeatherInfo(url)
        
    } catch(error) {
        console.log(error.response.body)
    }
}

const getCityAndCountryInfo = async () => {
    const response = await got(CURRENT_WEATHER_URL)
    const weatherData = JSON.parse(response.body)
    const cityName = weatherData.name
    const countryName = weatherData.sys.country

    return {city: cityName, country: countryName}
}

const logWeatherInfo = async (url) => {
    try {
        const response = await got(url)
        const weatherData = JSON.parse(response.body)
        const currentWeather = weatherData.current
        const currentTemp = currentWeather.temp
        const currentConditions = titleCase(currentWeather.weather[0].description)
        const dailyWeather = weatherData.daily
        const expectedConditions = getMostFrequentCondition(dailyWeather)
        const placeInfo = await getCityAndCountryInfo()

        console.log(expectedConditions)
        
        if(TEMP_TYPE == '-f' || TEMP_TYPE == 'farhenheit') {
            temp = convertToFarenheit(currentTemp)
            tem
            console.log(`Current temperature in ${placeInfo.city}, ${placeInfo.country} is ${chalk.yellow(temp + 'F')}.`)
        } else if(TEMP_TYPE == '-c' || TEMP_TYPE == 'celsius') {
            temp = convertToCelsius(currentTemp)
            console.log(`Current temperature in ${placeInfo.city}, ${placeInfo.country} is ${chalk.blue(temp + 'C')}.`)
        }

        console.log(`Conditions are currently: ${currentConditions}`)
        console.log(`What you should expect: ${expectedConditions}`)
    } catch (error) {
        console.log(error.response.body)
    }
}

const getMostFrequentCondition = (dailyWeather) => {
    let dailyConditions = {}

    for(let weather of dailyWeather) {
        let condition = titleCase(weather.weather[0].description)

        if(dailyConditions.hasOwnProperty(condition)) {
            dailyConditions[condition] += 1
        } else {
            dailyConditions[condition] = 1
        }
    }

    let entries = Object.entries(dailyConditions)
    let sorted = entries.sort((a, b) => b[1] - a[1]);
    let mostFrequentWeatherConditionDaily = sorted[0][0]

    return mostFrequentWeatherConditionDaily
}

const convertToFarenheit = (temp) => {
    return ((temp - 273.15) * (9/5) + 32).toFixed(2)
}

const convertToCelsius = (temp) => {
    return (temp - 273.15).toFixed(2)
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

getCoordinates()