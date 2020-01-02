/* Global Variables */
const geoNamesUrl = 'http://api.geonames.org/searchJSON?q=';
const darkSkyUrl = 'https://api.darksky.net/forecast/';
const pixabayURL = 'https://pixabay.com/api/?key=';

const destination = document.getElementById('destination');


/* Function to GET City data from GeoName API */
const getCityData = async(event) => {
    event.preventDefault();
    const url = `${geoNamesUrl}${destination.value}&maxRows=3&username=${process.env.GEONAMES_API_KEY}`;

    const result = await fetch(url);
    try {
        let data = await result.json();

        const city = {
            cityName: data.geonames[0].name,
            country: data.geonames[0].countryName,
            latitude: data.geonames[0].lat,
            longitude: data.geonames[0].lng
        }

        return city;
    }
    catch(error) {
        console.log("error", error);
        alert(error);
    }
}

const getWeather = async(latitude, longitude, startDate) => {
    const seconds = new Date(startDate) / 1000;
    const url = `https://cors-anywhere.herokuapp.com/${darkSkyUrl}${process.env.DARK_SKY_API_KEY}/${latitude},${longitude},${seconds}?exclude=minutely,hourly,daily,flags`;

    const result = await fetch(url);
    try {
        const data = await result.json();

        const forecast = {
            summary: data.currently.summary,
            icon: data.currently.icon,
            temperature: data.currently.temperature,
            apparentTemp: data.currently.apparentTemperature,
        }

        console.log(forecast)
        return forecast;
    }
    catch(error) {
        console.log("error", error);
        alert(error);
    }
}

const getImages = async(cityName) => {
    const url = `${pixabayURL}${process.env.PIXABAY_API_KEY}&q=${cityName}&image_type=photo&category=places&pretty=true&orientation=horizontal`;

    const result = await fetch(url);
    try {
        const data = await result.json();

        const images = [
            {
                image: data.hits[0].largeImageURL
            },
            {
                image: data.hits[1].largeImageURL
            },
            {
                image: data.hits[2].largeImageURL
            },
            {
                image: data.hits[3].largeImageURL
            },
            {
                image: data.hits[4].largeImageURL
            }
        ]
        return images;
    }
    catch(error) {
        console.log("error", error);
        alert(error);
    }
}



export {getCityData, getWeather, getImages}