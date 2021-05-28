# Weather CLI

## Overview

This app was created for the Chingu Voyage 31 pre-work. It pulls data from the 
[Open Weather Map API](https://openweathermap.org/api) and the [Mapbox API](https://docs.mapbox.com/api/overview/) to display the weather from any city in the world in your terminal

## Features

- Can get the temperature of a location in farenheit, celsius, or both.

- Displays the current weather conditions (such as 'Clear Sky')

- Displays the expected weather condition for the day by calculating the weather condition that most frequently occurs during the day

- Saves the above information into a file called 'weather.txt' in the format: 'Location: [City, Country] | Temperature: [Temperature in fahrenheit and or Temperature in celsius] | Current Conditions: [Current weather conditions] | Expected Conditions: [Expected weather conditions]  | [Date in user's local format]'
    - Example saved weather log: 'Location: Bucharest, RO | Temperature: 61.63F, 16.46C | Current Conditions: Few Clouds | Expected Conditions: Light Rain | Friday, May 28, 2021'

## Tech Used / Dependencies

- This is a Node.js command-line interface app

- Add-on packages include: <br>

  1. [Got](https://www.npmjs.com/package/got)
  2. [Dotenv](https://www.npmjs.com/package/dotenv)
  3. [Chalk](https://www.npmjs.com/package/chalk)

## How to run
- Download [Node.js](https://nodejs.org/en/download/) for your operating system.
- Signup and obtain api keys from [Open Weather Map API](https://openweathermap.org/api) and [Mapbox API](https://docs.mapbox.com/api/overview/). 
- Create a .env file and place your api keys into the .env file with the environment variables named WEATHER_API_KEY ([Open Weather Map API](https://openweathermap.org/api)) and GEOCODING_API_KEY ([Mapbox API](https://docs.mapbox.com/api/overview/)).
```shell
WEATHER_API_KEY={YOUR_API_KEY}
GEOCODING_API_KEY={YOUR_API_KEY}
```

- Then run, the following command where:
  - [city] = The city of your choice (REQUIRED)
  - [temperature unit] = '-f' or 'fahrenheit' to get the temperature in fahrenheit and 'c' or 'celsius' or to get the temperature in celsius (OPTIONAL)
```shell
$ git clone https://github.com/Curlos/Weather-CLI.git
$ npm install
$ node app.js [city] [temperature unit]
```

## Valid Examples
```shell
$ node app.js bucharest
```
![Screen Shot 2021-05-28 at 6 42 18 PM](https://user-images.githubusercontent.com/41396365/120048188-6f8ea480-bfe4-11eb-91a3-1976ea112b6d.png)

```shell
$ node app.js bucharest -f
```
![Screen Shot 2021-05-28 at 6 51 15 PM](https://user-images.githubusercontent.com/41396365/120048659-b16c1a80-bfe5-11eb-9f8f-c3b2c02da950.png)

```shell
$ node app.js bucharest -fahrenheit
```
![Screen Shot 2021-05-28 at 6 48 36 PM](https://user-images.githubusercontent.com/41396365/120048523-520e0a80-bfe5-11eb-94ac-29188ec81cd5.png)

```shell
$ node app.js bucharest -c
```
![Screen Shot 2021-05-28 at 6 50 50 PM](https://user-images.githubusercontent.com/41396365/120048630-a0bba480-bfe5-11eb-99a0-f1e1e19b8e03.png)

```shell
$ node app.js bucharest -celsius
```
![Screen Shot 2021-05-28 at 6 49 50 PM](https://user-images.githubusercontent.com/41396365/120048594-7f5ab880-bfe5-11eb-87ec-ca41a9e06afa.png)


