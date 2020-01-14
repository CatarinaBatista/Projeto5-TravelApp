import { showAllTrips, showCityData, deleteTrip, addTrip } from './handleTrips';
import { printTrip, restrictDates, showNavBar } from './app';

/* Show or hide navbar */
document.addEventListener("scroll", showNavBar);

/* When app starts */
showAllTrips();
restrictDates();

/* Show modal with city info after submit form */
document.getElementById("submitForm").addEventListener("click", (event) => showCityData(event));

/* Add trip after save it */
document.getElementById("addTrip").addEventListener("click", (event) => addTrip(event));

/* Print the page */
document.getElementById("print").addEventListener("click", (event) => printTrip(event));

/* Delete Trip */
document.getElementById("allTrips").addEventListener('click', (event) => deleteTrip(event));