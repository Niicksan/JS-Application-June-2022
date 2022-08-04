import { getAnimalById } from "../api/animals.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (animal, isUser, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${animal.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${animal.name}</h1>
                <h3>Breed: ${animal.breed}</h3>
                <h4>Age: ${animal.age}</h4>
                <h4>Weight: ${animal.weight}</h4>
                <h4 class="donation">Donation: 0$</h4>
            </div>
            ${isUser ? html`
            <div class="actionBtn">
                ${isOwner ? html`
                <a href="#" class="edit">Edit</a>
                <a href="#" class="remove">Delete</a>` 
                : html`<a href="#" class="donate">Donate</a>`}
            </div>`
            : ''}
        </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const animal = (await getAnimalById(ctx.params.id));
    console.log(ctx.params.id)
    console.log(animal);
    const userData = getUserData();
    const isUser = userData?.email;
    const isOwner = userData?.id == animal._ownerId;

    ctx.render(detailsTemplate(animal, isUser, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure ypu want to delete this furniture?');

        // if (choice) {
        //     await deleteFurniture(ctx.params.id);
        //     ctx.page.redirect('/');
        // }
    }
}