import { getAllFurniture } from "../api/catalog.js";
import { html, repeat } from "../lib.js";

const dashboardTemplate = (items) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${repeat(items, i => i, itemCard)}
</div>`;

const itemCard = (item) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${item.img} />
            <p>${item.description}</p>
            <footer>
                <p>Price: <span>${item.price} $</span></p>
            </footer>
            <div>
                <a href="/furniture/${item._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`;

export async function dashboardView(ctx) {
    const items = await getAllFurniture();
    ctx.render(dashboardTemplate(items));
}