import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-html/directives/repeat.js';

import { post } from "./api.js";
import { getCities } from "./cities.js";

const menu = document.getElementById('menu');
const city = document.getElementById('itemText');
const form = document.querySelector('form');
form.addEventListener('submit', addItem);

const townsTemplate = (cities) => html`
    ${repeat(cities, c => c._id, townList)};
`;

const townList = (city) => html`<option value="${city._id}">${city.text}</option>`;

async function getAllCities() {
    const cities = Object.values(await getCities())

    render(townsTemplate(cities), menu);
}

async function addItem(event) {
    event.preventDefault();

    if (!city.value) {
        return alert('Please enter a city!');
    }

    await post({ text: city.value });
    getAllCities()

    form.reset();
}

document.onload = getAllCities();