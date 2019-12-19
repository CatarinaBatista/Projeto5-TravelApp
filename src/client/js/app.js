import { getCityData, getImages} from './apis';
import moment from 'moment';

/* Show a modal with data of the city*/
const showCityData = async(event) => {
    const form = document.getElementById('form');

    if (form.checkValidity()) {
        const city = await getCityData(event);
    
        fillModalInfo(city);
        $('#modal').modal({show: true}); 
    }
    else {
        alert('Please fill out the field "Going to", "Departing on" and "Returning on"');
    }
}

/* Fill Modal with Trip Info*/
const fillModalInfo = async(city) => {
    const title = document.getElementById('modalTitle');
    const startDate = document.getElementById('depart-date').value.toString();
    const endDate = document.getElementById('return-date').value;
    const from = document.getElementById('from').value;


    if (from === '') {
        title.innerText = `Going to ${city.cityName}, ${city.country}`;
    }
    else {
        title.innerText = `${from}  -->  ${city.cityName}, ${city.country}`;
    }

    document.getElementById('departDate').innerText = moment(startDate).format("dddd, DD MMMM YYYY").toString();
    document.getElementById('returnDate').innerText = moment(endDate).format("dddd, DD MMMM YYYY").toString();
    document.getElementById('durationTrip').innerText = moment(endDate).diff(moment(startDate), 'days') + ' days';

    document.getElementById('cityImg').setAttribute('src', await getImages(city.cityName));
    document.getElementById('cityImg').setAttribute('alt', city.cityName);
}

/* Event Listener */
document.getElementById('submitForm').addEventListener('click', (event) => showCityData(event));