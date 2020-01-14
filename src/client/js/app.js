import moment from "moment";

const all = document.getElementById("allTrips");
const nav = document.getElementById('nav');
let isScrolling = false;

/* --- Show or hide navBar after 1s --- */
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


/* --- Option to print trip --- */
const printTrip = async (event) => {
    window.print();
}


/* --- Disallow select dates before today --- */
const restrictDates = async() => {
    let today = new Date();
    today =  today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');

    document.getElementById("return-date").min = today.toString();
    document.getElementById("depart-date").min = today.toString();
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


/* Add/fill the cards of trips */
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
                <button class="btn btn-danger delete-btn" data-id="${trip.id}">Delete</button>
            </div>
        </card>`;
        
    all.appendChild(card);
}


export { showNavBar, printTrip, restrictDates, forecastIcon, addCard };