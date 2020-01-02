import { getCityData, getImages, getWeather} from "./apis";
import moment from "moment";

let newTrip = {};
const all = document.getElementById("allTrips");
let isScrolling = false;
const nav = document.getElementById('nav');


/* Show a modal with data of the city*/
const showCityData = async(event) => {
    const form = document.getElementById("form");

    if (form.checkValidity()) {
        const city = await getCityData(event);
    
        fillModalInfo(city);
        $('#modal').modal({show: true}); 
    }
    else {
        alert("Please fill out the field 'Going to', 'Departing on' and 'Returning on'");
    }
}


/* Fill Modal with Trip Info */
const fillModalInfo = async(city) => {
    const title = document.getElementById("modalTitle");
    const startDate = document.getElementById("depart-date").value.toString();
    const endDate = document.getElementById("return-date").value;
    const from = document.getElementById("from").value;
    const carousel = document.querySelectorAll(".img-carousel");
    let images = await getImages(city.cityName);
    const forecast = await getWeather(city.latitude, city.longitude, startDate)


    if (from === "") {
        title.innerText == `Going to ${city.cityName}, ${city.country}`;
    }
    else {
        title.innerText == `${from}  -->  ${city.cityName}, ${city.country}`;
    }

    document.getElementById("departDate").innerText = moment(startDate).format("dddd, DD MMMM YYYY").toString();
    document.getElementById("returnDate").innerText = moment(endDate).format("dddd, DD MMMM YYYY").toString();
    document.getElementById("durationTrip").innerText = moment(endDate).diff(moment(startDate), "days") + " days";
    document.getElementById("forecast").innerText = `${forecast.summary}, ${Math.round(Number(forecast.temperature - 32) * 5 / 9)}ºC  0  ${Math.round(Number(forecast.temperature))}ºF`;


    // Carousel
    for (let index = 0; index < carousel.length; index++) {
        const img = carousel[index];
        const url = images[index];
        
        img.src = url.image;
        img.alt = url.cityName
    }

    // Trip
    newTrip = {
        city: city.cityName,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
        startDate: startDate,
        endDate: endDate,
        images: images,
        forecast: forecast
    }
}

/* Add trip */
const addTrip = async (event) => {
    event.preventDefault();
    
    const response = await fetch("http://localhost:8000/addTrip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trip: newTrip })
    });

    try {
        const tripData = await response.json();
        
        await showTrip(newTrip);

        return tripData;

    } catch (error) {
        console.log(error);
        alert(error)
    }
    
    $("#modal").modal({hide: true});

}

/* Show the new trip in all trips section */
const showTrip = async (trip) => {
    document.getElementById("section-trips").classList.remove("hidden");
    document.getElementById("li-trips").style.display = "block";
    
    await addCard(trip);
}

/* Show all trips when reload the page in all trips section */
const showAllTrips = async () => {
    const trips = await fetch("http://localhost:8000/getTrips")
        .then(Response => Response.json());

    try { 
        if (trips.length > 0) {
            for (const trip of trips) {
                await addCard(trip);
            }

            document.getElementById("section-trips").classList.remove("hidden");
            document.getElementById("li-trips").style.display = "block";
        }
    }
    catch (error) {
        console.log("ERROR: ", error);
        alert(error);
    }
}

/* Add/Fill the cards of trips */
const addCard = async (trip) => {    
    const card = document.createElement("section");

    card.innerHTML = 
        `<card class="card">
            <div class="carousel-inner" id="carousel">
                <div class="carousel-item active">
                    <img class="img-card" src="${trip.images[0].image}" alt="">
                </div>
                <div class="carousel-item">
                    <img class="img-card" src="${trip.images[1].image}" alt="">
                </div>
                <div class="carousel-item">
                    <img class="img-card" src="${trip.images[2].image}" alt="">
                </div>
                <div class="carousel-item">
                    <img class="img-card" src="${trip.images[3].image}" alt="">
                </div>
                <div class="carousel-item">
                    <img class="img-card" src="${trip.images[4].image}" alt="">
                </div>
            </div>

            <div class="card-body">
                <h5 class="card-title">${trip.city}, ${trip.country}</h5>
                <p class="card-text">
                    <b>Departing on</b>: ${moment(trip.startDate).format("dddd, DD MMMM YYYY").toString()} <br>
                    <b>Returning on</b>: ${moment(trip.endDate).format("dddd, DD MMMM YYYY").toString()} <br>
                    <b>Duration</b>: ${moment(trip.endDate).diff(moment(trip.startDate), "days")} days <br>
                    <b>Forecast</b>: ${trip.forecast.summary} <br>
                    <b>Temperature</b>: ${Math.round(Number(trip.forecast.temperature - 32) * 5 / 9)}ºC  =  ${Math.round(Number(trip.forecast.temperature))}ºF <br>
                    <b>Apparent</b>: ${Math.round(Number(trip.forecast.apparentTemp - 32) * 5 / 9)}ºC  =  ${Math.round(Number(trip.forecast.apparentTemp))}ºF 
                </p>
                <button class="btn btn-danger">Delete</button>
            </div>
        </card>`;
        
        all.appendChild(card);
}


/* --- Show or hide navBar it after 1.5s --- */
function showNavBar() {
    /* if (document.body.scrollTop === 0) {
        nav.classList.remove("hide");
    }
    else {        
        nav.classList.add("hide"); */
        if (!isScrolling) {
            isScrolling = true;
            nav.classList.remove("hide");
        
            setTimeout(function() {
                isScrolling = false;
                nav.classList.add("hide");
            }, 1500);
        }
    /* } */
};



/* --- Event Listeners --- */

document.addEventListener("scroll", showNavBar);

/* When app starts */
showAllTrips();

/* Show modal with city info after submit form */
document.getElementById("submitForm").addEventListener("click", (event) => showCityData(event));

/* Add trip after save it */
document.getElementById("addTrip").addEventListener("click", (event) => addTrip(event));