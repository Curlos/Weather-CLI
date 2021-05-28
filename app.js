const dotenv = require('dotenv').config()
const got = require('got')
const chalk = require('chalk')
const {convertToFarenheit, convertToCelsius, titleCase, addToWeatherTrackingFile, getMostFrequentCondition} = require('./utils')

const myArgs = process.argv.slice(2)

if (myArgs.length < 1) {
    console.log("Please type a valid location after node app.js. For example, 'node app.js bucharest' or 'node app.js bucharest -f'.")
    return
}

const LOCATION = myArgs[0].toUpperCase()
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const CURRENT_WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${WEATHER_API_KEY}`
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY
const GEOCODING_API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${LOCATION}.json?access_token=${GEOCODING_API_KEY}`


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
        let weatherFileInfo = {location: `${placeInfo.city}, ${placeInfo.country}`}


        if (myArgs.length < 2) {
            let tempFarenheit = convertToFarenheit(currentTemp)
            let tempCelsius = convertToCelsius(currentTemp)
            console.log(`Current temperature in ${placeInfo.city}, ${placeInfo.country} is ${chalk.yellow(tempFarenheit + 'F')} or ${chalk.blue(tempCelsius + 'C')}.`)
            weatherFileInfo['farenheit'] = tempFarenheit
            weatherFileInfo['celsius'] = tempCelsius

        } else if (myArgs.length >= 2) {
            const TEMP_TYPE = myArgs[1].toLowerCase()

            console.log(TEMP_TYPE)
            console.log(myArgs)

            if(TEMP_TYPE == '-f' || TEMP_TYPE == 'farhenheit') {
                tempFarenheit = convertToFarenheit(currentTemp)
                console.log(`Current temperature in ${placeInfo.city}, ${placeInfo.country} is ${chalk.yellow(tempFarenheit + 'F')}.`)
                weatherFileInfo['farenheit'] = tempFarenheit

            } else if(TEMP_TYPE == '-c' || TEMP_TYPE == 'celsius') {
                tempCelsius = convertToCelsius(currentTemp)
                console.log(`Current temperature in ${placeInfo.city}, ${placeInfo.country} is ${chalk.blue(tempCelsius + 'C')}.`)
                weatherFileInfo['celsius'] = tempCelsius
            }
        }

        console.log(`Conditions are currently: ${currentConditions}.`)
        console.log(`What you should expect: ${expectedConditions}.`)

        weatherFileInfo['currentConditions'] = currentConditions
        weatherFileInfo['expectedConditions'] = expectedConditions
        addToWeatherTrackingFile(weatherFileInfo)
    } catch (error) {
        console.log(error)
    }
}

getCoordinates()