import { html } from "../lib.js";
import { getOfferById, editOffer } from "../api/offeres.js";


const editTemplate = (offer, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" .value=${offer.title} />
            <input type="text" name="imageUrl" id="job-logo" .value=${offer.imageUrl} />
            <input type="text" name="category" id="job-category" .value=${offer.category} />
            <textarea id="job-description" name="description" rows="4" cols="50" .value=${offer.description}></textarea>
            <textarea id="job-requirements" name="requirements" rows="4" cols="50"
                .value=${offer.requirements}></textarea>
            <input type="text" name="salary" id="job-salary" .value=${offer.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editView(ctx) {
    const offer = await getOfferById(ctx.params.id)
    ctx.render(editTemplate(offer, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const title = formData.get('title').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const category = formData.get('category').trim();
        const description = formData.get('description').trim();
        const requirements = formData.get('requirements').trim();
        const salary = formData.get('salary').trim();

        if (!title || !imageUrl || !category || !description || !requirements || !salary) {
            return alert('All fields are required!');
        }

        await editOffer(ctx.params.id, { title, imageUrl, category, description, requirements, salary });
        event.target.reset();
        ctx.page.redirect('/offer/' + ctx.params.id);
    }
}