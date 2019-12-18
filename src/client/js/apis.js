/* Global Variables */
// APIs
const geoNamesUrl = 'http://api.geonames.org/searchJSON?q=';
const darkSkyUrl = 'https://api.darksky.net/forecast/';
const pixabayURL = 'https://pixabay.com/api/?key=';

//Global Variables
const destination = document.getElementById('destination');
let latitude = null;
let longitude = null;
let returnDate = document.getElementById('return-date');
let departDate = document.getElementById('depart-date');


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

const getWeather = async(latitude, longitude) => {
    const url = `${darkSkyUrl}${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}`; /* ,${time} */

    const result = await fetch(url);
    try {
        const data = await result.json();

        const wheather = {

        }

        console.log(data)
        return data;
    }
    catch(error) {
        console.log("error", error);
        alert(error);
    }
}

const getImages = async() => {
    const url = `${pixabayURL}${process.env.PIXABAY_API_KEY}`;

    const result = await fetch(url);
    try {
        const data = await result.json();


        console.log(data)
        return data;
    }
    catch(error) {
        console.log("error", error);
        alert(error);
    }
}



export {getCityData, getWeather, getImages}