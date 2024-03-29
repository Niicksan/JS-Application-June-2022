import { html, repeat } from "../lib.js";
import { getAllOffers } from "../api/offeres.js";


const dashboardTemplate = (offers) => html`
<section id="dashboard">
    <h2>Job Offers</h2>
        ${offers.length != 0 
            ? html`${repeat(offers, o => o, itemCard)}` 
            : html`<h2>No offers yet.</h2>`}
</section>`;

const itemCard = (offer) => html`
<div class="offer">
    <img src=${offer.imageUrl} alt="./images/example3.png" />
    <p>
        <strong>Title: </strong><span class="title">${offer.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
    <a class="details-btn" href="/offer/${offer._id}">Details</a>
</div>`;

export async function dashboardView(ctx) {
    const offers = await getAllOffers();
    ctx.render(dashboardTemplate(offers));
}