import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-html/directives/repeat.js';

import { towns } from './towns.js';

const section = document.getElementById('towns');
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', search)

const townsTemplate = (towns) => html`
<ul>
   ${repeat(towns, t => t, townList)}
</ul>`;

const townList = (town) => html`<li>${town}</li>`;

render(townsTemplate(towns), section);

function search() {

   let search = document.getElementById('searchText').value;
   let towns = Array.from(document.querySelectorAll('#towns li'));
   let match = document.getElementById('result');
   let count = 0;

   for (const town of towns) {
      if (town.textContent.includes(search) && search !== '') {
         town.classList.add('active');
         count++;
      } else {
         town.classList.remove('active');
      }
   }

   match.textContent = `${count} matches found`;
}