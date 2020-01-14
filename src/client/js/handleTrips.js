import { getCityData, getImages, getWeather} from "./apis";
import { forecastIcon, addCard } from './app';
import moment from "moment";

let newTrip = {};
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
        alert("Please fill out the fields 'Going to', 'Departing on' and 'Returning on'");
    }
}


/* Fill the modal with Trip Info  */
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
    document.getElementById("forecast").innerText = `${forecast.summary}, ${Math.round(Number(forecast.temperature - 32) * 5 / 9)}ºC`;
    document.getElementById("icon").className = await forecastIcon(forecast.icon);

    // Carousel
    for (let index = 0; index < carousel.length; index++) {
        const img = carousel[index];
        const url = images[index];
        
        img.src = url.image;
        img.alt = url.cityName
    }

    // Trip
    const generateID = '_' + Math.random().toString(36).substr(2, 9) + '_';
    
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
    })
    .then(await showTrip(newTrip))
    .catch(error => console.log(error));

    //Save trip on local storage
    //localStorage.setItem(newTrip.id, newTrip)
}


/* --- Add the new trip in 'all trips' section --- */
const showTrip = async (trip) => {
    document.getElementById("section-trips").classList.remove("hidden");
    document.getElementById("li-trips").style.display = "block";
    
    await addCard(trip);
}


/* --- Shows all trips when reload the page in 'all trips' section --- */
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


/* Verify if button to delete was clicked and delete the selected trip */
const deleteTrip = async(event) => {
    if (event.target.tagName === "BUTTON") {
        const tripId = (event.target).getAttribute("data-id");
        
        await fetch("http://localhost:8000/deleteTrip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: tripId })
        })
        .then(location.reload(true)) 
        .catch(error => console.log(error));
    }
}

export { showAllTrips, showCityData, addTrip, deleteTrip };