import { html } from "../lib.js";
import { deleteFurniture, getFurnitureDetails } from "../api/catalog.js";
import { getUserData } from "../util.js";

const detailsTemplate = (item, isUser, isOwner, onDelete) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="../../${item.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>

        ${isUser && isOwner ? html`<div>
            <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
            <a @click=${onDelete} class="btn btn-red">Delete</a>
        </div>` : ''};
    </div>
</div>`;

export async function detailsView(ctx) {
    const item = await getFurnitureDetails(ctx.params.id);
    const userData = getUserData();
    const isUser = userData?.email;
    const isOwner = userData?.id == item._ownerId;
    console.log(item);
    ctx.render(detailsTemplate(item, isUser, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure ypu want to delete this furniture?');

        if (choice) {
            await deleteFurniture(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}