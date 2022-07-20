import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-html/directives/repeat.js';


const section = document.getElementById('root');
const form = document.querySelector('form');
form.addEventListener('submit', load);

const townsTemplate = (towns) => html`
<ul>
    ${repeat(towns, t => t, townList)}
</ul>`;

const townList = (town) => html`<li>${town}</li>`;

function load(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const townsData = formData.get('towns');
    const towns = townsData.split(', ');

    render(townsTemplate(towns), section);
    form.reset();
}