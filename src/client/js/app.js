import { getCityData, getImages, getWeather} from "./apis";
import moment from "moment";

let newTrip = {};
const all = document.getElementById("allTrips");
let isScrolling = false;
const nav = document.getElementById('nav');


/* --- Show a modal with data of the city --- */
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


/* --- Fill Modal with Trip Info --- */
const fillModalInfo = async(city) => {
    const title = document.getElementById("modalTitle");
    const startDate = document.getElementById("depart-date").value.toString();
    const endDate = document.getElementById("return-date").value;
    const from = document.getElementById("from").value;
    const carousel = document.querySelectorAll(".img-carousel");
    const forecast = await getWeather(city.latitude, city.longitude, startDate);
    let images = await getImages(city.cityName);


    if (from === "") {
        title.innerText = `Going to ${city.cityName}, ${city.country}`;
    }
    else {
        title.innerText = `${from}  -->  ${city.cityName}, ${city.country}`;
    }

    document.getElementById("departDate").innerText = moment(startDate).format("dddd, DD MMMM YYYY").toString();
    document.getElementById("returnDate").innerText = moment(endDate).format("dddd, DD MMMM YYYY").toString();
    document.getElementById("durationTrip").innerText = moment(endDate).diff(moment(startDate), "days") + " days";
    document.getElementById("forecast").innerText = `${forecast.summary}, ${Math.round(Number(forecast.temperature - 32) * 5 / 9)}ºC  0  ${Math.round(Number(forecast.temperature))}ºF`;
    document.getElementById("icon").className = await forecastIcon(forecast.icon);

    // Carousel
    for (let index = 0; index < carousel.length; index++) {
        const img = carousel[index];
        const url = images[index];
        
        img.src = url.image;
        img.alt = url.cityName
    }

    const generateID = '_' + Math.random().toString(36).substr(2, 9);

    // Trip
    newTrip = {
        id: generateID,
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

/* --- Add trip --- */
const addTrip = async (event) => {
    event.preventDefault();
    
    $("#modal").modal('hide');
    
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

}

/* --- Show the new trip in all trips section --- */
const showTrip = async (trip) => {
    document.getElementById("section-trips").classList.remove("hidden");
    document.getElementById("li-trips").style.display = "block";
    
    await addCard(trip);
}

/* --- Show all trips when reload the page in all trips section --- */
const showAllTrips = async () => {
    nav.classList.add("top");

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
            <div class="carousel slide" data-ride="carousel">
                <div id="cardImg" class="carousel-inner" id="carousel2">
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
            </div>

            <div class="card-body">
                <h5 class="card-title">${trip.city}, ${trip.country}</h5>
                <div class="card-text">
                    <i class="fas fa-plane"></i><b>Departing on</b>:<br>
                    <p>${moment(trip.startDate).format("ddd, DD MMMM YYYY").toString()}</p> <br>
                    <i class="fas fa-suitcase-rolling"></i><b>Returning on</b>: <br>
                    <p>${moment(trip.endDate).format("ddd, DD MMMM YYYY").toString()}</p> <br>
                    <i class="fas fa-hourglass-half"></i><b>Duration</b>: <br> 
                    <p>${moment(trip.endDate).diff(moment(trip.startDate), "days")} days </p><br>
                    <i class="${await forecastIcon(trip.forecast.icon)}"></i><b>Forecast</b>: <br>
                    <p>${Math.round(Number(trip.forecast.temperature - 32) * 5 / 9)}ºC, ${trip.forecast.summary}</p> <br>
                </div>
                <button id="delete" class="btn btn-danger">Delete</button>
            </div>
        </card>`;
        
    all.appendChild(card);
        
}

/* --- Select the icon according to forecast --- */
const forecastIcon = async(icon) => {
    let iconClass = "";

    if (icon === "clear-day" || icon === "clear-night") {
        iconClass = "fas fa-sun";
        return iconClass;
    }
    if (icon === "rain") {
        iconClass = "fas fa-cloud-rain";
        return iconClass;
    }
    if (icon === "snow") {
        iconClass = "far fa-snowflake";
        return iconClass;
    }
    if ( icon === "sleet" || icon === "hail") {
        iconClass = "far fa-cloud-sleet";
        return iconClass;
    }
    if (icon === "wind") {
        iconClass = "fas fa-wind";
        return iconClass;
    }
    if (icon === "fog" || icon === "cloudy") {
        iconClass = "fas fa-cloud";
        return iconClass;
    }
    if (icon === "partly-cloudy-day" || icon === "partly-cloudy-night") {
        iconClass = "fas fa-cloud-sun";
        return iconClass;
    }
    if (icon === "thunderstorm" || icon === "tornado") {
        iconClass = "fas fa-poo-storm";
        return iconClass;
    }
}


/* --- Show or hide navBar it after 1s --- */
const showNavBar = async() => {
    if (window.pageYOffset === 0) {
        nav.classList.add("top");
    }
    else {
        nav.classList.remove("top");
        if (!isScrolling) {
            isScrolling = true;
            nav.classList.remove("hide");
        
            setTimeout(function() {
                isScrolling = false;
                nav.classList.add("hide");
            }, 1000);
        }
    } 
};

/* --- Option to print --- */
const printTrip = async (event) => {
    window.print();
}

export { showNavBar, showAllTrips, showCityData, addTrip, printTrip };