import { showNavBar, showAllTrips, showCityData, addTrip, printTrip } from './app';

/* Show or hide navbar */
document.addEventListener("scroll", showNavBar);

/* When app starts */
showAllTrips();

/* Show modal with city info after submit form */
document.getElementById("submitForm").addEventListener("click", (event) => showCityData(event));

/* Add trip after save it */
document.getElementById("addTrip").addEventListener("click", (event) => addTrip(event));


document.getElementById("print").addEventListener("click", (event) => printTrip(event));
/* document.getElementById("delete").addEventListener("click", (event) => addTrip(event)); */