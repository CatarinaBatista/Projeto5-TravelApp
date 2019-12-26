import { getCityData, getImages} from './apis';
import moment from 'moment';

let trip = {};

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


/* Fill Modal with Trip Info */
const fillModalInfo = async(city) => {
    const title = document.getElementById('modalTitle');
    const startDate = document.getElementById('depart-date').value.toString();
    const endDate = document.getElementById('return-date').value;
    const from = document.getElementById('from').value;
    const carousel = document.querySelectorAll('.img-carousel');
    let images = await getImages(city.cityName);


    if (from === '') {
        title.innerText = `Going to ${city.cityName}, ${city.country}`;
    }
    else {
        title.innerText = `${from}  -->  ${city.cityName}, ${city.country}`;
    }

    document.getElementById('departDate').innerText = moment(startDate).format("dddd, DD MMMM YYYY").toString();
    document.getElementById('returnDate').innerText = moment(endDate).format("dddd, DD MMMM YYYY").toString();
    document.getElementById('durationTrip').innerText = moment(endDate).diff(moment(startDate), 'days') + ' days';


    // Carousel
    for (let index = 0; index < carousel.length; index++) {
        const img = carousel[index];
        const url = images[index];
        
        img.src = url.image;
        img.alt = url.cityName
    }

    // Trip
    trip = {        
        city: city.cityName,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
        startDate: startDate,
        endDate: endDate,
        images: images,
    }
}

/* Add trip */
const addTrip = async (event) => {
    event.preventDefault();
    
    console.log(trip)
    const response = await fetch('http://localhost:8000/addTrip', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trip: trip })
    });

    try {
        const tripData = await response.json();
        
        showTrip(tripData);
        console.log(tripData)
        return tripData;

    } catch (error) {
        console.log(error);
        alert(error)
    }
    
    $('#modal').modal('hide');

}

const showTrip = async (tripData) => {
    const all = document.getElementById("allTrips");
    document.getElementById("section-trips").classList.remove("hidden");

    console.log(document.getElementById("section-trips").classList)
    
    console.log(trip.images[0])
    all.innerHTML = 
    `<card class="card">
        <div class="carousel-inner" id="carousel">
            <div class="carousel-item active">
                <img class="img-carousel" src="${trip.images[0].image}" alt="">
            </div>
            <div class="carousel-item">
                <img class="img-carousel" src="${trip.images[1].image}" alt="">
            </div>
            <div class="carousel-item">
                <img class="img-carousel" src="${trip.images[2].image}" alt="">
            </div>
            <div class="carousel-item">
                <img class="img-carousel" src="${trip.images[3].image}" alt="">
            </div>
            <div class="carousel-item">
                <img class="img-carousel" src="${trip.images[4].image}" alt="">
            </div>
        </div>

        <div class="card-body">
            <h5 class="card-title">${trip.city, trip.country}</h5>
            <p class="card-text">...</p>
            <button class="btn btn-danger">Delete</button>
        </div>
    </card>`
}


/* --- Event Listeners --- */

/* Show modal with city info after submit form*/
document.getElementById('submitForm').addEventListener('click', (event) => showCityData(event));

/* Add trip after save it*/
document.getElementById('addTrip').addEventListener('click', (event) => addTrip(event));