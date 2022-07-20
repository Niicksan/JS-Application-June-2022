import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-html/directives/repeat.js';
import { cats } from './catSeeder.js';

const section = document.getElementById('allCats');

const catTemplate = (cats) => html`
<ul>
    ${repeat(cats, t => t, catList)}
</ul>`;

const catList = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${showStatusCode}>Show status code</button>
        <div class="status" style="display: none" id="${cat.id}">
            <h4>Status Code: ${cat.id}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;

function showStatusCode(event) {
    const codeInfo = event.target.parentElement.querySelector('.status');

    if (codeInfo.style.display == 'none') {
        codeInfo.style.display = 'block';
        event.target.textContent = 'Hide status code';
    } else {
        codeInfo.style.display = 'none';
        event.target.textContent = 'Show status code';
    }
}

render(catTemplate(cats), section);