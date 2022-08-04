import { deleteCard, getDonation, getDonationPerUser, getPetById, makeDonation } from "../api/animals.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (pet, donation, isUser, isOwner, isDonated, onDelete, donate) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${donation * 100}$</h4>
            </div>
            ${isUser ? html`
            <div class="actionBtn">
                ${isOwner ? html`
                <a href="/edit/${pet._id}" class="edit">Edit</a>
                <a @click=${onDelete} class="remove">Delete</a>` 
                : ''}

                ${!isOwner && !isDonated ? html`<a @click=${donate} class="donate">Donate</a>` : ''}
            </div>`
            : ''}
        </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const [pet, donation] = await Promise.all([
        await getPetById(ctx.params.id),
        await getDonation(ctx.params.id)
    ]);
    
    const userData = getUserData();
    const isUser = userData?.email;
    const isOwner = userData?.id == pet._ownerId;

    let isDonated = false;
    if (userData) {
        isDonated = await getDonationPerUser(ctx.params.id, userData.id);
    }

    ctx.render(detailsTemplate(pet, donation, isUser, isOwner, isDonated, onDelete, donate));
 
    async function onDelete() {
        const choice = confirm('Are you sure ypu want to delete this furniture?');

        if (choice) {
            await deleteCard(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function donate() {
        await makeDonation({ petId: ctx.params.id });
        ctx.page.redirect('/pet/' + ctx.params.id);
    }
}