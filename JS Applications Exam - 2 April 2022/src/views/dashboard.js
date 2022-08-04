
import { getAllAnimals } from "../api/animals.js";
import { html, repeat } from "../lib.js";

const dashboardTemplate = (items) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${items.length != 0 
            ? html`${repeat(items, i => i, itemCard)}` 
            : html`<div><p class="no-pets">No pets in dashboard</p></div>`}
    </div>
</section>`;

const itemCard = (animal) => html`
<div class="animals-board">
    <img class="animal-image-cover" src=${animal.image}>
    <h2 class="name">${animal.name}</h2>
    <h3 class="breed">${animal.breed}</h3>
    <div class="action">
        <a class="btn" href="animal/${animal._id}">Details</a>
    </div>
</div>`;

export async function dashboardView(ctx) {
    const animals = await getAllAnimals();
    console.log(animals);
    ctx.render(dashboardTemplate(animals));
}