import {getCityData} from './apis';

document.getElementById('submitForm').addEventListener('click', (event) => getCityData(event));