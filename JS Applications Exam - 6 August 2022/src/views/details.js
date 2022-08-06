import { html } from "../lib.js";
import { getUserData } from "../util.js";
import { getOfferById, deleteOffer, applyForOffer, geApplicationsPerOffer, getApplicationsPerUser } from "../api/offeres.js";


const detailsTemplate = (offer, applications, isUser, isOwner, isApply, onDelete, apply ) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${offer.imageUrl} alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
        <div id="details-requirements">
            <h4>Requirements</h4>
            <span>${offer.requirements}</span>
        </div>
    </div>
    <p>Applications: <strong id="applications">${applications}</strong></p>
    
    <!--Edit and Delete are only for creator-->
    <div id="action-buttons">
        ${isUser && isOwner ? html`
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="" id="delete-btn">Delete</a>`
        : ''}
        ${isUser && !isOwner && !isApply ? html`
            <!--Bonus - Only for logged-in users ( not authors )-->
            <a @click=${apply} href="" id="apply-btn">Apply</a>` 
        : ''}
      </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const [ offer, applications ] = await Promise.all([
        getOfferById(ctx.params.id),
        geApplicationsPerOffer(ctx.params.id)
    ]);

    const userData = getUserData();
    const isUser = userData?.email;
    const isOwner = userData?.id == offer._ownerId;

    let isApply = false;
    if (userData && !isOwner) {
        isApply = await getApplicationsPerUser(ctx.params.id, userData.id);
    }

    ctx.render(detailsTemplate(offer, applications, isUser, isOwner, isApply, onDelete, apply));

    async function onDelete() {
        const choice = confirm('Are you sure ypu want to delete this offer?');

        if (choice) {
            await deleteOffer(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function apply() {
        await applyForOffer({ offerId: ctx.params.id });
        ctx.page.redirect('/offer/' + ctx.params.id);
    }
}