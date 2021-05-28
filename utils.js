const fs = require('fs')

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

const addToWeatherTrackingFile = (weatherFileInfo) => {
    let line = `Location: ${weatherFileInfo.location} | Temperature: `
    let datetime = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let currentDate = datetime.toLocaleDateString(undefined, options)

    if(weatherFileInfo.hasOwnProperty('farenheit')) {
        line += `${weatherFileInfo.farenheit}F, `
    }

    if(weatherFileInfo.hasOwnProperty('celsius')) {
        line += `${weatherFileInfo.celsius}C | `
    }

    line += `Current Conditions: ${weatherFileInfo.currentConditions} | Expected Conditions: ${weatherFileInfo.expectedConditions} `
    line += `| ${currentDate}\n`

    console.log(line)
    fs.appendFile('weather.txt', line, (error) => {
        if (error) {
            throw error;
        }

        console.log('Weather was added to your weather tracking file, weather.txt')
    })
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

module.exports = {
    convertToFarenheit,
    convertToCelsius,
    titleCase,
    addToWeatherTrackingFile,
    getMostFrequentCondition
}